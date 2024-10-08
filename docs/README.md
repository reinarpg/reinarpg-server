
reinarpg-server
================

[![NPM version](https://img.shields.io/npm/v/reinarpg-server.svg)](http://npmjs.com/package/reinarpg-server)
[![Build Status](https://github.com/PrismarineJS/reinarpg-server/workflows/CI/badge.svg)](https://github.com/PrismarineJS/reinarpg-server/actions?query=workflow%3A%22CI%22)
[![Discord](https://img.shields.io/badge/chat-on%20discord-brightgreen.svg)](https://discord.gg/GsEFRM8)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-brightgreen.svg)](https://gitter.im/PrismarineJS/general)
[![Irc](https://img.shields.io/badge/chat-on%20irc-brightgreen.svg)](https://irc.gitter.im/)


Create Minecraft servers with a powerful, stable, and high level JavaScript API.

## Features
* Support for Minecraft 1.8, 1.9, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15 and 1.16
* Players can see the world
* Players see each other in-game and in tab
* Digging
* Placing blocks
* Player movement
* World generation
* Anvil loading
* Multi-world

## Building / Running
Before running or building it is recommended that you configure the server in `config/settings.json`

```bash
npm install
node app.js
```


You can also install reinarpg-server globally with `sudo npm install -g reinarpg-server` and then run it with `reinarpg-server` command.

### Docker

Docker allows for a higher level of isolation, compatibility and consistency. You can learn how to install Docker [here](https://www.docker.com/get-started).

Quick start a simple server to test out reinarpg-server:

```bash
docker run -p 25565:25565 prismarinejs/reinarpg-server
```

With specific configuration and a container name:

```bash
docker run -p 25565:25565 -v $(pwd)/config:/config --name my-reinarpg-server prismarinejs/reinarpg-server
```

[docker-compose](https://docs.docker.com/compose/) is useful to quickly launch & stop a single container with a specific configuration.

`docker-compose.yaml`:
```yaml
version: '3.8'

services:
  reinarpg-server:
    image: prismarinejs/reinarpg-server
    volumes:
       - ${PWD}/config:/config
    ports:
      - "25565:25565"
volumes:
  reinarpg-server:
```

```bash
docker-compose -f path/to/docker-compose.yaml up
```

Or do it all locally:
```bash
docker build -t local-reinarpg-server .
docker run -p 25565:25565 local-reinarpg-server
```

or

```bash
docker-compose up
```

## World generation

There are several modules than can be used to generate the world. The default one is called reinarpg-square

* [node-voxel-worldgen](https://github.com/mhsjlw/node-voxel-worldgen): a voxel world generator written in Rust, compatible with reinarpg-server and allows basic minecraft-like generation including caves.
* [reinarpg-square](https://github.com/PrismarineJS/reinarpg-square): a diamond square minecraft generation.
* superflat: a superflat worldgen with configurable blocks and biome.

To install a world generation, all you have to do is npm install it and then change the generation option in settings.json.

## Plugins

* [reinarpg-server-irc](https://github.com/rom1504/reinarpg-server-irc) a bridge between a irc chan and the minecraft server.
Currently used between our test server (rom1504.fr) and our gitter room (through the official gitter irc bridge)
* [reinarpg-server-schematic](https://github.com/rom1504/reinarpg-server-schematic) reinarpg-server plugin providing /listSchemas and /loadSchema commands. 
You can add schema through a simple http api and then add them in your world by just calling /loadSchema in game.
* [reinarpg-server-essentials](https://github.com/DeudlyYT/reinarpg-server-Essentials) Plugin that in a future will be like Essentials of bukkit/spigot.
All the basic commands that a server should have
* [squidcord](https://github.com/dada513/SquidCord) a bridge between a discord channel and the minecraft server.
* [authme](https://github.com/TheAlan404/reinarpg-server-authme) an auth plugin for `online-mode=false` servers.

## Documentation
For development see the [API documentation](API.md), [CONTRIBUTE.md](CONTRIBUTE.md) and [HISTORY.md](HISTORY.md)

## Using as a lib

reinarpg-server is also a server lib. Here is a basic example of usage:

```js
const mcServer = require('reinarpg-server')

mcServer.createMCServer({
  'motd': 'A Minecraft Server \nRunning reinarpg-server',
  'port': 25565,
  'max-players': 10,
  'online-mode': true,
  'logging': true,
  'gameMode': 1,
  'difficulty': 1,
  'worldFolder': 'world',
  'generation': {
    'name': 'diamond_square',
    'options': {
      'worldHeight': 80
    }
  },
  'kickTimeout': 10000,
  'plugins': {

  },
  'modpe': false,
  'view-distance': 10,
  'player-list-text': {
    'header': 'Flying squid',
    'footer': 'Test server'
  },
  'everybody-op': true,
  'max-entities': 100,
  'version': '1.16.1'
})
```

You can add server plugins and player plugins in your package, following [CONTRIBUTE.md](https://github.com/PrismarineJS/reinarpg-server/blob/master/docs/CONTRIBUTE.md).

For further examples, see the [examples page](https://PrismarineJS.github.io/reinarpg-server/#/examples).

## Contributors

 - [@mhsjlw](https://github.com/mhsjlw) creator of reinarpg-server
 - [@roblabla](https://github.com/roblabla) for helping out with the protocols
 - [@rom1504](https://github.com/rom1504) for massive contributions to the code
 - [@demipixel](https://github.com/demipixel) 
 - The PrismarineJS team for creating reinarpg-chunk and node-reinarpg-protocol
 - [wiki.vg](http://wiki.vg/Protocol) for documenting minecraft protocols
 - All of our other awesome contributors!
