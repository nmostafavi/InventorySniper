const timeout = 20000;  // How long to wait for the page to fully load, in milliseconds
const reloadInterval = 10000;  // How long to wait before reloading when item is deemed out of stock, in milliseconds

var runCheck = function() 
{
    // Poll until the inventory widget populates
    const startTime = new Date();
    const pollInterval = 100;  // milliseconds
    var checkInventoryWidgetLoaded = function()
    {
        var orderPickupButton = document.querySelector("button[data-test=orderPickupButton");
        if (orderPickupButton)
        {
            orderPickupButton.click();
            chrome.extension.sendRequest({"playAlert": true});
            return;
        }

        var outOfStockMessage = document.querySelector('div[data-test=outOfStockMessage]');
        if (outOfStockMessage)
        {
            setTimeout(function() { location.reload(); }, reloadInterval);
            return;
        }

        var currentTime = new Date();
        if (currentTime - startTime > timeout)
        {
            // Timed out waiting for the page to finish loading (or it's not eligible for pickup)
            location.reload();
            return;
        }

        setTimeout(checkInventoryWidgetLoaded, pollInterval);
    };
    checkInventoryWidgetLoaded();
}

window.addEventListener('load', runCheck);