# Together Agency | Developer Technical Assignment

This is a technical assignment for a creative developer position at Together Agency. Developed by GeorgeCht.

## Getting Started

First, run the development server:

```bash
bun dev
```

## Static build

```bash
bun run build
```

## Folder Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── ...
│   ├── ui/
│   │   ├── ...
├── lib/
│   ├── data/
│   │   └── static.tsx
│   └── utils/
│       └── cn.ts
└── hooks/
    └── ...
```

## Testing

For accessibility testing, powered by `@axe-core/cli`, read [`the documentation`](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/cli/README.md) for more.

### Installation

Install axe CLI globally: `bun add @axe-core/cli -g`

To install the latest version of Chromedriver globally, install browser-driver-manager: `bun add browser-driver-manager -g`. Then run `bunx browser-driver-manager install chrome`.

### Testing

Start a local dev server and run the tests:

```bash
bun run test:a11y
```