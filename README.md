# hide-blocked-streamers-emotes

A simple js script to hide blocked streamers from your twitch emotes picker.

## How to use:

- Install a browser extension (e.g. https://www.tampermonkey.net/) and add this script to it
- In streamerData add the name and icon prefix as follow
  ```js
  {
  name: 'streamer',
  iconPrefix: 'stream999'
  }
  ```
  to find the icon prefix, look at the icons names (hover the icons with your mouse's cursor),
  for example in justinKappa and justinLUL, the prefix is the common part so it's justin
