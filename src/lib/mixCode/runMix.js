// src/runMix.js
import {
    transformSync
} from '@babel/core';
import coffee from 'coffee-script';
import shell from 'shelljs';

function runTreeScript(code) {
    // Placeholder for TreeScript execution logic
    console.log(`Running TreeScript code:\n${code}`);
}

function runJavaScript(code) {
    const result = transformSync(code, {
        presets: ['@babel/preset-env']
    });
    eval(result.code);
}

function runCoffeeScript(code) {
    const jsCode = coffee.compile(code, {
        bare: true
    });
    eval(jsCode);
}

export function runMix(code) {
    const lines = code.split('\n');

    for (const line of lines) {
        if (line.trim().startsWith('//')) {
            // Skip comments
            continue;
        }

        // Here you can implement a more sophisticated detection of code type
        if (line.trim().startsWith('(?func')) {
            runTreeScript(line); // Assuming this is TreeScript
        } else if (line.trim().includes('console.log')) {
            runJavaScript(line); // Assuming this is JavaScript
        } else if (line.trim().includes('coffee')) {
            runCoffeeScript(line); // Assuming this is CoffeeScript
        } else {
            console.log(`Unknown code type: ${line}`);
        }
    }
}