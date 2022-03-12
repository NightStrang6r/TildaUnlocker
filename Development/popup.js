console.log('Popup.js');

const checkboxes = document.getElementsByClassName("custom-checkbox");
let settings = new Object;

restoreSettings();
for(let i = 0; i < checkboxes.length; i++){
    checkboxes[i].addEventListener("input", saveSettings);
}

function saveSettings(el) {
    for(let i = 0; i < checkboxes.length; i++){
        settings[checkboxes[i].name] = checkboxes[i].checked;
    }

    chrome.runtime.sendMessage({greeting: "saveSettings", settings: settings});
}

function restoreSettings(){
    chrome.runtime.sendMessage({greeting: "getSettings"},
        function (response) {
            console.log(response);
            settings = response.settings;
            for(let i = 0; i < checkboxes.length; i++){
                if(settings[`${checkboxes[i].name}`] == "true" || settings[`${checkboxes[i].name}`] == true){
                    checkboxes[i].checked = true;
                } else {
                    checkboxes[i].checked = false;
                }
            }
        }
    );
}