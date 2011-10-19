offline-app
===========

offline-app is an example offline web application. It uses an HTML5 manifest file for storing static files in the application cache along with localStorage.

There is an example cross-domain ajax request for image data (canvas does not support cross domain image loading) for loading images from a CDN for example. The image data string (base64 encoded) can then be stored in localStorage for offline use.

Because the `navigator.onLine` is not consistently supported and its behavior varies from browser to browser, there is a ping function that continuously polls a server side ping.php file to check if the connection has been lost.

Demo
----

http://chovy.dyndns.org/offline-app/stuff.htm

You can unplug your network cable or turn off Airport (mac os) to simulate offline mode, and you should see the images and data being loaded from localStorage.

Usage
-----

There are two functions `doOffline()` and `doOnline()` which get triggered whenever the user comes back online or goes offline. This can be used to read and write from localStorage or update a central server once they come back online.

You can switch to offline mode in Firefox, or simply unplug your network cable or turn off Airport (mac wifi). This will cause the static ping to fail and run the `doOffline()` function.

Requirements
------------

Modern browser (chrome, firefox, safari).
Apache w/ PHP processing for .manifest files (see .htaccess)

Caveats
-------

To fully test the offline ping.php request, the site cannot be ran on localhost since it will not traverse the network and will always respond even if the network connection is take down.
