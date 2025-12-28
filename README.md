# Vite + Vue 3 + Sanity

A minimal template for Vue 3 + TypeScript with Sanity CMS integration.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and add your Sanity credentials:

```bash
cp .env.example .env
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Sanity Configuration

1. Get your project ID from [sanity.io/manage](https://sanity.io/manage)
2. Update `.env` with your `projectId` and `dataset`
3. Ensure CORS is enabled for your dev URL (usually `http://localhost:5173`)

## Project Structure

```
src/
├── sanity/
│   ├── client.ts    # Sanity client setup
│   └── queries.ts   # GROQ queries
├── App.vue          # Main component
└── main.ts          # Vue entry
```
