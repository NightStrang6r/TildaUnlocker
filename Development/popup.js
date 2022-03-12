console.log('Popup.js');

const checkboxes = document.getElementsByClassName("custom-checkbox");

restoreSettings();
for(let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("input", saveSettings);
}

function saveSettings(el) {
    let settings = {};

    for(let i = 0; i < checkboxes.length; i++) {
        console.log(settings);
        settings[`${checkboxes[i].name}`] = checkboxes[i].checked;
    }

    chrome.runtime.sendMessage({greeting: "saveSettings", settings: settings});
}

function restoreSettings(){
    chrome.runtime.sendMessage({greeting: "getSettings"},
        function (response) {
            try {
                let settings = response.settings;
                for(let i = 0; i < checkboxes.length; i++){
                    if(settings[`${checkboxes[i].name}`] == "true" || settings[`${checkboxes[i].name}`] == true){
                        checkboxes[i].checked = true;
                    } else {
                        checkboxes[i].checked = false;
                    }
                }
            } catch (err) {
                console.log(`Ошибка при получении настроек: ${err}`);
            }
        }
    );
}