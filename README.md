<img alt="Slack" width="250" height="250" src="./public/Slack_Mark.svg"/>

# Slack Vuesualizer

A web app to view, search and share a Slack team's exported files.

Use the hosted version at [https://slack-vuesualizer.vercel.app/](https://slack-vuesualizer.vercel.app/) for free or spin up your own website using the Docker image.

## WIP

This is a work in progress.

## Features

* full-text search for up to tens of thousands of messages per channel
* view all messages per channel with proper formatting, files, etc.
* view and search through all users
* pleasant UI

## Technologies

* [Nuxt 3](https://v3.nuxtjs.org/)
* [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com)
* [Iconify](https://github.com/iconify/iconify)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://www.docker.com/)
* [Vercel](https://vercel.com/)

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
services:
  app:
    image: chris5896/slack-vuesualizer
    restart: unless-stopped
    ports:
      - '3000:3000'
    environment:
      NUXT_MONGODB_URI: 'mongodb://root:example@localhost:27017'
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

Start the development server on [http://localhost:3000](http://localhost:3000)

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
