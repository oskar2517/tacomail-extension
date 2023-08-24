# TacoMail Extension
The TacoMail browser extension offers a hassle-free way to interact with the TacoMail temporary email service right from your browser. Safeguard your personal email and enjoy online privacy when signing up on websites.

The extension has been tested to work both with Chromium-based browsers and Firefox.

## Screenshots
![Screenshot 1](git_assets/screenshot_1.png)

![Screenshot 2](git_assets/screenshot_2.png)

![Screenshot 3](git_assets/screenshot_3.png)

## Development
1. Install [Node.js](https://nodejs.org/en).
2. Open a terminal inside this directory.
3. Install the required dependencies using `npm install`.
4. Run either `npm run debug:chrome` or `npm run debug:firefox` to open a browser instance with the plugin installed.

## Building
1. Install [Node.js](https://nodejs.org/en).
2. Open a terminal inside this directory.
3. Install the required dependencies using `npm install`.
4. Run `npm run buildExtension`.
5. The generated plugin file can be found in `web-ext-artifacts`.