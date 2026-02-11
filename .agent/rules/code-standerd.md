---
trigger: always_on
---

# Antigravity Coding Standards for Market Frontend

You are a strict coding standards enforcer for this project.
Always follow the rules below without exception.

## 1. Component Folder Structure

- Never create a React component as a single `.tsx` file directly.
- Every component MUST be created inside its own folder.
- The folder name must match the component name (PascalCase).
- Inside the folder, the component file MUST be named `index.tsx`.

✅ Correct:

```
components/
 └─ Button/
    └─ index.tsx
```

❌ Incorrect:

```
components/
 └─ Button.tsx
```

## 2. Component Export Convention

- Components MUST use named exports, NOT default exports.
- Export the component directly with the `export` keyword.

✅ Correct:

```typescript
export const Button = () => {
  return <button>Click me</button>;
};
```

❌ Incorrect:

```typescript
const Button = () => {
  return <button>Click me</button>;
};
export default Button;
```

## 3. Barrel Export Files

- Every component directory should have an `index.ts` barrel export file.
- Use wildcard exports (`export * from`) for re-exporting components.
- This enables cleaner imports from a single entry point.

✅ Correct barrel export (`components/index.ts`):

```typescript
export * from "./Button";
export * from "./Card";
export * from "./Input";
```

Usage:

```typescript
import { Button, Card, Input } from "@/components";
```

## 4. Component Location Rule

- All reusable UI components MUST be created inside the `components` folder.
- Do NOT place components outside the `components` directory unless explicitly instructed.
- Page-level components should live inside the appropriate page or feature folder.

## 5. Folder Structure Enforcement

- Always follow the existing project folder structure.
- Do NOT introduce new folders or files unless they align with the current architecture.
- If a required folder does not exist, create it before adding files.

## 6. Naming Conventions

- Component names must be in PascalCase.
- Folder names must exactly match the component name.
- Component names must be in PascalCase.
- Folder names must exactly match the component name.
- File name inside component folders must always be `index.tsx`.

### Grouping Folders Exception

- Logical grouping folders (e.g., `ui`, `provider`, `customer`) may be lowercase/kebab-case.
- These folders are for organization only and should contain component folders inside them.

## 7. When Creating a New Component

- Automatically create:
  - A folder with the component name
  - An `index.tsx` file inside it with named export
  - Update the parent directory's barrel export file
- Never suggest or generate a standalone component file.

## 8. Code Generation Behavior

- If a user asks to create a component directly as a file, correct them and apply the folder-based structure.
- If existing code violates these rules, suggest refactoring to match the standards.

## 9. Import Conventions

- When importing components, import from the folder path (not the index file):

  ```typescript
  // ✅ Correct (using barrel export)
  import { Button, Card } from "@/components";

  // ✅ Also correct (direct import)
  import { Button } from "@/components/Button";

  // ❌ Incorrect
  import Button from "@/components/Button/index";
  ```

## 10. Project Architecture

- Follow the existing Next.js App Router structure
- Maintain separation between:
  - `/app` - Next.js pages and routes
  - `/components` - Reusable UI components
  - `/services` - API service layers
  - `/lib` - Utility functions and helpers
  - `/types` - TypeScript type definitions

## 11. Barrel Export Structure

The project uses the following barrel export files:

- `src/components/index.ts` - Exports all main components
- `src/components/provider/index.ts` - Exports provider-specific components
- `src/components/ui/index.ts` - Exports all UI library components
- `src/components/customer/index.ts` - Exports customer-specific components

Always prioritize consistency, scalability, and clean architecture.
Do not break these rules unless the user explicitly asks to override them.
