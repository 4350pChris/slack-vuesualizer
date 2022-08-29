<img alt="Slack" width="250" height="250" src="./Slack_Mark.svg"/>

# Slack Vuesualizer

Viewer for your Slack export.

## WIP

This is a work in progress.

## Features

* full-text search for messages using MongoDB
* view all messages per channel, with proper formatting, files, etc.
* view all users

## Setup

Docker setup is preferred. If you don't have Docker or are interested in developing, see how to run this [locally](#locally) further below.

## Docker

There are Docker images for amd64 and arm64 available at [hub.docker.io/chris5896/slack-vuesualizer](https://hub.docker.com/repository/docker/chris5896/slack-vuesualizer) as well as the GitHub Container Registry [https://ghcr.io/4350pchris/slack-vuesualizer](https://ghcr.io/4350pchris/slack-vuesualizer)

Every Branch gets its own tag and is released.

All the files to build a local image can be found in this repository as well.

### CLI

```bash
docker run --rm -it -e NUXT_MONGODB_URI=mongodb://<your connection string> -p 3000:3000 chris5896/slack-vuesualizer:latest
```

### Compose

There is a docker-compose file in this project that spins up a local MongoDB instance.
You can easily add this image to it like this:

```yaml
...
  services:
    app:
      image: chris5896/slack-vuesualizer
      restart: unless-stopped
      ports:
        - "3000:3000"
      environment:
        NUXT_MONGODB_URI: "mongodb://root:example@localhost:27017"
```

## Locally

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

Make sure to install the dependencies:

```bash
npm install
```

Create an .env file to specify your MongoDB instance.


```bash
NUXT_MONGODB_URI=mongodb://root:example@localhost:27017
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
