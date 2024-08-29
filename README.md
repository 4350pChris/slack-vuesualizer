# Slack Vuesualizer

<img alt="Slack" width="250" height="250" src="./public/Slack_Mark.svg"/>

Are you on the free plan of Slack and can't access your old messages anymore?
Then this is the tool for you!

Slack Vuesualizer is a web app to view, search and share your old Slack messages.

![Screenshot](./public/screenshot.png)

Use the hosted version at [https://slack-vuesualizer.de/](https://slack-vuesualizer.de/) for free or spin up your own website using the Docker image as [described below](#setup).

## Features

* full-text search for up to tens of thousands of messages per channel
* view all messages per channel with proper formatting, files, etc.
* view and search through all users
* pleasant UI

## Setup

### Docker

The easiest way to get started is to use the Docker image.
For this you'll need to have [Docker](https://www.docker.com/) installed on your machine.

Next, copy the `docker-compose.yml` file from this repository to your machine.
From the directory where the file is located, open a terminal and run:

```bash
docker compose up
```

That's it! Docker will download the images and start the app on [http://localhost:3000](http://localhost:3000).

#### Images

There are Docker images for amd64 and arm64 available at [hub.docker.io/chris5896/slack-vuesualizer](https://hub.docker.com/repository/docker/chris5896/slack-vuesualizer) as well as the GitHub Container Registry [https://ghcr.io/4350pchris/slack-vuesualizer](https://ghcr.io/4350pchris/slack-vuesualizer)

Every Branch gets its own tag and is released.

All the files to build a local image can be found in this repository as well.

## Contributing

Contributions are welcome! Feel free to fork this repository and open a pull request.

If you have an idea for a feature or a bug to report, feel free to open an issue.

### Development

Look at the [nuxt 3 documentation](https://nuxt.com) to learn more.

Make sure to install the dependencies:

```bash
npm install
```

#### MongoDB

This project contains a Docker Compose file to start a local MongoDB instance. You can start it with:

```bash
docker compose -f docker-compose.dev.yml up
```

#### Development Server

Start the development server on [http://localhost:3000](http://localhost:3000)

```bash
npm run dev
```

#### Production (Preview) Server

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Technologies

* [Nuxt 3](https://v3.nuxtjs.org/)
* [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com)
* [Iconify](https://github.com/iconify/iconify)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://www.docker.com/)
* [Vercel](https://vercel.com/)
