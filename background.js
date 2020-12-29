var requestListener = function(request, sender, sendResponse)
{
    if (request["playAlert"])
    {
        var audio = document.createElement("audio");
        document.body.appendChild(audio);
        audio.autoplay = true;
        audio.src = "braam.mp3";

        chrome.notifications.create("inventoryAvailableNotification", {
            "type": "basic",
            "iconUrl": "icon.png",
            "title": "Added to cart!",
            "message": "Return to browser to begin checkout.",
            "requireInteraction": true
        }, function(notificationId) { /* do nothing */ });
    }
};

var notificationClickedListener = function(notificationId)
{
    chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {
        "focused": true
    }, function(window) { /* do nothing */ });
    chrome.notifications.clear(notificationId);
};

chrome.extension.onRequest.addListener(requestListener);
chrome.notifications.onClicked.addListener(notificationClickedListener);