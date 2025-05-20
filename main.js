/**
 * @name Streamer Emote Picker Remover
 * @version 1.0
 * @description Remove Streamer Emote Picker
 * @Author Bloubill
 * @AuthorUrl https://github.com/Bloubill
 * @match *://www.twitch.tv/*
 * 
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

document.querySelectorAll('.simplebar-content button[data-a-target^="soulli12"]:not([style="display: none;"])')
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
    style="display: none;"
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

document.querySelector(`button[data-a-target="emote-picker-button"]`).addEventListener('click', () => {
    const chat = document.querySelector('.chat-input')
    observer.observe(chat, config);
})

