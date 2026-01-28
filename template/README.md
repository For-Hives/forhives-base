# ForHives App

Modern Next.js 16 template with the latest stack.

## Stack

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Linting/Formatting**: Biome
- **State Management**: Zustand
- **Validation**: Valibot
- **Backend**: PocketBase
- **AI**: Vercel AI SDK (multi-provider)
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- Bun >= 1.3.x (recommended) or npm/yarn
- PocketBase instance (optional, for backend features)

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

```bash
bun run build
bun run start
```

### Linting & Formatting

```bash
# Check for issues
bun run lint

# Auto-fix issues
bun run check

# Format code
bun run format
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `PB_URL` | PocketBase server URL |
| `PB_TOKEN` | PocketBase admin token (optional) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key |
| `OPENAI_API_KEY` | OpenAI API key |
| `ANTHROPIC_API_KEY` | Anthropic API key |

### shadcn/ui Components

Add new components with:

```bash
bunx shadcn@latest add <component-name>
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css      # Tailwind + shadcn theme
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── providers.tsx    # React providers
├── components/
│   └── ui/              # shadcn components
├── hooks/               # Custom React hooks
├── lib/
│   ├── utils.ts         # Utility functions (cn)
│   └── validations/     # Valibot schemas
├── services/            # PocketBase & API services
└── stores/              # Zustand stores
```

## License

MIT
