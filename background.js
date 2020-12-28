var listener = function(request, sender, sendResponse)
{
    if (request["playAlert"])
    {
        var audio = document.createElement("audio");
        document.body.appendChild(audio);
        audio.autoplay = true;
        audio.src = "braam.mp3";
    }
};

chrome.extension.onRequest.addListener(listener);