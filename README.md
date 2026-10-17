# Event Management System

Web Programming Assignment 2.

Built with React, Redux Toolkit, and React Router. Ticketmaster API integration will be added later.

## Setup

Install Node.js 22.12 or newer, then install the project dependencies:

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Build

```bash
npm run build
```

Do not commit API keys or `.env` files.

## Ticketmaster API setup

Create a local `.env` file in the project folder and add your Ticketmaster API key:

```text
VITE_TICKETMASTER_API_KEY=your_api_key_here
```

Get your key from https://developer.ticketmaster.com/ and restart the development server after adding it. The `.env` file is ignored by Git.
