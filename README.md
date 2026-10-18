# Event Management System

Web Programming Assignment 2 using React, Redux Toolkit, React Router, and the Ticketmaster Discovery API.

## Features

- Register an account, log in, and log out.
- Browse upcoming events and search by keyword, category, and date range.
- View event images, dates, times, venues, locations, categories, and additional information.
- Register for events without duplicate registrations.
- View your upcoming and completed registrations in My Events.
- Cancel upcoming registrations.
- Keep your login and registrations after refreshing the page.

## Setup

Install Node.js 22.12 or newer and npm, then open a terminal in the project folder.

Install dependencies:

```bash
npm install
```

Get an API key from the [Ticketmaster Developer Portal](https://developer.ticketmaster.com/).

Copy `.env.example` to a new file named `.env` in the project folder. Replace the placeholder with your key:

```text
VITE_TICKETMASTER_API_KEY=your_api_key_here
```

The `VITE_` prefix allows the React app to read the environment variable through Vite. Do not commit your real API key or `.env` file. The example contains only a placeholder.

## Run locally

```bash
npm run dev
```

Open the local URL shown in the terminal. Restart the development server whenever you change `.env`.

## Production build

```bash
npm run build
npm run preview
```

The build is created in `dist`. The preview command serves that build locally.

## Using the app

1. Open Register and create an account with your name, email, and a password of at least six characters.
2. Open Events, choose any search filters, and select Search.
3. Open View details on an event and select Register for event.
4. Open My Events to view registrations or cancel an upcoming registration.
5. Use Logout to end the session. You can log in again with the same account.

Authentication is a frontend simulation with no backend. Accounts, including passwords, are stored in the browser's Local Storage for this assignment. Use a sample password. Different browsers have separate accounts and registrations.

Events without a confirmed date remain in the upcoming group. If an end time is available, it determines completion; otherwise the start time is used, or the end of the displayed date when the time is unknown.

If events do not load, check your internet connection and API key, then restart the development server. Live event data requires a valid key.

## API documentation

[Ticketmaster Discovery API documentation](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)
