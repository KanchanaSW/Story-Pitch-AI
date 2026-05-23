# Story Pitch AI

Turn a wild one-sentence story pitch into a full cinematic synopsis — with typewriter animation and narration.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and add your Groq API key:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get a key at [console.groq.com](https://console.groq.com).

3. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Groq SDK (`llama-3.3-70b-versatile`)
- Web Speech API (browser narration)
