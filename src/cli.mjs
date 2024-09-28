#!/usr/bin/env node

import {
    Command
} from 'commander';
import shell from "shelljs";
import chalk from 'chalk';
import readline from 'readline'
import prompt from "prompt";
import executeTreeScript from "./lang";
const program = new Command();

// Function to run TreeScript code
function runTreeScript(code) {
    // Here you would implement your logic to compile and run the TreeScript code
    // For demonstration, we'll just log the code
    console.log(chalk.green(`Running TreeScript code:\n${code}`));
}

// Command to run a TreeScript file
program
    .command('run <file>')
    .description('Run a TreeScript file')
    .action((file) => {
        if (!shell.test('-e', file)) {
            console.log(chalk.red(`Error: File ${file} does not exist.`));
            return;
        }

        const code = shell.cat(file).stdout;
        executeTreeScript(code);
        runTreeScript(code);
    });

// Command to start the REPL
program
    .command('repl')
    .description('Start a REPL for TreeScript')
    .action(() => {
        console.log(chalk.blue('Entering REPL mode. Type ".exit" to exit.'));
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.setPrompt(chalk.bold('>>> '));
        rl.prompt();

        rl.on('line', (line) => {
            if (line.trim() === '.exit') {
                rl.close();
                return;
            }

            runTreeScript(line.trim());
            rl.prompt();
        }).on('close', () => {
            console.log(chalk.green('Exiting REPL mode.'));
            process.exit(0);
        });
    });

// Command to start a built-in editor
program
    .command('edit')
    .description('Open a built-in editor for TreeScript code')
    .action(() => {
        console.log(chalk.blue('Opening built-in editor. Type "save" to save and exit.'));

        prompt.start();

        prompt.get(['code'], (err, result) => {
            if (err) {
                console.error(chalk.red('Error in getting input.'));
                return;
            }
            console.log(chalk.green(`You entered:\n${result.code}`));
            runTreeScript(result.code);
        });
    });

// Command to display help
program
    .command('help')
    .description('Display help information')
    .action(() => {
        console.log(chalk.blue(`TreeScript CLI Utility`));
        program.outputHelp();
    });

// Command to display version
program
    .version('0.1.0')
    .description('TreeScript CLI Utility');

// Parse the command-line arguments
program.parse(process.argv);

// Default action
if (!process.argv.slice(2).length) {
    program.outputHelp();
}