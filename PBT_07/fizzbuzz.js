// Version 1 
console.log("--- Version 1: Classic FizzBuzz ---");
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(`${i}\tFizzBuzz`);
    } else if (i % 3 === 0) {
        console.log(`${i}\tFizz`);
    } else if (i % 5 === 0) {
        console.log(`${i}\tBuzz`);
    } else {
        console.log(i);
    }
}

// Version 2
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let result = "";
        
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                result += rules[j].word;
            }
        }
    
        if (result === "") {
            console.log(i);
        } else {
            console.log(`${i}\t${result}`);
        }
    }
}

console.log("\n--- Version 2: Custom FizzBuzz với n = 30 ---");
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);
