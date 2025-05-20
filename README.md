# hide-blocked-streamers-emotes

A simple js script to hide blocked streamers from your twitch emotes picker.

## How to use:

- Install a browser extension (e.g. (https://www.tampermonkey.net/)) and add main.js script to it [One click Install](https://raw.githubusercontent.com/Jarod-MIDY/hide-blocked-streamers-emotes/refs/heads/main/main.js)
- In the script add the name and icon prefix in the streamerData array as follow

  ```js
    const streamerData = [ 
        {
            name: 'streamer',
            iconPrefix: 'stream999'
        }
    ]
  ```
  to find the icon prefix, look at the icons names (hover the icons with your mouse's cursor),
  for example in justinKappa and justinLUL, the prefix is the common part so it's justin
  ___
  If you need to block multiple streamers, add them like this and dont forget the `","` between them but not on the last one.
  ```js
    const streamerData = [ 
        {
            name: 'streamer1',
            iconPrefix: 'stream1'
        },
        {
            name: 'streamer2',
            iconPrefix: 'stream2'
        }
    ]
  ```
  - that's it ! it should hide all
