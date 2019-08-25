install nodejs then run "npm install [libraryname]" to install libraries
  two libraries are needed, "socketio" (asynchronous sockets) and "pako" (zlib commpression)
  i.e "npm install socketio" and "npm install pako"
 
navigate to this directory('../maybeArt/jsArt/') from a command line
type node nodeRun.js
when you see 'Running...' the application will be available in any browser at localhost:10001

you can make your localhost public with ngrok
  execute ngrok.exe and enter 'http 10001' into the popup console
    this will give you a url that you and others can join to view the running node script

running 'node noNode.js' will run without node

in the browser:
  click on the box at the top left to move it, scroll to change the size
  drag an image from your computer, or an image from the browser into the box (png/jpg, gif only)
    -Right click an image in a browser > View Image(or Open in New Tab), this opens the image directly 
    -Then drag the image into a box
   images dragged onto the background will set the background of your client, others will not see this
  press 't' while holding a box to make text appear
  press '=' to create new boxes '-' to delete one that you are holding
