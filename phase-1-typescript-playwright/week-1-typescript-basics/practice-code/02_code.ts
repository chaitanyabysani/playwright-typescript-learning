// Basic function

function greetName(name: string): string {
    return `Hello, ${name}!`;
}


function getTestStatus(isPassed: boolean): string {
    if(isPassed){
        return "Test passed";
    } else {
        return "Test failed";   
    }
}

// Function with multiple parameters

function addition(a:number, b: number): number {
    return a + b;
}


// void function

function printMessage(message: string): void {
    console.log(message);
}

function logTestStatus(isPassed: boolean): void {
    if(isPassed){
        console.log("Test passed");
    } else {
        console.log("Test failed");   
    }
}

// optional parameters

function greetUser(name: string, role?: string): string {
    if(role){
        return `Hello, ${name}! your role is ${role}.`;
    }
    return `Hello, ${name}!`;
}

// default parameters

function greetUserWithDefault(name: string, role: string = "User"): string {
    return `Hello, ${name}! your role is ${role}.`;
}

//Arrow function

function multiply(a: number, b:number): number{
    return a*b;
}

const multiplyArrow = (a: number, b: number): number => {
    return a * b;
}

const multiplyArrowShort = (a: number, b: number): number => a*b;


// Example usage
console.log(greetName("Alice"));
console.log(getTestStatus(true));
console.log(addition(5, 10));
printMessage("This is a message.");
logTestStatus(false);
console.log(greetUser("Bob"));
console.log(greetUser("Charlie", "Admin"));
console.log(greetUserWithDefault("Dave"));
console.log(greetUserWithDefault("Eve", "Moderator"));
console.log(multiply(4, 5));
console.log(multiplyArrow(6, 7));
console.log(multiplyArrowShort(8, 9));
