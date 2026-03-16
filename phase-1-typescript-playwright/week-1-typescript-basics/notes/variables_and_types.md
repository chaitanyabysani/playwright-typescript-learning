# Phase 1 — Week 1 — Day 1 Notes
## Topic: Variables and Types in TypeScript

---

## What is TypeScript?

TypeScript is JavaScript **with types added**. Types help catch bugs at coding time, not at runtime.

```javascript
// JavaScript — no type, anything goes
let name = "John";
name = 123; // No error! This causes bugs
```

```typescript
// TypeScript — type is defined
let name: string = "John";
name = 123; // ERROR! TypeScript catches this immediately
```

> Product companies love TypeScript because **bugs are caught at coding time, not at runtime.**

---

## 3 Ways to Declare Variables

```typescript
let age: number = 25;               // can be reassigned
const appName: string = "MyApp";    // cannot be reassigned
var oldWay: boolean = true;         // avoid this — use let/const
```

**Rule of thumb:**
- Always use `const` first
- Use `let` only if the value will change
- Never use `var`

---

## Basic Types in TypeScript

```typescript
let username: string = "Ravi";
let age: number = 35;
let isLoggedIn: boolean = true;
let score: number = 99.5;       // decimals also use number
```

| Type      | Example Value     | Use For                  |
|-----------|-------------------|--------------------------|
| `string`  | `"hello"`         | Text values              |
| `number`  | `25`, `99.5`      | Integers and decimals    |
| `boolean` | `true` / `false`  | Flags and conditions     |

---

## Special Types

```typescript
let anything: any = "hello";    // avoid this — defeats TypeScript's purpose
anything = 123;                  // allowed but dangerous

let notDefined: undefined = undefined;
let empty: null = null;
```

> **Avoid `any`** — it removes all type safety and defeats the purpose of TypeScript.

---

## Arrays

```typescript
let browsers: string[] = ["Chrome", "Firefox", "Safari"];
let scores: number[] = [90, 85, 78];
```

---

## Practice Exercise

Try this in **TypeScript Playground** → [typescriptlang.org/play](https://typescriptlang.org/play)

```typescript
const firstName: string = "Your Name";
const experienceYears: number = 11;
const isManualTester: boolean = true;
const tools: string[] = ["JIRA", "TestRail", "Zephyr"];

console.log(firstName);
console.log(experienceYears);
console.log(isManualTester);
console.log(tools);
```

---

## Key Takeaways

- TypeScript adds **type safety** on top of JavaScript
- Use `const` by default, `let` only when value changes, never `var`
- Core types: `string`, `number`, `boolean`
- Arrays use `type[]` syntax — e.g. `string[]`, `number[]`
- Avoid `any` — it defeats the purpose of TypeScript

---

## Resources

- TypeScript Playground: [typescriptlang.org/play](https://typescriptlang.org/play)
- TypeScript Handbook: [typescriptlang.org/docs/handbook](https://typescriptlang.org/docs/handbook)

---