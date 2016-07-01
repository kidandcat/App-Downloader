# Downloader
* Angular4

This server shows a simple interface to put an URL and email.
It starts downloading that URL using multithreading for being fault tolerant and use full bandwidth.
When it ends, it sends an email to the email input before with a link.


## It purpose is to have a 24/7 server to download those big files served at low download speed (200KB/s), then download the file from your server at full speed.

##Configuration
Configure the ip and port in server.js

##Usage 
* npm install
* npm start
