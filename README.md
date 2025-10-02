# Multi-Module Project with PatternFly Table

This project demonstrates a multi-module setup using pnpm workspaces, TypeScript, Vite, and React with Webpack Module Federation. It consists of four modules:

1. **`@poc/lib`** - A library module that exports a PatternFly table component
2. **`@poc/example`** - A web application that uses the table component from the lib module
3. **`@poc/remote`** - A Webpack Module Federation remote that exposes the PatternFly table component
4. **`@poc/consumer`** - A consumer application that demonstrates how to use the federated module

## Project Structure

```
poc/
├── packages/
│   ├── lib/                    # PatternFly table component library
│   │   ├── src/
│   │   │   ├── PatternFlyTable.tsx
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── example/                # Example web application
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── index.css
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── remote/                 # Webpack Module Federation remote
│   │   ├── src/
│   │   │   ├── PatternFlyTableWrapper.tsx
│   │   │   └── index.ts
│   │   ├── public/
│   │   │   └── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── webpack.config.cjs
│   └── consumer/               # Consumer application
│       ├── src/
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   ├── federatedModule.ts
│       │   └── index.css
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── package.json
└── pnpm-workspace.yaml
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.15.1 or higher)

### Installation

1. Install dependencies for all workspaces:
   ```bash
   pnpm install
   ```

2. Build all modules:
   ```bash
   pnpm build
   ```

3. Start the development servers:
   ```bash
   # Start the remote module (Module Federation)
   pnpm dev:remote
   
   # Start the example app (in another terminal)
   pnpm dev:example
   
   # Start the consumer app (in another terminal)
   pnpm dev:consumer
   ```

### Available Scripts

#### Root Level
- `pnpm build` - Build all modules
- `pnpm dev` - Start development servers for all modules
- `pnpm dev:remote` - Start the Module Federation remote server
- `pnpm dev:example` - Start the example application
- `pnpm dev:consumer` - Start the consumer application
- `pnpm type-check` - Run TypeScript type checking for all modules
- `pnpm clean` - Clean build artifacts for all modules

#### Lib Module (`packages/lib`)
- `pnpm build` - Build the library and generate type declarations
- `pnpm dev` - Build the library in watch mode
- `pnpm type-check` - Run TypeScript type checking
- `pnpm clean` - Clean build artifacts

#### Example Module (`packages/example`)
- `pnpm dev` - Start the development server
- `pnpm build` - Build the production bundle
- `pnpm preview` - Preview the production build
- `pnpm type-check` - Run TypeScript type checking
- `pnpm clean` - Clean build artifacts

#### Remote Module (`packages/remote`)
- `pnpm dev` - Start the Module Federation development server
- `pnpm build` - Build the federated module
- `pnpm type-check` - Run TypeScript type checking
- `pnpm clean` - Clean build artifacts

#### Consumer Module (`packages/consumer`)
- `pnpm dev` - Start the development server
- `pnpm build` - Build the production bundle
- `pnpm preview` - Preview the production build
- `pnpm type-check` - Run TypeScript type checking
- `pnpm clean` - Clean build artifacts

## PatternFly Table Component

The `@poc/lib` module exports a `PatternFlyTable` component with data fetching capabilities and fixed columns:

```typescript
interface PatternFlyTableProps {
  dataFetcher: () => Promise<Array<Record<string, any>>>;
  className?: string;
  onRowClick?: (event: React.MouseEvent, rowIndex: number, row: Record<string, any>) => void;
  loading?: boolean;
  error?: string | null;
  refreshTrigger?: number; // Can be used to trigger data refresh
}
```

### Usage Example

```tsx
import { PatternFlyTable, TableColumn } from '@poc/lib'

const fetchData = async () => {
  // Simulate API call
  const response = await fetch('/api/users')
  return response.json()
}

function MyComponent() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div>
      <button onClick={handleRefresh}>Refresh Data</button>
      <PatternFlyTable
        dataFetcher={fetchData}
        refreshTrigger={refreshTrigger}
        onRowClick={(event, rowIndex, row) => {
          console.log('Clicked row:', rowIndex, row)
        }}
      />
    </div>
  )
}
```

### Key Features

- **Data Fetching**: Asynchronous data loading with built-in loading states
- **Error Handling**: Built-in error states and display
- **Refresh Capability**: Trigger data refresh with `refreshTrigger` prop
- **Loading States**: Automatic loading indicators during data fetching
- **Empty States**: Displays "No data available" when no data is returned

## Module Federation

The `@poc/remote` module demonstrates how to expose a React component using Webpack Module Federation. This allows other applications to consume the PatternFly table component remotely without bundling it directly.

### Remote Module Configuration

The remote module is configured to:
- Expose the `PatternFlyTable` component at `remote/PatternFlyTable`
- Share React, React DOM, and PatternFly dependencies
- Run on `http://localhost:3001`

### Consuming the Federated Module

The `@poc/consumer` module demonstrates how to consume the federated component:

```typescript
// In a real application, you would use @module-federation/vite or similar
import { loadPatternFlyTable } from './federatedModule'

const { PatternFlyTable } = await loadPatternFlyTable()
```

### Federation Benefits

- **Code Splitting**: Components are loaded on-demand
- **Independent Deployments**: Remote modules can be updated independently
- **Shared Dependencies**: Common libraries are shared between applications
- **Micro-frontend Architecture**: Enables micro-frontend patterns

## Technologies Used

- **pnpm** - Package manager with workspace support
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Webpack** - Module bundler with Module Federation support
- **React** - UI library
- **PatternFly** - Design system and component library

## Development

The project uses pnpm workspaces to manage multiple packages in a single repository. The `lib` module is built as a library that can be consumed by the `example` module or any other application.

The example application demonstrates how to use the PatternFly table component with sample data and includes click handlers for interactive functionality.
