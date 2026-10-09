# AI Web Scraper

A simple AI-powered web scraper that takes a webpage URL and generates a clear summary of its main ideas.

## What it does

1. Enter a webpage URL.
2. The app downloads the webpage.
3. It extracts readable content from the page and removes unnecessary elements such as scripts, styles, navigation, headers, and footers.
4. The extracted content is sent to Groq AI.
5. Groq generates a concise summary.
6. The page content and summary are saved in MongoDB.
7. If the same URL was summarized before, the app returns the saved result instead of processing it again.

## Tech Stack

- **Next.js 16** – Full-stack React framework and API routes
- **React 19** – User interface
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Styling
- **Cheerio** – Extracts readable text from HTML pages
- **Groq SDK** – Generates AI summaries
- **Inngest** – Runs the scraping and summarization workflow with retries
- **MongoDB + Mongoose** – Stores webpages and summaries
- **Axios** – Sends requests from the frontend to the API
- **Zod** – Validates environment variables
- **React Query** – Manages API requests and loading states

## How the application works

The frontend sends the URL to `POST /api/summary`.

The API first checks MongoDB for an existing summary:

- If a summary exists, it is returned immediately.
- If no summary exists, the API sends a `scraper/requested` event to Inngest.

The Inngest workflow then:

1. Fetches the webpage.
2. Extracts the title and readable text with Cheerio.
3. Sends the content to Groq AI.
4. Saves the result in MongoDB.
5. Returns the generated summary to the user.

## Getting Started

### 1. Install dependencies

This project uses pnpm:

```bash
pnpm install
```

You can also use npm if needed:

```bash
npm install
```

### 2. Add environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start the development server

```bash
pnpm dev
```

Or:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
pnpm dev      # Start the development server
pnpm build    # Create a production build
pnpm start    # Start the production server
pnpm lint     # Check the code with ESLint
```

## Project Structure

```text
app/                    Next.js pages and API routes
  api/summary/          Summary API endpoint
  api/inngest/          Inngest API endpoint
inngest/                Background summarization workflow
lib/scrapper.ts         Fetches and extracts webpage content
lib/llm.ts              Sends webpage content to Groq AI
lib/db.ts               MongoDB connection and summary model
summary/                Summary page, form, service, and UI components
```

## Notes

- The URL must point to an HTML webpage.
- The scraper keeps up to 20,000 characters of readable page content.
- Webpages are treated as untrusted content and are sent to the AI only for summarization.
- Previously generated summaries are cached in MongoDB.

## Future Improvements

- Add user accounts and personal summary history.
- Support exporting summaries as Markdown or PDF.
- Add summary length and language options.
- Improve support for pages that require JavaScript to render.
- Add rate limiting and stronger URL validation.
