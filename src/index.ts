import joplin from 'api';
import { SettingItemType } from 'api/types';
import { MenuItemLocation, ToolbarButtonLocation } from 'api/types';
import fetch from 'node-fetch';

// This plugin inserts a youtube video link into the note from the selected text.
// The selected text can be a youtube video link or just the video id.
// If the selected text is empty, the clipboard text is used.
// The format of the inserted link is: (where 0I_OPQQiYVU is the id of the video)
// [![Video](https://img.youtube.com/vi/0I_OPQQiYVU/maxresdefault.jpg)](https://www.youtube.com/watch?v=0I_OPQQiYVU)

async function main() {
    await joplin.settings.registerSection('ytlinkSettings', {
        label: 'YouTube Link Settings',
        iconName: 'fas fa-video',
    });

    await joplin.settings.registerSettings({
        'textPosition': {
            value: 'bottom',
            type: SettingItemType.String,
            section: 'ytlinkSettings',
            public: true,
            isEnum: true,
            advanced: false,
            label: 'Title Text Position',
            description: 'Position of the title text relative to the video link (top, bottom, or none)',
            options: {
                'top': 'Top',
                'bottom': 'Bottom',
                'none': 'None',
            },
        },
        'textPrefix': {
            value: '',
            type: SettingItemType.String,
            section: 'ytlinkSettings',
            public: true,
            label: 'Title Text Prefix',
            description: 'Prefix to append in front of the title text (e.g., "# " to make the title a header)',
        },
        'formatType': {
            value: 'standard',
            type: SettingItemType.String,
            section: 'ytlinkSettings',
            public: true,
            isEnum: true,
            advanced: false,
            label: 'Format Type',
            description: 'Choose how the YouTube link should be formatted',
            options: {
                'standard': 'Standard Format',
                'next': 'Next Format',
                'custom': 'Custom Format',
            },
        },
        'customFormat': {
            value: '[![Video](${img})](${url})${text}',
            type: SettingItemType.String,
            section: 'ytlinkSettings',
            public: true,
            label: 'Custom Format',
            description: 'Define your custom format using ${img}, ${text}, ${url}, ${id}, ${description} and ${newline} variables. Only used when "Custom Format" is selected above.',
            advanced: false,
        },
        'preferredImageResolution': {
            value: 'maxresdefault.jpg',
            type: SettingItemType.String,
            section: 'ytlinkSettings',
            public: true,
            isEnum: true,
            advanced: false,
            label: 'Preferred Image Resolution',
            description: 'Select the preferred image resolution for the YouTube thumbnail',
            options: {
                'maxresdefault.jpg': 'Max Resolution',
                'hqdefault.jpg': 'High Quality',
                'sddefault.jpg': 'Standard Definition',
                'mqdefault.jpg': 'Medium Quality',
            },
        },
        'includeDescription': {
            value: false,
            type: SettingItemType.Bool,
            section: 'ytlinkSettings',
            public: true,
            label: 'Include Description',
            description: 'Include the video description after the video link',
        },
    });

    // Register the plugin
    // eslint-disable-next-line no-console
            console.info('Insert Youtube Video  plugin started!');
    await joplin.commands.register({
        name: 'insertYoutubeVideo',
        label: 'Insert YouTube Video',
        iconName: 'fas fa-play-circle', // or use fa-video
        execute: async () => {
            let selectedText = await joplin.commands.execute('selectedText');
            if (!selectedText) {
                // Selection is empty, use clipboard text
                selectedText = await joplin.clipboard.readText();
            }
            if (selectedText) {
                const videoId = extractVideoId(selectedText);
                const title = escapeMarkdown(await fetchVideoTitle(videoId));
                const description = escapeMarkdown(await fetchVideoDescription(videoId));
                const textPosition = await joplin.settings.value('textPosition');
                const textPrefix = await joplin.settings.value('textPrefix');
                const formatType = await joplin.settings.value('formatType');
                const customFormat = await joplin.settings.value('customFormat');
                const preferredImageResolution = await joplin.settings.value('preferredImageResolution');
                const includeDescription = await joplin.settings.value('includeDescription');

                // Determine if it's a shorts URL or regular video
                const isShorts = selectedText.includes('youtube.com/shorts/');
                const videoUrl = isShorts
                    ? `https://www.youtube.com/shorts/${videoId}`
                    : `https://www.youtube.com/watch?v=${videoId}`;
                const imageUrl = await getValidImageUrl(videoId, preferredImageResolution);

                let markdown;
                let pre_text = '';
                let post_text = '';
                if (textPosition === 'top') {
                    pre_text = `${textPrefix}${title}\n`;
                } else if (textPosition === 'bottom') {
                    post_text = `\n${textPrefix}${title}`;
                }

                if (formatType === 'standard') {
                    markdown = `${pre_text}[![Video](${imageUrl})](${videoUrl})${post_text}`;
                } else if (formatType === 'next') {
                    markdown = `${pre_text}[${title} <img src="${imageUrl}" alt="Video" width="462" height="260" class="jop-noMdConv">](${videoUrl})${post_text}`;
                } else if (formatType === 'custom') {
                    // Replace variables for custom format
                    markdown = customFormat
                        .replace(/\${img}/g, imageUrl)
                        .replace(/\${text}/g, title)
                        .replace(/\${url}/g, videoUrl)
                        .replace(/\${id}/g, videoId)
                        .replace(/\${newline}/g, '\n')
                        .replace(/\${description}/g, description);
                    markdown = `${pre_text}${markdown}${post_text}`;
                }

                if (includeDescription) {
                    markdown += `\n\n${description}`;
                }

                await joplin.commands.execute('replaceSelection', markdown);
            }
        },
    });

    // console.log('Creating toolbar button and menu item');
    await joplin.views.toolbarButtons.create('myButton1', 'insertYoutubeVideo', ToolbarButtonLocation.EditorToolbar);
    await joplin.views.menuItems.create('myMenuItem1', 'insertYoutubeVideo', MenuItemLocation.Tools, { accelerator: 'CmdOrCtrl+J' });
}

function extractVideoId(input: string): string {
    // Handle YouTube shorts URLs
    const shortsPattern = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?\/]+)/;
    const shortsMatch = input.match(shortsPattern);
    if (shortsMatch) return shortsMatch[1];

    // Handle regular YouTube URLs
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^&]+)/;
    const match = input.match(urlPattern);
    return match ? match[1] : input;
}

function escapeMarkdown(text: string): string {
    // Escape markdown special characters to prevent formatting issues
    return text.replace(/([[\]()<>])/g, '\\$1');
}

async function fetchVideoTitle(videoId: string): Promise<string> {
    try {
        const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
        const text = await response.text();
        const titleMatch = text.match(/<title>([^<]*)<\/title>/);
        return titleMatch ? titleMatch[1].replace(' - YouTube', '') : 'Unknown title';
    } catch (error) {
        console.error('Error fetching video title:', error);
        return 'Unknown title';
    }
}

async function fetchVideoDescription(videoId: string): Promise<string> {
    try {
        const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
        const text = await response.text();
        const descriptionMatch = text.match(/"shortDescription":"([^"]*)"/);
        return descriptionMatch ? descriptionMatch[1].replace(/\\n/g, '\n') : 'No description available';
    } catch (error) {
        console.error('Error fetching video description:', error);
        return 'No description available';
    }
}

async function getValidImageUrl(videoId: string, preferredResolution: string): Promise<string> {
    const resolutions = [preferredResolution, 'maxresdefault.jpg', 'hqdefault.jpg', 'sddefault.jpg', 'mqdefault.jpg'];
    for (const resolution of resolutions) {
        const imageUrl = `https://img.youtube.com/vi/${videoId}/${resolution}`;
        const response = await fetch(imageUrl);
        if (response.ok) {
            return imageUrl;
        }
    }
    return `https://img.youtube.com/vi/${videoId}/default.jpg`; // Fallback to default image
}

joplin.plugins.register({
    onStart: async function() {
        await main();
    },
});
