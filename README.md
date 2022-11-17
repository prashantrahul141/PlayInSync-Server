### <p align='center'><b>Play <i>offline</i> videos in Sync across the internet.</b> </p>

# Server Code for PlayInSync

This contains the server code for PlayInSync written in TypeScript using Express, Any changes made on the client (videoplayback) will be sent to the server and synced with all other clients.

### How?

Everytime someone changes the state of video playback (play/pause, seek, playback speed) the client sends that information to the server, and the server stores them, when all other clients connected to the same server request for changes the server sends those updates it stored previously and the clients update their playback state according to the data recieved.

### Why?

Since all clients have the video required to sync even before the sync starts, this removes the hassel of streaming video (which leads to loss in quality and drop in fps)

For client see - https://github.com/PlayInSync/PlayInSync-Client

# 🛠️ Installation & Set Up

##### 1. Clone the repo

```sh
git clone https://github.com/PlayInSync/PlayInSync-Client
```

##### 2. Install packages

```sh
npm i
```

##### 3. Run index.js using node

```sh
npm start
```

##### 4. Expose it to the Internet.

By default the app will listen to port 3000 and localhost, expose that to the internet to be able to use it from anywhere.

# 💻 Technologies used

- TypeScript
- Express
