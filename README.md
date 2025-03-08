# Joplin Plugin: Insert YouTube Video

[![Release](https://img.shields.io/github/v/release/badabing2005/joplin-plugin-ytinsert?style=flat-square)](https://github.com/badabing2005/joplin-plugin-ytinsert/releases/latest) [![MIT](https://img.shields.io/github/license/badabing2005/joplin-plugin-ytinsert?style=flat-square)](/LICENSE)

This plugin inserts a YouTube video link into the note from the selected text. The selected text can be a YouTube video link or just the video ID. If the selected text is empty, the clipboard text is used.

## Features

- Insert YouTube video link with thumbnail
- Customizable title text position (top, bottom, or none)
- Customizable title text prefix
- Multiple format types (standard, next, custom)
- Custom format with variables: `${img}`, `${text}`, `${url}`, `${id}`, `${description}`, and `${newline}`
- Select preferred image resolution for the YouTube thumbnail
- Option to include the video description after the video link

Supported link types:
- Regular YouTube videos (https://www.youtube.com/watch?v=0I_OPQQiYVU)
- YouTube Shorts (https://www.youtube.com/shorts/0I_OPQQiYVU)
- Shortened YouTube links (https://youtu.be/0I_OPQQiYVU)
- Just the video ID `0I_OPQQiYVU`

## Settings

### Title Text Position

- **Key**: `textPosition`
- **Type**: `String`
- **Options**: `top`, `bottom`, `none`
- **Description**: Position of the title text relative to the video link.

### Title Text Prefix

- **Key**: `textPrefix`
- **Type**: `String`
- **Description**: Prefix to append in front of the title text (e.g., `# ` to make the title a header).

### Format Type

- **Key**: `formatType`
- **Type**: `String`
- **Options**: `standard`, `next`, `custom`
- **Description**: Choose how the YouTube link should be formatted.

### Custom Format

- **Key**: `customFormat`
- **Type**: `String`
- **Description**: Define your custom format using `${img}`, `${text}`, `${url}`, `${id}`, `${description}`, and `${newline}` variables. Only used when "Custom Format" is selected above.

### Preferred Image Resolution

- **Key**: `preferredImageResolution`
- **Type**: `String`
- **Options**: `maxresdefault.jpg`, `hqdefault.jpg`, `sddefault.jpg`, `mqdefault.jpg`
- **Description**: Select the preferred image resolution for the YouTube thumbnail.

### Include Description

- **Key**: `includeDescription`
- **Type**: `Bool`
- **Description**: Include the video description after the video link.

## Usage

1. Select the text in your note that contains the YouTube video link or video ID.
2. Use the toolbar button or menu item to insert the YouTube video link.
3. The plugin will replace the selected text with the formatted YouTube video link, including the thumbnail and optional description.

## Example

If the selected text is `https://www.youtube.com/watch?v=0I_OPQQiYVU` and standard format is selected, the plugin will insert:

```
[![Video](https://img.youtube.com/vi/0I_OPQQiYVU/maxresdefault.jpg)]
```

## Demo 
For demonstration purposes, I've chosen a random YouTube link about Joplin.  
`https://www.youtube.com/watch?v=0I_OPQQiYVU`

### Three ways to insert a YouTube video
1. **YouTube link**
	1. Paste the YouTube link
	2. Select it
	
2. **YouTube video ID**
	1. Paste the YouTube video ID, example: `0I_OPQQiYVU`
	2. Select it

3. **From Clipboard**
	1. Copy YouTube video URL or video ID to clipboard
	2. Place the cursor where you want the video inserted.

Use the toolbar ![](/fa-video.png) or `Tools | Insert YouTube Video` menu or Keyboard shortcut `CTRL+J`  
The video will be inserted into the note:  
[![Video](https://img.youtube.com/vi/0I_OPQQiYVU/hqdefault.jpg)](https://www.youtube.com/watch?v=0I_OPQQiYVU)

## Installation

### Joplin plugin manager

1. Open Joplin
2. Go to `Tools` > `Options` > `Plugins`
3. Search the plugin `Insert YouTube Video`
4. Click `Install`
5. Restart Joplin

### Manual

1. Go to the [Releases](https://github.com/badabing2005/joplin-plugin-ytinsert/releases/latest) to download the plugin package `zip` file and unzip it.
2. Open [Joplin](https://joplinapp.org/), go to **Tools > Options > Plugins**.
3. Click **Manage your plugins > Install from file**, select the previously unzipped `jpl` file.
4. Finally, restart the application.

## Building

The plugin is built using Webpack, which creates the compiled code in `/dist`. A JPL archive will also be created in `/publish`, which can be used to distribute the plugin.

To build the plugin, simply run `npm run dist`.

## License

[MIT](./LICENSE) license
