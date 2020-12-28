// 2020-12-28

var timeout = 20000;  // milliseconds
var reloadInterval = 10000;  // milliseconds

var isInventoryLoaded = function()
{
    // Check whether the fulfillment widget is present.
    var allDivs = document.getElementsByTagName("div");
    for (var i = 0; i < allDivs.length; i++)
    {
        var div = allDivs[i];
        if (div.hasAttribute("data-test") && div.getAttribute("data-test") == "flexible-fulfillment")
        {
            // This check is not perfect; sometimes it can be a little premature.
            // Maybe wait for a more specific set of divs to appear?
            return true;
        }
    }
    return false;
}

var attemptAddToCart = function()
{
    // Check for a "Pick it up" or "Pick up here" button.
    // "Pick it up" will appear if the item is available at your selected store.
    // "Pick up here" will appear if the item is available at another nearby store.
    var allButtons = document.getElementsByTagName("button");
    for (var i = 0; i < allButtons.length; i++) 
    {
        var button = allButtons[i];
        if (button.innerText == "Pick it up" || button.innerText == "Pick up here")
        {
            // It's available! Add it to cart right away.
            // button.click();
            return true;
        }
    }
    return false;
}

var runCheck = function() 
{
    // Wait until the inventory widget populates
    var startTime = new Date();
    while (!isInventoryLoaded())
    {
        var currentTime = new Date();
        if (currentTime - startTime > timeout)
        {
            // Timed out
            // location.reload();
            return;
        }
    }

    if (attemptAddToCart())
    {
        // Added to cart!
        alert("Added to cart!");

        // var sound = new Audio(chrome.runtime.getURL("braam.mp3"));
        // sound.play();

        // chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {
        //     drawAttention: true,
        //     focused: true
        // });

        // chrome.tabs.getCurrent(function (tab) {
        //     chrome.windows.update(tab.windowId, {
        //         drawAttention: true,
        //         focused: true
        //     })
        // });
        return;
    }
    else
    {
        // Not available
        // location.reload();
        return;
    }
}

window.addEventListener('load', runCheck);