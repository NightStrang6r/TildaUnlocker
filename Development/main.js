console.log('Tilda Unlocker');

chrome.runtime.onMessage.addListener(onMessage);
chrome.runtime.sendMessage({greeting: "getSettings"}, (settings) => {main(settings.settings)});

function main(settings) {
    if(settings && settings.unlockBlocks) {
        service();
    }
}

function service() {
    const targetNode = document.querySelector(".tp-library");
    if(targetNode && targetNode != null) {
        const config = { childList: true };
    
        const callback = function(mutationsList) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    unlockBlocks();
                }
            }
        };
        
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
}

function unlockBlocks(toUnlock = true) {
    try {
        let libraryEl = document.querySelectorAll(".tp-library__tpl-body");
    
        if(toUnlock) {
            libraryEl.forEach(el => {
                if(el.dataset.tplLocked == "yes") {
                    el.dataset.tplLocked = "no";
                    el.querySelector(".tp-library__tpl-wrapper").style.opacity = "1";
                    el.querySelector(".tp-library__tpl-lock").style.display = "none";
                }
            });
            console.log(`Blocks unlocked`);
        } else {
            libraryEl.forEach(el => {
                if(el.dataset.tplLocked == "no") {
                    el.dataset.tplLocked = "yes";
                    el.querySelector(".tp-library__tpl-wrapper").style.opacity = "0.5";
                    el.querySelector(".tp-library__tpl-lock").style.display = "";
                }
            });
            console.log(`Blocks locked`);
        }
    } catch(err) {
        console.log(`Ошибка при разблокировке блоков: ${err}`);
    }
}

function onMessage(request, sender, sendResponse) {
    if (request.greeting == "setUnlockBlocks") {
        unlockBlocks(request.state);
    }
}