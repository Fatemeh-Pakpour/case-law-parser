# case-law-parser – Project Constitution

## 0. Meta

- **Repo name:** `case-law-parser`
- **This file:** `memory/constitution.md`
- **Purpose of this document:**  
  Define the **architecture, folder structure, conventions, and guardrails** for the project so that tools, contributors, and future-you know how to evolve the app without chaos.

---

## 1. Project Identity

- **Type:** Web application
- **Primary Stack:**  
  - Framework: Next.js  
  - UI: React  
  - Language: TypeScript  
  - Styling: Tailwind CSS  
  - Component library: shadcn/ui  

- **Primary Domain:**  
  Parsing, structuring, and exploring **legal case law** (case texts, metadata, citations, etc).

- **Core Goal:**  
  Help users **search, browse, and read** case law clearly, efficiently, and safely, *without* claiming to provide legal advice.

---

## 2. High-Level Architecture

### 2.1 Core Design Principles

1. **Type-safety first**
   - Use strict TypeScript.
   - Public interfaces (APIs, components, models) must be explicitly typed.

2. **Separation of concerns**
   - UI vs domain logic vs infrastructure are clearly separated.
   - Domain logic must not be embedded directly in React components.

3. **Server/Client clarity (Next.js)**
   - Prefer **Server Components** for data loading, parsing, and heavy logic.
   - Use **Client Components** only for interactions (filters, UI state, modals, etc).

4. **Minimalist, content-first UX**
   - The app emphasizes **readability of case text** and **clarity of metadata**.
   - No flashy animations that distract from the content.

5. **Legal & ethical guardrails**
   - Must not present itself as legal advice.
   - Must show a clear disclaimer in UI (e.g., footer, About, onboarding).





