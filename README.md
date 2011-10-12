offline-app
===========

offline-app is an example offline web application. It uses an HTML5 manifest file for storing static files in the application cache along with localStorage.

There is an example cross-domain ajax request for image data (canvas does not support cross domain image loading). The image data string (base64 encoded) can then be stored in localStorage for offline use.

Because the `navigator.onLine` is not consistently support and its behavior varies from browser to browser, there is a ping function that continuously polls a server side ping.php file to check if the connection has been lost.

Requirements
------------

Modern browser (chrome, firefox, safari).
PHP processing for .manifest files (see .htaccess)

Caveats
-------

To fully test the offline ping.php request, the site cannot be ran on localhost since it will not traverse the network and will always respond even if the network connection is take down.
