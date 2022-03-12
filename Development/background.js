chrome.runtime.onMessage.addListener(onMessage);

function onMessage(request, sender, sendResponse) {
    if (request.greeting == "saveSettings") {
        let settings = {};

        for (let key in request.settings) {
            settings[key] = request.settings[key];
        }

        if(settings.unlockBlocks != undefined) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                try {
                    const tabId = tabs[0].id;
                    chrome.tabs.sendMessage(tabId, {greeting: "setUnlockBlocks", state: settings.unlockBlocks});
                } catch (err) {
                    console.log(`Ошибка при отправке сообщения на вкладку: ${err}`);
                }
                
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
            let settings;
            if(!result.settings) {
                settings = {settings: {}};
            } else {
                settings = {settings: result.settings};
            }

            sendResponse({settings: result.settings});
            console.log("Settings sent:");
            console.log(result.settings);
        });

        return true;
    }
}