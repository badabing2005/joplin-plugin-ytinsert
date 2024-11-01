# Insert Youtube Video Link

[![Release](https://img.shields.io/github/v/release/badabing2005/joplin-plugin-ytinsert?style=flat-square)](https://github.com/badabing2005/joplin-plugin-ytinsert/releases/latest) [![MIT](https://img.shields.io/github/license/badabing2005/joplin-plugin-ytinsert?style=flat-square)](/LICENSE)

> Joplin Plugin

## Features

This plugin inserts a youtube video link into the note from the selected text.
The selected text can be a youtube video link or just the video id.
If the selected text is empty, the clipboard text is used.
The format of the inserted link is: (where 0I_OPQQiYVU is the id of the video)

```text
[![Video](https://img.youtube.com/vi/0I_OPQQiYVU/maxresdefault.jpg)](https://www.youtube.com/watch?v=0I_OPQQiYVU)
```

## Screenshot

![Screenshot](/screenshot.png)

## Settings

There are two configurable options.
1. Position of the title text relative to the video link (top | bottom)
2. Prefix to append in front of the title text.<BR>
Example: `# ` to make the title a header.

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
