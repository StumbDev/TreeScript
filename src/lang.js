// lang.js

let advancedMode = false;
const functions = {};
const modules = {};
const variables = {};

// Reserved keywords for TreeScript
const keywords = ["?func", "?if", "?else", "?loop", "?switch", "?try", "?catch", "?return", "?class", "?method", "?set", "?get", "?run", "?module", "?import", "?define"];

// Function to execute TreeScript code
export function executeTreeScript(code) {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (lines[0].startsWith('(?func "uses {"advanceCode"})"')) {
        advancedMode = true;
        console.log("Advanced mode enabled.");
    }

    for (const line of lines) {
        if (advancedMode) {
            processAdvancedSyntax(line);
        } else {
            processBasicSyntax(line);
        }
    }
}

function processAdvancedSyntax(line) {
    if (line.startsWith('(?func')) {
        const funcName = line.match(/\(?func ([^\s]+)/)[1];
        functions[funcName] = line;
        console.log(`Advanced function: ${funcName}`);
    } else if (line.startsWith('(?switch')) {
        handleSwitchCase(line);
    } else if (line.startsWith('(?try')) {
        handleTryCatch(line);
    } else if (line.startsWith('(?module')) {
        const moduleName = line.match(/\(?module ([^\s]+)/)[1];
        modules[moduleName] = {};
        console.log(`Module: ${moduleName}`);
    } else if (line.startsWith('(?import')) {
        const moduleName = line.match(/\(?import ([^\s]+)/)[1];
        if (modules[moduleName]) {
            console.log(`Imported module: ${moduleName}`);
        } else {
            console.log(`Error: Module ${moduleName} not found.`);
        }
    } else if (line.startsWith('(?return')) {
        const returnValue = line.match(/\(?return ([^\)]+)/)[1];
        console.log(`Return value: ${returnValue}`);
    } else if (line.startsWith('(?class')) {
        handleClassDefinition(line);
    } else if (line.startsWith('(?method')) {
        handleMethodDefinition(line);
    } else if (line.startsWith('(?set')) {
        const [varName, varValue] = line.match(/\(?set ([^\s]+) = (.+)/).slice(1);
        variables[varName] = varValue;
        console.log(`Variable set: ${varName} = ${varValue}`);
    } else if (line.startsWith('(?get')) {
        const varName = line.match(/\(?get ([^\s]+)/)[1];
        console.log(`Variable get: ${varName} = ${variables[varName]}`);
    } else if (line.startsWith('(?run')) {
        const funcName = line.match(/\(?run ([^\s]+)/)[1];
        if (functions[funcName]) {
            console.log(`Running function: ${funcName}`);
            executeTreeScript(functions[funcName]);
        } else {
            console.log(`Error: Function ${funcName} not found.`);
        }
    } else if (line.startsWith('(?define')) {
        const [macroName, macroContent] = line.match(/\(?define ([^\s]+) => (.+)/).slice(1);
        functions[macroName] = macroContent;
        console.log(`Macro defined: ${macroName}`);
    } else if (line.startsWith('(?foreach')) {
        handleForEachLoop(line);
    } else if (line.includes('outFunc')) {
        console.log(`Executing outFunc logic for line: ${line}`);
    } else if (line.startsWith('(?map')) {
        handleMapFunction(line);
    } else if (line.startsWith('(?filter')) {
        handleFilterFunction(line);
    } else if (line.startsWith('(?reduce')) {
        handleReduceFunction(line);
    } else {
        console.log(`Processing advanced line: ${line}`);
    }
}

function processBasicSyntax(line) {
    if (line.startsWith('(!RUNNERVER:')) {
        console.log(`Running server with configuration: ${line}`);
    } else if (line.startsWith('(?func')) {
        const funcName = line.match(/\(?func ([^\s]+)/)[1];
        functions[funcName] = line;
        console.log(`Function: ${funcName}`);
    } else if (line.startsWith('(?if')) {
        const condition = line.match(/\(?if ([^)]*)\)/)[1];
        console.log(`Checking condition: ${condition}`);
    } else if (line.startsWith('(?loop')) {
        const loopCommand = line.match(/\(?loop ([^:]+):\?func\)/)[1];
        console.log(`Looping command: ${loopCommand}`);
    } else if (line.startsWith('(write')) {
        const message = line.match(/\(write\(([^)]+)\)\)/)[1];
        console.log(`Output: ${message}`);
    } else {
        console.log(`Processing line: ${line}`);
    }
}

function handleSwitchCase(line) {
    const switchVar = line.match(/\(?switch ([^\s]+)\)/)[1];
    console.log(`Switch on variable: ${switchVar}`);
    // Implement switch-case logic
}

function handleTryCatch(line) {
    console.log("Handling try-catch block.");
    // Implement try-catch error handling logic
}

function handleClassDefinition(line) {
    const className = line.match(/\(?class ([^\s]+)/)[1];
    console.log(`Class defined: ${className}`);
    // Handle class definition logic
}

function handleMethodDefinition(line) {
    const methodName = line.match(/\(?method ([^\s]+)/)[1];
    console.log(`Method defined: ${methodName}`);
    // Handle method definition logic
}

function handleForEachLoop(line) {
    const [arrayVar, funcName] = line.match(/\(?foreach ([^\s]+) => ([^\s]+)/).slice(1);
    console.log(`Iterating over array: ${arrayVar}, applying function: ${funcName}`);
    // Implement forEach logic
}

function handleMapFunction(line) {
    const [arrayVar, funcName] = line.match(/\(?map ([^\s]+) => ([^\s]+)/).slice(1);
    console.log(`Mapping array: ${arrayVar}, with function: ${funcName}`);
    // Implement map logic
}

function handleFilterFunction(line) {
    const [arrayVar, condition] = line.match(/\(?filter ([^\s]+) => ([^\s]+)/).slice(1);
    console.log(`Filtering array: ${arrayVar}, with condition: ${condition}`);
    // Implement filter logic
}

function handleReduceFunction(line) {
    const [arrayVar, funcName] = line.match(/\(?reduce ([^\s]+) => ([^\s]+)/).slice(1);
    console.log(`Reducing array: ${arrayVar}, with function: ${funcName}`);
    // Implement reduce logic
}