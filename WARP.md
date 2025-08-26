# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Binabusiness is a SvelteKit-based e-commerce marketplace application with user authentication, article management, and business functionality. The project uses:

- **SvelteKit 2.x** with TypeScript
- **Prisma** with SQLite for database management  
- **better-auth** for authentication (Google OAuth + email/password)
- **TailwindCSS 4.x** + **DaisyUI** for styling
- **pnpm** as package manager

## Common Development Commands

### Package Management
```bash
pnpm install                    # Install dependencies
pnpm install <package>          # Add new dependency
pnpm install -D <package>       # Add dev dependency
```

### Development Server
```bash
pnpm dev                        # Start development server
pnpm dev -- --open              # Start dev server and open browser
```

### Building & Preview
```bash
pnpm build                      # Build for production (includes prepack)
pnpm preview                    # Preview production build
pnpm pack                       # Create npm package
```

### Code Quality
```bash
pnpm lint                       # Run ESLint and Prettier checks
pnpm format                     # Format code with Prettier
pnpm check                      # Type check with svelte-check
pnpm check:watch                # Type check in watch mode
```

### Database (Prisma)
```bash
npx prisma db push              # Push schema changes to database
npx prisma studio               # Open Prisma Studio database viewer
npx prisma generate             # Generate Prisma client
npx prisma migrate dev          # Create and apply migration
```

## Architecture & Structure

### Route-Based Architecture
The application follows SvelteKit's file-based routing with three main sections:

- **`/` (Public)**: Landing page and authentication
- **`/admin`**: Administrative interface (requires authentication)
- **`/market`**: Main marketplace interface (requires authentication)

Both `/admin` and `/market` routes use server-side authentication guards via `+layout.server.ts` that redirect unauthenticated users to `/`.

### Library Organization (`src/lib/`)

**Server-side (`src/lib/server/`)**:
- `auth.ts`: better-auth configuration with Google OAuth and email/password
- `prisma.ts`: Prisma client instance
- `domaine/`: Business logic domain layer (currently empty)

**Client-side (`src/lib/client/`)**:
- `auth.client.ts`: Client-side authentication wrapper with methods for sign-in/out
- `components/`: Reusable Svelte components (headers, forms, sections)
- `imageClient.ts`: Image handling utilities

### Database Schema (Prisma)
Key models include:
- **User**: Authentication + profile (supports vendors)
- **Articles**: Product listings with images and pricing
- **Orders**: Transaction management between buyers/sellers
- **Comments**: Product reviews/feedback
- **Messagers**: User-to-user messaging system
- **Numbers**: Seller contact information

### Authentication Flow
Uses better-auth with:
- Google OAuth integration
- Email/password with verification required
- Session management with Prisma adapter
- Client-side auth state management via `authClient`

### API Routes
- `/api/auth/[...auth]`: better-auth endpoints
- `/api/uploads/`: File upload handling for articles

## Development Notes

### Environment Setup
The app expects these environment variables:
- `DATABASE_URL`: SQLite database path
- `GOOGLE_ID`: Google OAuth client ID  
- `GOOGLE_SECRET`: Google OAuth client secret

### Package Manager
This project uses **pnpm** exclusively. The `pnpm` configuration restricts built dependencies to optimize performance.

### Code Style
- Uses tabs for indentation
- Single quotes preferred
- 100 character line limit
- Prettier + ESLint integration with Svelte support

### Component Patterns
- Server-side authentication guards on protected routes
- Centralized auth client for consistent authentication handling
- Separate admin and market layouts with shared authentication logic

### Database Development
- SQLite for development (see `prisma/dev.db`)
- Use Prisma Studio for database inspection
- Schema changes require `db push` or migrations
