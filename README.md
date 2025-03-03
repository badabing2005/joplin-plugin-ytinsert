# Insert Youtube Video Link

[![Release](https://img.shields.io/github/v/release/badabing2005/joplin-plugin-ytinsert?style=flat-square)](https://github.com/badabing2005/joplin-plugin-ytinsert/releases/latest) [![MIT](https://img.shields.io/github/license/badabing2005/joplin-plugin-ytinsert?style=flat-square)](/LICENSE)

> Joplin Plugin

## Features

This plugin inserts a youtube video link into the note from the selected text.
The selected text can be a youtube video link or just the video id.
If the selected text is empty, the clipboard text is used.

Supported link types:
- Regular YouTube videos (https://www.youtube.com/watch?v=0I_OPQQiYVU)
- YouTube Shorts (https://www.youtube.com/shorts/0I_OPQQiYVU)
- Just the video ID (0I_OPQQiYVU)

The standard format of the inserted link is: (where 0I_OPQQiYVU is the id of the video)

```text
[![Video](https://img.youtube.com/vi/0I_OPQQiYVU/maxresdefault.jpg)](https://www.youtube.com/watch?v=0I_OPQQiYVU)
```

## Screenshot

![Screenshot](/screenshot.png)

## Settings

### Basic Settings

1. **Title Text Position**: Position of the title text relative to the video link (top | bottom)
2. **Text Prefix**: Prefix to append in front of the title text.  
   Example: `# ` to make the title a header.

### Formatting Options

3. **Format Type**: Choose the style of the inserted YouTube link:
   - **Standard Format**: Uses the traditional markdown image link format  
        `[![Video](${img})](${URL})${text}`
   - **Next Format**: Uses HTML img tag with fixed dimensions  
        `[${text} <img src="${img}" alt="Video" width="462" height="260" class="jop-noMdConv">](${url})`
   - **Custom Format**: Define your own format using available variables

4. **Custom Format**: When "Custom Format" is selected, you can define your own template using these variables:
   - `${img}` - The YouTube thumbnail image URL
   - `${text}` - The video title (automatically escaped for markdown)
   - `${url}` - The video URL
   - `${id}` - The YouTube video ID

## Installation

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
