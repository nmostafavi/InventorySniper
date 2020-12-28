const timeout = 20000;  // How long to wait for the page to fully load, in milliseconds
const reloadInterval = 10000;  // How long to wait before reloading when item is deemed out of stock, in milliseconds

var attemptAddToCart = function()
{
    // Check for a "Pick it up" or "Pick up here" button:
    //   "Pick it up" will appear if the item is available at your selected store.
    //   "Pick up here" will appear if the item is available at another nearby store.
    //   Both of these are the same button, but with different text applied.
    var orderPickupButton = document.querySelector("button[data-test=orderPickupButton");
    if (orderPickupButton)
    {
        //orderPickupButton.click();
        chrome.extension.sendRequest({"playAlert": true});
        return;
    }

    // Could not find the buy button, assume out of stock
    setTimeout(function() { location.reload(); }, reloadInterval);
}

var runCheck = function() 
{
    // Wait until the inventory widget populates
    const startTime = new Date();
    const pollInterval = 100;  // milliseconds
    var checkInventoryWidgetLoaded = function()
    {
        if (document.querySelector("div[data-test=flexible-fulfillment]"))
        {
            // Widget loaded
            attemptAddToCart();
            return;
        }

        var currentTime = new Date();
        if (currentTime - startTime > timeout)
        {
            // Timed out waiting for the widget to appear
            location.reload();
        }

        setTimeout(checkInventoryWidgetLoaded, pollInterval);
    };
    checkInventoryWidgetLoaded();
}

window.addEventListener('load', runCheck);