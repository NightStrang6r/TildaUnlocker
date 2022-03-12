chrome.runtime.onMessage.addListener(onMessage);

function onMessage(request, sender, sendResponse) {
    if (request.greeting == "saveSettings") {
        let settings = {};

        for (let key in request.settings) {
            settings[key] = request.settings[key];
        }

        if(settings.unlockBlocks != undefined) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, {greeting: "setUnlockBlocks", state: settings.unlockBlocks});
            });
        }

        chrome.storage.sync.set({settings}, function() {
            console.log("Settings saved");
            console.log(settings);
            sendResponse({farewell: "Сохранено"});
        });

        return true;
    }

    if (request.greeting == "getSettings") {
        chrome.storage.sync.get('settings', function(result) {
            sendResponse({settings: result.settings});
            console.log("Settings sent:");
            console.log(result.settings);
        });

        return true;
    }
}