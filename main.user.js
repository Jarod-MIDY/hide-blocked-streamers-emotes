// ==UserScript==
// @name Streamer Emote Picker Remover
// @namespace twitch script
// @author Jarod-MIDY
// @description Remove Streamer Emote Picker
// @copyright https://github.com/Jarod-MIDY
// @license GPL-3.0 License
// @version 1.0

// @homepageURL https://github.com/Jarod-MIDY
// @supportURL https://github.com/Jarod-MIDY/issues
// @downloadURL https://raw.githubusercontent.com/Jarod-MIDY/hide-blocked-streamers-emotes/refs/heads/main/main.user.js
// @updateURL https://raw.githubusercontent.com/Jarod-MIDY/hide-blocked-streamers-emotes/refs/heads/main/main.user.js

// @match *://www.twitch.tv/*
// @grant unsafeWindow
// @run-at document-idle
// ==/UserScript==

/**
 * How to use:
 * Install a browser extension (e.g. https://www.tampermonkey.net/) and add this script to it
 * In streamerData add the name and icon prefix as follow 
 * {
 *   name: 'streamer',
 *    iconPrefix: 'stream999'
 * }
 * to find the icon prefix, look at the icons names (hover the icons with your mouse's cursor), 
 * for example in justinKappa and justinLUL, the prefix is the common part so it's justin
 */

// you must change the values here
const streamerData = [
    {
        name: 'exempleStreamer',
        iconPrefix: 'exemp1'
    },
    {
        name: 'streamer',
        iconPrefix: 'stream999'
    },
    {
        name: 'otherStreamer',
        iconPrefix: 'other11'
    }
]

function deleteFromIconSelector(streamer) {
    const nav = document.querySelector(`.emote-picker__nav-scroll-container button[data-a-target="category-ref-` + streamer.name + `" i]`)
    if (nav) {
        nav.parentElement.remove()
    }
    const contentBlock = document.querySelector(`.emote-picker__content-block[data-ref-target="category-ref-` + streamer.name + `" i]`)
    if (contentBlock) {
        contentBlock.remove()
        return true;
    }
    return false;
}

function deleteFromSearch(streamer) {
    let emoteButtons = [
        ...(document.querySelectorAll('div:has(>.emote-button button[data-a-target^="'+ streamer.iconPrefix +'"]):not([style="display: none;"])')??[]),
        ...(document.querySelectorAll('.simplebar-content button[data-a-target^="'+ streamer.iconPrefix +'"]:not([style="display: none;"])')??[])
    ]
    if (emoteButtons) {
        emoteButtons.forEach(element => {
            element.style.display = 'none';
        })
    }

}

const callback = function(mutationsList) {
    let hasChildListMutations = false;
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            hasChildListMutations = true;
            break;
        }
    }
    if (hasChildListMutations) {
        streamerData.forEach(streamer => {
            let foundStreamer = deleteFromIconSelector(streamer)
            if (!foundStreamer) {
                deleteFromSearch(streamer)
            }
        })
    }
};

const config = {childList: true};

const observer = new MutationObserver(callback);
setTimeout(fn => {
    const chat = document.querySelector('.chat-input')
    console.log(chat)
    observer.observe(chat, config);
}, 1500)

