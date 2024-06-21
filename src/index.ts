import joplin from 'api';
import { MenuItemLocation, ToolbarButtonLocation } from 'api/types';
import fetch from 'node-fetch';

// This plugin inserts a youtube video link into the note from the selected text.
// The selected text can be a youtube video link or just the video id.
// If the selected text is empty, the clipboard text is used.
// The format of the inserted link is: (where 0I_OPQQiYVU is the id of the video)
// [![Video](https://img.youtube.com/vi/0I_OPQQiYVU/maxresdefault.jpg)](https://www.youtube.com/watch?v=0I_OPQQiYVU)

joplin.plugins.register({
    onStart: async function() {
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
				if (selectedText)
				{
                    const videoId = extractVideoId(selectedText);
                    const title = await fetchVideoTitle(videoId);
                    const markdown = `[![Video](https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)](https://www.youtube.com/watch?v=${videoId})\n${title}`;
                    await joplin.commands.execute('replaceSelection', markdown);
                }
            },
		});

        // console.log('Creating toolbar button and menu item');
        await joplin.views.toolbarButtons.create('myButton1', 'insertYoutubeVideo', ToolbarButtonLocation.EditorToolbar);
		await joplin.views.menuItems.create('myMenuItem1', 'insertYoutubeVideo', MenuItemLocation.Tools, { accelerator: 'CmdOrCtrl+J' });
    },
});

function extractVideoId(input: string): string {
	const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^&]+)/;
	const match = input.match(urlPattern);
	return match ? match[1] : input;
}

async function fetchVideoTitle(videoId: string): Promise<string> {
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const text = await response.text();
    const titleMatch = text.match(/<title>([^<]*)<\/title>/);
    return titleMatch ? titleMatch[1].replace(' - YouTube', '') : 'Unknown title';
}
