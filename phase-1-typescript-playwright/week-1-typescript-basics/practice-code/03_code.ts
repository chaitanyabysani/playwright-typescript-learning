interface TestCase{
    testId: string;
    testName: string;
    comments?: string; // optional property
}

interface AutomationTestCase extends TestCase {
    browser: string;
    scriptName: string;
}

const myTest: TestCase = {
    testId: "TC001",
    testName: "Login Test",
    comments: "This is a simple login test"
};

const test1: TestCase = {
    testId: "TC002",
    testName: "Signup Test"
};

const test2: AutomationTestCase = {
    testId: "TC003",
    testName: "Checkout Test",
    comments: "This test covers the checkout process",
    browser: "Chrome",
    scriptName: "checkoutTest.js"
}

console.log (`${myTest.testId} - ${myTest.testName} - ${myTest.comments}`);
console.log (`${test1.testId} - ${test1.testName} - ${test1.comments}`);
console.log (`${test2.testId} - ${test2.testName} - ${test2.comments} - ${test2.browser} - ${test2.scriptName}`);