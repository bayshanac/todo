# React Todo Application

A modern todo application built with React, TypeScript, and Vite.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/bayshanac/todo.git
cd todo
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:

```bash
VITE_API_URL=your_api_url_here
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests

## Technology Stack

- React 19
- TypeScript
- Vite
- ESLint
- Jotai
- TailwindCSS
- React Icons

## Project Structure

```
src/
  ├── components/   # Reusable UI components
  ├── atoms/        # State management
  ├── types/        # TypeScript types
  ├── utils/        # Utility functions
  ├── assets/       # Assets
  └── hooks/        # Custom hooks
```

## License

MIT
