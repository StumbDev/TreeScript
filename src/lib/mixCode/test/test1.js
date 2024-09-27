import {
    MixRunner
} from './src/index.js';

const code = `
(?func main => {
    (write(runVar("Hello from TreeScript!")))
})

console.log("Hello from JavaScript!");

coffee.log("Hello from CoffeeScript!");
`;

MixRunner.runMix(code);