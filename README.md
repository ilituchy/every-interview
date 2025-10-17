# Every.io Code Challenge - Solution

https://www.loom.com/share/3df7fcb5424644638b00724cb178e2ff

This is Ian Lituchy's solution to the Every.io code challenge - a Trello-style todo board with three columns (Todo, In Progress, Done).

## Documentation

- **[PLAN.md](./PLAN.md)** - Initial planning and implementation approach
- **[DESIGN_DOC.md](./DESIGN_DOC.md)** - Architecture decisions and component design

## Features

- Three-column kanban board (Todo, In Progress, Done)
- Move items between columns using arrow buttons
- Add new todo items
- Edit existing todos with modal dialog
- Delete todos with confirmation
- Button states properly disabled at column boundaries
- Scalable architecture using index-based column logic
- Text truncation with tooltips for long items
- Auto-scroll to newest items
- Modern, Jira-inspired design
- Comprehensive test coverage (26 tests passing)

---

## Tech Stack

- **React 18**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Vitest**
- **ESLint**

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building

Build for production:

```bash
npm run build
```

### Testing

Run tests:

```bash
npm run test
```

Run tests with UI:

```bash
npm run test:ui
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── App.tsx                      # Main App component with header
│   ├── App.test.tsx                 # App tests
│   ├── ChallengeComponent.tsx       # Main container with state management
│   ├── ChallengeComponent.test.tsx  # Integration tests for main functionality
│   ├── types.ts                     # Centralized TypeScript type definitions
│   ├── components/
│   │   ├── SwimLane.tsx             # Column component with auto-scroll
│   │   ├── TodoItem.tsx             # Individual todo card component
│   │   ├── TodoItem.test.tsx        # Unit tests for TodoItem
│   │   ├── TodoInputForm.tsx        # Add todo form component
│   │   └── EditModal.tsx            # Modal for editing todos
│   ├── main.tsx                     # App entry point
│   ├── index.css                    # Global styles with Tailwind
│   └── setupTests.ts                # Test setup
├── PLAN.md                          # Initial planning document
├── DESIGN_DOC.md                    # Architecture and design decisions
├── index.html                       # HTML template
├── vite.config.ts                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
└── tsconfig.json                    # TypeScript configuration
```
