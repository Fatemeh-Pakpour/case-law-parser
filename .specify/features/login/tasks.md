---
description: "Task list for Login Page feature implementation"
---

# Tasks: Login Page

**Input**: Design documents from `.specify/features/login/`  
**Prerequisites**: `plan.md` ✅ | `spec.md` ✅

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (no dependencies between these tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies required before any implementation can begin.

- [x] T001 Install shadcn/ui: run `npx shadcn@latest init` then `npx shadcn@latest add card button input label` from `frontend/`
- [x] T002 [P] Install Playwright: run `npm install -D @playwright/test` and `npx playwright install` from `frontend/`
- [x] T003 [P] Create `frontend/playwright.config.ts` with `baseURL: 'http://localhost:3001'` and `testDir: './e2e'`

**Checkpoint**: shadcn/ui components exist in `frontend/components/ui/` and `@playwright/test` is in `devDependencies`

---

## Phase 2: User Story 1 — Sign In with Email and Password (Priority: P1) 🎯 MVP

**Goal**: Render a working login form at `/login` with email/password fields, submit handler, and disabled-while-submitting button.

**Independent Test**: Visit `/login`, fill in email + password, click "Log in" — button disables during submission and re-enables after.

### Implementation for User Story 1

- [x] T004 [US1] Create `frontend/app/(auth)/login/page.tsx` — `LoginPage` Client Component with:
  - `"use client"` directive
  - `email`, `password`, `isSubmitting` state (all explicitly typed)
  - `handleSubmit: React.FormEvent<HTMLFormElement>` — calls `preventDefault`, sets `isSubmitting`, `console.log`, `finally` resets `isSubmitting`
  - shadcn/ui `Card` layout with `CardHeader`, `CardContent`, `CardFooter`
  - Email `Input` (`id="email"`, `type="email"`, `autoComplete="email"`, `required`)
  - Password `Input` (`id="password"`, `type="password"`, `autoComplete="current-password"`, `required`)
  - `Label` components linked via `htmlFor` to each input
  - `Button` with `type="submit"`, `className="w-full"`, `disabled={isSubmitting}`

**Checkpoint**: User Story 1 is fully functional — `/login` renders and the form submits with correct state transitions

---

## Phase 3: User Story 2 — HTML5 Form Validation (Priority: P2)

**Goal**: Browser-native validation blocks submission when email is empty, malformed, or password is empty.

**Independent Test**: Click "Log in" with empty email — browser shows required-field error, no network request fires.

### Implementation for User Story 2

- [x] T005 [US2] Verify `required` and `type="email"` attributes are present on inputs in T004 (no extra code needed — covered by FR-010 and FR-011 in spec)

**Checkpoint**: HTML5 validation works in browser without any additional code

---

## Phase 4: User Story 3 — Secondary Actions (Priority: P3)

**Goal**: "Forgot password?" and "Create an account" link-style buttons visible in the card footer.

**Independent Test**: Both buttons are visible and keyboard-focusable on `/login`.

### Implementation for User Story 3

- [x] T006 [US3] Add "Forgot password?" and "Create an account" `<button type="button">` elements inside `CardFooter` with Tailwind classes `underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground`

**Checkpoint**: Both footer buttons are visible, styled, and keyboard-navigable

---

## Phase 5: Testing (depends on T002, T003, T004, T006)

**Goal**: Playwright e2e tests covering all three user stories.

- [x] T007 [US1] Create `frontend/e2e/specs/login.spec.ts` — tests for:
  - Page renders with all required elements
  - Email and password inputs have correct attributes
  - Submit button is disabled while submitting
  - Submit button re-enables after submission
- [x] T008 [US2] Add validation tests to `login.spec.ts`:
  - Empty email blocks submission
  - Invalid email format blocks submission
  - Empty password blocks submission
- [x] T009 [US3] Add footer button tests to `login.spec.ts`:
  - "Forgot password?" is visible
  - "Create an account" is visible
  - Both are keyboard-focusable

---

## Phase 6: Validation

- [x] T010 Run `tsc --noEmit` in `frontend/` — confirm zero TypeScript errors
- [ ] T011 Run `npm run frontend:dev` *(manual — start dev server and visit http://localhost:3001/login)* and manually visit `http://localhost:3001/login` — verify card renders correctly
- [ ] T012 Run `npx playwright test e2e/specs/login.spec.ts` — confirm all tests pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (US1)**: Depends on T001 (shadcn/ui installed) — **blocks all implementation**
- **Phase 3 (US2)**: Covered by T004 — no extra implementation needed
- **Phase 4 (US3)**: Depends on T004 (page exists)
- **Phase 5 (Testing)**: Depends on T002, T003 (Playwright), T004, T006 (implementation complete)
- **Phase 6 (Validation)**: Depends on all previous phases

### Parallel Opportunities

- T002 and T003 (Playwright setup) can run in parallel with T001 (shadcn/ui setup)
- T007, T008, T009 (test writing) can run in parallel once implementation is done
