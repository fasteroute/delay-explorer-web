delay-explorer-web
==================

This repository contains the web frontend for the Fasteroute Delay Explorer web-app. It is
implemeneted in HTML5 and React and was developed as part of the *Visualising Rail Disruption*
Summer Showcase project in partnership with the [Open Data Institute](http://theodi.org).

You can see it in action at http://delayexplorer.fasteroute.com.

Hacking
-------

You'll need the delay-explorer-api and related data collection systems up and running in order to
have the needed infrastructure to make this work. *Please run your own instance of this API - don't
connect to someone else's* as it's a pretty heavyweight system and will hit their servers hard.
You also need to sign up with National Rail to get access to the data feed that powers this system,
and agree to their Open Data terms and conditions.

To build this frontend, use the following commands.

If you don't have gulp installed, then:

    $ npm install --global gulp

Then:

    $ npm install

    $ gulp

Have fun.

Deploying
---------

You'll need to figure out the best way to deploy it for your purposes, but the built code will
be in the dist folder, and you can server this however you want. The hard bit is setting up your
own API instance to provide the data for it. Please also note that only basic CSS styling is
provided in this repo, so you'll want to apply your own colour scheme and artwork to it before
deploying it in any kind of production contexxt.

Contributing
------------

We're very happy to receive pull requests, so if you feel like implementing a new feature, or fixing
a bug, please do go ahead and do it and send a pull request!


