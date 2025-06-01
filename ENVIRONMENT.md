# Environment Configuration

This project uses Vite's built-in environment variable support. Environment variables are loaded from `.env` files and exposed to your application code.

## Environment Files

The following files are used for environment configuration:

```
.env                # Loaded in all environments
.env.local          # Loaded in all environments, ignored by git
.env.development    # Only loaded in development mode
.env.production     # Only loaded in production mode
.env.staging        # Only loaded in staging mode (custom)
.env.example        # Example file for documentation
```

### Loading Priority

Environment files are loaded with the following priority (highest to lowest):

1. `.env.[mode].local` (e.g., `.env.development.local`)
2. `.env.[mode]` (e.g., `.env.development`)
3. `.env.local`
4. `.env`

## Available Environment Variables

### Required Variables

- `VITE_API_URL`: The base URL for your API server
- `VITE_APP_NAME`: The name of your application
- `VITE_APP_VERSION`: The version of your application

### Optional Variables

- `VITE_DEBUG`: Enable debug mode (`true` or `false`)

## Usage in Code

Environment variables are available through `import.meta.env`:

```typescript
// Direct access
const apiUrl = import.meta.env.VITE_API_URL;

// Using the config helper (recommended)
import { apiUrl, config } from './config/env';

console.log(apiUrl); // http://localhost:3000/api
console.log(config.debug); // true/false (boolean)
```

## Development Setup

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your local settings:

   ```env
   VITE_API_URL=http://localhost:8080/api
   VITE_DEBUG=true
   ```

3. The `.env.local` file is ignored by git and won't be committed.

## Build Commands

```bash
# Development (uses .env.development)
npm run dev

# Production build (uses .env.production)
npm run build

# Staging build (uses .env.staging)
npm run build -- --mode staging
```

## Security Notes

- Only variables prefixed with `VITE_` are exposed to the client
- Never put sensitive information in environment variables that will be bundled
- Use `.env.local` for local development secrets
- The `.env.local` file is automatically ignored by git

## TypeScript Support

Environment variables are typed in `src/vite-env.d.ts`. Add new variables to the `ImportMetaEnv` interface:

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_NEW_VAR: string;
  // Add your new variables here
}
```
