# Phase 1 — Week 1 — Day 1 Notes
## Topic: Interfaces in TypeScript

---

## Definition

> **An Interface is a blueprint that defines the structure of an object — it specifies what properties and their types an object must have, without providing any implementation.**

### Breaking the Definition Word by Word

| Word | Meaning |
|------|---------|
| **Blueprint** | A plan or template — like a building plan |
| **Defines the structure** | Says what fields must exist |
| **Of an object** | We are talking about objects in TypeScript |
| **Properties and their types** | Field name + what type it should be |
| **Without implementation** | Interface only defines the rules — it does NOT write the actual logic |

### Simple One Line Definition
> **Interface = A contract that an object must follow**

### Even Simpler
```
Interface answers ONE question:

"What fields MUST this object have?"
```

---

## Real Life Example

Think of raising a bug in JIRA.

JIRA forces you to fill:
- Bug ID
- Title
- Severity
- Status

**You CANNOT save the bug without these fields — JIRA will not allow it.**

Interface does the SAME thing in TypeScript:
> **"You CANNOT create this object without these fields"**

---

## Why Do We Need Interface?

### Without Interface — CHAOS ❌
```typescript
// No rules — anyone writes anything differently
const bug1 = { id: "B001", title: "Login broken" };
const bug2 = { bugId: "B002", name: "Cart broken" };
// id vs bugId? title vs name? — Inconsistent and confusing!
```

### With Interface — CONSISTENCY ✅
```typescript
// Set the rules ONCE
interface Bug {
    bugId: string;
    title: string;
    severity: string;
}

// NOW everyone must follow the same rules
const bug1: Bug = { bugId: "B001", title: "Login broken", severity: "Critical" };
const bug2: Bug = { bugId: "B002", title: "Cart broken", severity: "High" };
```

---

## 1. Basic Interface

```typescript
// Define the blueprint
interface User {
    name: string;
    age: number;
    isActive: boolean;
}

// Create an object that follows the blueprint
const user1: User = {
    name: "Ravi",
    age: 35,
    isActive: true
};

console.log(user1.name);      // Ravi
console.log(user1.age);       // 35
console.log(user1.isActive);  // true
```

### What happens if you break the contract?

```typescript
// ❌ Missing property — ERROR
const user2: User = {
    name: "Ravi",
    age: 35
    // isActive is missing — TypeScript will throw error!
};

// ❌ Wrong type — ERROR
const user3: User = {
    name: "Ravi",
    age: "thirty five",  // should be number — ERROR!
    isActive: true
};
```

> TypeScript catches these errors **immediately** while you type — before running!

---

## 2. Optional Properties

Just like a test case template — some fields are mandatory, some are optional.

The `?` symbol means **"this field is optional — you can skip it"**

```typescript
interface TestCase {
    testId: string;       // mandatory
    testName: string;     // mandatory
    comments?: string;    // optional — the ? means optional
}

// ✅ Without optional field — works fine
const test1: TestCase = {
    testId: "TC001",
    testName: "Login Test"
};

// ✅ With optional field — also works fine
const test2: TestCase = {
    testId: "TC002",
    testName: "Cart Test",
    comments: "Verify after login"
};
```

---

## 3. Extending Interfaces

One interface can **inherit** from another interface and add more fields.

Think of it like:
- A **basic test case template** has common fields
- An **automation test template** extends it and adds extra fields

```typescript
// Basic template
interface TestCase {
    testId: string;
    testName: string;
}

// Automation template = Basic template + extra fields
interface AutomationTest extends TestCase {
    browser: string;
    scriptName: string;
}

// Must have ALL fields from BOTH interfaces
const autoTest: AutomationTest = {
    testId: "TC001",             // from TestCase
    testName: "Login Test",      // from TestCase
    browser: "Chrome",           // from AutomationTest
    scriptName: "login.spec.ts"  // from AutomationTest
};

console.log(autoTest.testId);      // TC001
console.log(autoTest.browser);     // Chrome
```

---

## 4. Interface with Functions

Interfaces can also define **what functions an object must have**

```typescript
interface TestRunner {
    suiteName: string;
    totalTests: number;
    run(): void;                          // function that returns nothing
    getPassRate(passed: number): number;  // function that returns number
}

const myTestSuite: TestRunner = {
    suiteName: "Login Suite",
    totalTests: 10,
    run(): void {
        console.log(`Running ${this.suiteName}...`);
    },
    getPassRate(passed: number): number {
        return (passed / this.totalTests) * 100;
    }
};

myTestSuite.run();                         // Running Login Suite...
console.log(myTestSuite.getPassRate(8));   // 80
```

---

## 5. Interface vs Type

You will see both `interface` and `type` in TypeScript projects.

```typescript
// Using interface
interface UserInterface {
    name: string;
    age: number;
}

// Using type
type UserType = {
    name: string;
    age: number;
}
```

### When to use which?

| Situation | Use |
|-----------|-----|
| Defining object shapes | `interface` |
| Extending / inheriting | `interface` |
| Simple type aliases | `type` |
| Union types | `type` |

```typescript
// type is better for unions — interface cannot do this
type Status = "passed" | "failed" | "skipped";

let testStatus: Status = "passed";   // ✅
testStatus = "failed";               // ✅
testStatus = "running";              // ❌ ERROR — not in the union
```

> **Simple rule:** Use `interface` for objects, use `type` for unions and simple aliases.

---

## 6. Real Playwright Example

This is how real Playwright projects use interfaces for test data:

```typescript
// Define what test data looks like
interface LoginTestData {
    username: string;
    password: string;
    expectedUrl: string;
    shouldPass: boolean;
}

// Test data array using the interface
const loginTests: LoginTestData[] = [
    {
        username: "standard_user",
        password: "secret_sauce",
        expectedUrl: "/inventory.html",
        shouldPass: true
    },
    {
        username: "locked_out_user",
        password: "secret_sauce",
        expectedUrl: "/",
        shouldPass: false
    }
];

// Use the data
loginTests.forEach((testData: LoginTestData) => {
    console.log(`Testing: ${testData.username} | Should Pass: ${testData.shouldPass}`);
});
```

**Output:**
```
Testing: standard_user | Should Pass: true
Testing: locked_out_user | Should Pass: false
```

---

## Practice Exercise ✅ Completed

```typescript
// Template for a Test Case
interface TestCase {
    testId: string;
    testName: string;
    status: string;
    remarks?: string;
}

// 3 test cases using the template
const tc1: TestCase = {
    testId: "TC001",
    testName: "Login with valid credentials",
    status: "Pass"
};

const tc2: TestCase = {
    testId: "TC002",
    testName: "Login with invalid password",
    status: "Fail",
    remarks: "Error message not displayed"
};

const tc3: TestCase = {
    testId: "TC003",
    testName: "Logout test",
    status: "Pass",
    remarks: "Works as expected"
};

console.log(`${tc1.testId} | ${tc1.testName} | ${tc1.status}`);
console.log(`${tc2.testId} | ${tc2.testName} | ${tc2.status} | ${tc2.remarks}`);
console.log(`${tc3.testId} | ${tc3.testName} | ${tc3.status} | ${tc3.remarks}`);
```

**Output:**
```
TC001 | Login with valid credentials | Pass
TC002 | Login with invalid password | Fail | Error message not displayed
TC003 | Logout test | Pass | Works as expected
```

---

## Key Takeaways

- Interface is a **blueprint / contract** for objects
- All required properties **must** be present — TypeScript enforces this
- Use `?` for optional properties
- Use `extends` to **inherit** from another interface and add more fields
- Interfaces can include **function definitions**
- Use `interface` for objects, `type` for unions
- In Playwright — interfaces define **test data structures**

---

## Quick Reference Card

| Concept | Syntax | Example |
|---------|--------|---------|
| Define interface | `interface Name { prop: type }` | `interface Bug { bugId: string }` |
| Optional property | `prop?: type` | `remarks?: string` |
| Extend interface | `interface B extends A {}` | `interface AutoTest extends TestCase {}` |
| Union type | `type X = "a" \| "b"` | `type Status = "pass" \| "fail"` |
| Array of interface | `Name[]` | `TestCase[]` |

---

## Resources

- TypeScript Playground: [typescriptlang.org/play](https://typescriptlang.org/play)
- TypeScript Handbook — Interfaces: [typescriptlang.org/docs/handbook/2/objects.html](https://typescriptlang.org/docs/handbook/2/objects.html)

---