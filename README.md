# Inventory Sniper
A Google Chrome extension for Target.com

## About
This is a simple Google Chrome extension to help automatically add out-of-stock items from Target.com to your cart immediately once they are back in stock. 

Repeatedly reloads the product page and monitors for the "Add for pickup" button. When an item is back in stock, it will click the "Add for pickup" button, placing the item in your cart. It also plays a loud sound to get your attention. From there, it's up to you to follow through with the checkout process.

I made this as a fun project and as a way to snag one of the highly coveted game consoles released this year. It worked for my purposes, but I would highly expect this to stop working once the website format inevitably changes.

## How to use
1. Install this extension.
2. Navigate to the product page for the item you are trying to buy. Product pages have a URL in the format of `https://www.target.com/p/*`.
3. Press F5 to reload the page once, then watch as the extension kicks in. The page will reload itself periodically. Once the item is in stock, it will be automatically added to cart, the page will stop refreshing, and a loud sound will play.

How to test: Navigate to a product page for an in-stock item, then press F5. This will trigger the automatic add to cart mechanism.
