# Phase 1 — Week 1 — Day 1 Notes
## Topic: Functions and Arrow Functions in TypeScript

---

## 1. Basic Function

Think of a function as a **machine**.
- You put something **in** (parameters)
- It does some work
- It gives something **out** (return value)

```typescript
function greet(name: string): string {
    return "Hello, " + name;
}
```

### Breaking it down — every single part:

| Part | What it means |
|------|--------------|
| `function` | keyword that says "I am creating a machine" |
| `greet` | name of the machine |
| `name` | what you put INTO the machine |
| `: string` after name | the input MUST be a string |
| `: string` after `()` | the output MUST be a string |
| `return` | what the machine gives back to you |

```typescript
// This works ✅
console.log(greet("Ravi"));      // Hello, Ravi

// This gives ERROR ❌
console.log(greet(123));         // Error: number is not a string
```

---

## 2. Function with Multiple Parameters

You can pass **as many inputs** as you want:

```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

### What happens step by step:
```
Step 1: You call add(10, 20)
Step 2: a = 10, b = 20
Step 3: return 10 + 20
Step 4: you get back 30
```

```typescript
console.log(add(10, 20));    // 30
console.log(add(5, 5));      // 10
console.log(add(100, 200));  // 300
```

### Real QA Example:
```typescript
function calculatePassRate(passed: number, total: number): number {
    return (passed / total) * 100;
}

console.log(calculatePassRate(90, 100));  // 90
console.log(calculatePassRate(45, 50));   // 90
```

---

## 3. void — When Function Returns Nothing

`void` means **"this function does NOT give anything back"**

Think of it like this:
- A **printer** — you give it a document, it prints, it gives you nothing back
- A **logger** — you give it a message, it logs, it gives you nothing back

```typescript
function printMessage(message: string): void {
    console.log(message);
    // no return here — void means nothing comes back
}
```

### What is the difference?

```typescript
// This function RETURNS something — you can store it
function getStatus(): string {
    return "Passed";
}
let result = getStatus();  // result = "Passed"
console.log(result);       // Passed


// This function returns NOTHING — nothing to store
function logStatus(): void {
    console.log("Passed");
}
let result2 = logStatus();  // result2 = undefined — nothing came back
```

---

## 4. Optional Parameters

Sometimes you want to call a function **with or without** some information.

The `?` symbol means **"this input is optional — you can skip it"**

```typescript
function greetUser(name: string, role?: string): string {
    if (role) {
        return `Hello ${name}, your role is ${role}`;
    }
    return `Hello ${name}`;
}
```

### What happens internally:

```
Call 1: greetUser("Ravi")
→ name = "Ravi"
→ role = undefined  (not provided)
→ if(role) is FALSE
→ returns "Hello Ravi"

Call 2: greetUser("Ravi", "QA Engineer")
→ name = "Ravi"
→ role = "QA Engineer"
→ if(role) is TRUE
→ returns "Hello Ravi, your role is QA Engineer"
```

### Important Rule:
> Optional parameters must always come **AFTER** required parameters

```typescript
// ✅ Correct — required first, optional last
function test(name: string, description?: string): void {}

// ❌ Wrong — optional cannot come before required
function test(description?: string, name: string): void {}
```

---

## 5. Default Parameters

Default means **"if you don't give me a value, I will use THIS value automatically"**

```typescript
function loginUser(username: string, role: string = "Tester"): string {
    return `${username} logged in as ${role}`;
}
```

### What happens internally:

```
Call 1: loginUser("Ravi")
→ username = "Ravi"
→ role = "Tester"  ← default value is used automatically
→ returns "Ravi logged in as Tester"

Call 2: loginUser("Ravi", "Admin")
→ username = "Ravi"
→ role = "Admin"  ← your value overrides the default
→ returns "Ravi logged in as Admin"
```

### Real QA Example:
```typescript
function createTestUser(
    username: string,
    password: string = "Test@123",
    role: string = "standard_user"
): string {
    return `Created user: ${username} | Password: ${password} | Role: ${role}`;
}

// Use all defaults
console.log(createTestUser("Ravi"));
// Created user: Ravi | Password: Test@123 | Role: standard_user

// Override password only
console.log(createTestUser("Ravi", "NewPass@456"));
// Created user: Ravi | Password: NewPass@456 | Role: standard_user

// Override everything
console.log(createTestUser("Ravi", "NewPass@456", "admin"));
// Created user: Ravi | Password: NewPass@456 | Role: admin
```

---

## 6. Arrow Functions

Arrow functions are just a **shorter, cleaner way** to write functions. Nothing else changes.

### Evolution of writing the same function:

```typescript
// Step 1 — Regular function (long way)
function multiply(a: number, b: number): number {
    return a * b;
}

// Step 2 — Arrow function (same thing, shorter)
const multiply = (a: number, b: number): number => {
    return a * b;
}

// Step 3 — Arrow function one liner (even shorter)
const multiply = (a: number, b: number): number => a * b;
```

### Why arrow functions?
- Cleaner and shorter to write
- Used **everywhere** in modern TypeScript
- **Every single Playwright test uses arrow functions**

---

## 7. async / await

This is **very important for Playwright** — every test you write will use this.

### The problem without async/await:

Imagine you order food at a restaurant:
- You order 🍕
- You wait for it to arrive
- You eat it

In code, some actions **take time** — like loading a webpage, clicking a button, waiting for an API response. Without async/await, your code does not wait — it moves to the next line immediately!

```typescript
// ❌ Without async/await — does NOT wait
function badTest() {
    page.goto("https://saucedemo.com");  // starts loading
    page.click("#login-button");          // clicks BEFORE page loads! CRASH!
}
```

```typescript
// ✅ With async/await — waits properly
async function goodTest() {
    await page.goto("https://saucedemo.com");  // WAITS for page to load
    await page.click("#login-button");          // THEN clicks
}
```

### Simple example without Playwright:

```typescript
// This function pretends to fetch test data (takes 2 seconds)
function fetchTestData(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Test data loaded!"), 2000);
    });
}

// Without async/await ❌
function runTest() {
    const data = fetchTestData();
    console.log(data);  // prints [object Promise] — NOT the data!
}

// With async/await ✅
async function runTest() {
    const data = await fetchTestData();
    console.log(data);  // prints "Test data loaded!" — correct!
}

runTest();
```

### The rules:
- If a function uses `await` inside it — it MUST have `async` before it
- `await` means **"stop here and wait until this is done, then continue"**
- Every Playwright action needs `await` because browser actions take time

### How every Playwright test looks:
```typescript
test('login test', async ({ page }) => {              // async arrow function
    await page.goto('https://saucedemo.com');          // wait for page to load
    await page.fill('#user-name', 'standard_user');   // wait for fill
    await page.fill('#password', 'secret_sauce');      // wait for fill
    await page.click('#login-button');                 // wait for click
});
```

---

## Practice Exercise 🎯

Try all of these in **TypeScript Playground** → [typescriptlang.org/play](https://typescriptlang.org/play)

```typescript
// 1. Basic function with return type
function getTestStatus(isPassed: boolean): string {
    if (isPassed) {
        return "Test Passed ✅";
    }
    return "Test Failed ❌";
}

// 2. void function
function logTestResult(testName: string, isPassed: boolean): void {
    console.log(`${testName} → ${getTestStatus(isPassed)}`);
}

// 3. Optional parameter
function describeTest(testName: string, description?: string): void {
    if (description) {
        console.log(`${testName}: ${description}`);
    } else {
        console.log(`${testName}: No description`);
    }
}

// 4. Default parameter
function createUser(
    username: string,
    role: string = "standard_user"
): string {
    return `User: ${username} | Role: ${role}`;
}

// 5. Arrow function
const calculatePassRate = (passed: number, total: number): number => {
    return (passed / total) * 100;
}

// Run everything
logTestResult("Login Test", true);
logTestResult("Cart Test", false);
describeTest("Checkout Test");
describeTest("Payment Test", "Validates credit card flow");
console.log(createUser("Ravi"));
console.log(createUser("Admin", "admin"));
console.log(calculatePassRate(92, 100) + "%");
```

### Expected Output:
```
Login Test → Test Passed ✅
Cart Test → Test Failed ❌
Checkout Test: No description
Payment Test: Validates credit card flow
User: Ravi | Role: standard_user
User: Admin | Role: admin
92%
```

---

## Key Takeaways

- Every function needs **parameter types** and **return type**
- `void` = function returns nothing
- `?` = optional parameter — can be skipped when calling
- `= value` = default parameter — used automatically when nothing is passed
- Arrow function `=>` is just a **shorter way** to write functions
- `async/await` makes your code **wait** for slow operations
- `async/await` is **critical for Playwright** — every test uses it

---

## Quick Reference Card

| Concept | Syntax | Example |
|---------|--------|---------|
| Basic function | `function name(param: type): returnType {}` | `function greet(name: string): string {}` |
| void function | `function name(): void {}` | `function log(): void {}` |
| Optional param | `param?: type` | `role?: string` |
| Default param | `param: type = value` | `role: string = "Tester"` |
| Arrow function | `const name = (param: type): returnType => {}` | `const add = (a: number): number => a + 1` |
| Async function | `async function name() {}` | `async function runTest() {}` |
| Await | `await someFunction()` | `await page.goto(url)` |

---

## Resources

- TypeScript Playground: [typescriptlang.org/play](https://typescriptlang.org/play)
- TypeScript Handbook — Functions: [typescriptlang.org/docs/handbook/2/functions.html](https://typescriptlang.org/docs/handbook/2/functions.html)

---

