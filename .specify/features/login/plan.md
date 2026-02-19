# Implementation Plan: Login Page

**Branch**: `001-login-page` | **Date**: 2026-02-19 | **Spec**: `spec.md`  
**Input**: Feature specification from `.specify/features/login/spec.md`

## Summary

Build a login page at `/login` using Next.js App Router, React state, and shadcn/ui components. The page is a Client Component with email/password form fields, an `isSubmitting` state guard, and placeholder submit logic. No real auth API is wired at this stage.

## Technical Context

**Language/Version**: TypeScript 5.x / TSX  
**Primary Dependencies**: Next.js 16 (App Router), React 19, shadcn/ui, Tailwind CSS 4, `@playwright/test`  
**Storage**: N/A — form state is ephemeral local React state only  
**Testing**: Playwright (e2e)  
**Target Platform**: Browser (Next.js SSR/CSR hybrid; this page is a Client Component)  
**Project Type**: Web application (frontend/ + src/ monorepo)  
**Performance Goals**: Page renders within 1 second on standard connection  
**Constraints**: No domain logic in the component — future auth logic goes into `frontend/lib/`  
**Scale/Scope**: Single page, single component

## Constitution Check

| Principle | Status | Notes |
|---|---|---|
| Type-safety first | ✅ | All state and handlers are explicitly typed in TypeScript |
| Separation of concerns | ✅ | UI state only in component; no domain logic; `lib/` reserved for auth logic |
| Server/Client clarity | ✅ | `"use client"` used correctly — state + event handlers require it |
| Minimalist, content-first UX | ✅ | Clean card layout, no animations, shadcn/ui defaults |
| Legal & ethical guardrails | N/A | Login page does not display case law content |

## Project Structure

### Documentation (this feature)

```text
.specify/features/login/
├── spec.md       ← User stories, requirements, success criteria
├── plan.md       ← This file — technical context and architecture
└── tasks.md      ← Actionable, dependency-ordered task list
```

### Source Code (this feature)

```text
frontend/
├── app/
│   └── (auth)/
│       └── login/
│           └── page.tsx        ← LoginPage Client Component (to create)
├── components/
│   └── ui/
│       ├── card.tsx            ← shadcn/ui (to install via CLI)
│       ├── button.tsx          ← shadcn/ui (to install via CLI)
│       ├── input.tsx           ← shadcn/ui (to install via CLI)
│       └── label.tsx           ← shadcn/ui (to install via CLI)
└── e2e/
    └── specs/
        └── login.spec.ts       ← Playwright e2e tests (to create)
```

**Structure Decision**: Web application layout. Frontend lives in `frontend/` at repo root alongside the NestJS backend in `src/`. The `(auth)` route group in App Router groups auth-related pages without affecting the URL — `/login` resolves correctly.

## Pre-requisites Before Implementation

### 1. Install shadcn/ui

shadcn/ui components are not bundled — they are code-generated into `frontend/components/ui/`. Run from `frontend/`:

```bash
npx shadcn@latest init
npx shadcn@latest add card button input label
```

### 2. Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

### 3. Playwright config

Create `frontend/playwright.config.ts` pointing `baseURL` to `http://localhost:3001` (Next.js dev port).

## Import Paths (for /speckit.implement)

```ts
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
```

## Files to Generate (for /speckit.implement)

| File | Action | Notes |
|---|---|---|
| `frontend/app/(auth)/login/page.tsx` | **Create** | `LoginPage` Client Component — full implementation |
| `frontend/e2e/specs/login.spec.ts` | **Create** | Playwright tests — after Playwright is installed |
| `frontend/playwright.config.ts` | **Create** | Playwright config with `baseURL` |
| `frontend/components/ui/*.tsx` | **Install via CLI** | Do NOT hand-write — use `npx shadcn@latest add` |
