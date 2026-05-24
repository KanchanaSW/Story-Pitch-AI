# Story Pitch AI

Turn a wild one-sentence story pitch into a full cinematic synopsis — with typewriter animation and warm voice narration.

**Story Pitch AI — Turn One Line Into a Legend**

## What it does

1. You enter a one-line story pitch (or pick a random one).
2. Groq AI expands it into a structured cinematic story: title, genre, tagline, synopsis, characters, and twist.
3. The synopsis types out character-by-character with a film-noir typewriter effect.
4. When typing finishes, you can narrate the story aloud using the browser Web Speech API.

## Features

- **AI story generation** via Groq (`llama-3.3-70b-versatile`)
- **Concise cinematic synopses** — 3–4 paragraphs (~450–600 words), three-act arc
- **Typewriter animation** — synopsis reveals at 18ms per character
- **Warm narration** — soft voice, slower pace (Web Speech API)
- **Random pitch ideas** — 8 pre-written wild one-liners
- **Keyboard shortcut** — `Cmd+Enter` / `Ctrl+Enter` to generate
- **Film-noir UI** — dark palette, gold accents, film-grain overlay, Playfair Display + Special Elite fonts

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| AI | [Groq SDK](https://github.com/groq/groq-typescript) — `llama-3.3-70b-versatile` |
| Narration | Web Speech API (browser, no install) |
| Language | TypeScript |

## Getting started

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com)

### Install & run

```bash
npm install
```

Copy the example env file and add your key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
GROQ_API_KEY=your_groq_api_key_here
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Project structure

```
app/
  page.tsx              # Main UI — state, typewriter, narration
  layout.tsx            # Fonts, metadata, film-grain overlay
  globals.css           # Theme tokens and animations
  api/story/route.ts    # POST handler → Groq → JSON story
components/
  PitchInput.tsx        # Textarea, submit, random pitch, word count
  SynopsisCard.tsx      # Animated story display + twist
  CharacterList.tsx     # Character cards
  NarrateButton.tsx     # Play / stop speech
  LoadingState.tsx      # Clapperboard loading animation
types/story.ts          # StorySchema interface
lib/randomPitches.ts    # Random pitch pool
```

## API

**`POST /api/story`**

Request body:

```json
{ "pitch": "A jazz pianist can only play songs that predict crimes." }
```

Response (`200`):

```json
{
  "title": "...",
  "genre": "...",
  "tagline": "...",
  "synopsis": "...",
  "characters": [{ "name": "...", "role": "..." }],
  "twist": "..."
}
```

Error codes: `400` (invalid pitch), `500` (missing API key), `502` (bad AI JSON), `503` (Groq error).

## Troubleshooting

**`Cannot find module './948.js'` (or similar webpack chunk error)**

Stale Next.js build cache. Clean and restart:

```bash
rm -rf .next
npm run dev
```

If it persists:

```bash
rm -rf .next node_modules
npm install
npm run dev
```

**`GROQ_API_KEY is not configured`**

Set a real key in `.env.local` (not the placeholder `your_groq_api_key_here`), then restart the dev server.

**Narration doesn't work**

Web Speech API requires a supported browser (Chrome, Safari, Edge). Voices load asynchronously — try clicking **Narrate Story** again if the first attempt is silent.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | ESLint |

## License

Private project.
