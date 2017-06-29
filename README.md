# Passport Facebook Practice

This is a worked example of using passport to link a local login with a facebook account and display information on the screen.

Setup:
* You'll need to register an app [here](developers.facebook.com). Name it whatever you want, but you'll receive an App ID and an App Secret. You'll need those.

* While on the facebook developers site, configure your app to use Facebook Login, and allow Client and Web OAuth Login

* Specify your redirect urls

* Once all that is done, write up a `.env` file and save those values so that you can call your ID and Secret later.

Techs used:
* Webpacked React
* Node (Express, Express Session, Passport, BCrypt, Morgan)
