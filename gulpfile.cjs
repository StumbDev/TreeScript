const gulp = require('gulp');
const typescript = require('gulp-typescript');
const coffee = require('gulp-coffee');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const exec = require('gulp-exec');

// Paths to your files
const paths = {
    typescript: 'src/**/*.ts',
    coffee: 'src/**/*.coffee',
    treescript: 'src/**/*.voi', // Adjust if your TreeScript files have a different extension
    wat: 'src/**/*.wat',
    bins: 'src/cli.mjs',
    output: 'dist/'
};

// TypeScript compilation
function compileTypeScript() {
    return gulp.src(paths.typescript)
        .pipe(typescript())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest(paths.output));
}

// CoffeeScript compilation
function compileCoffeeScript() {
    return gulp.src(paths.coffee)
        .pipe(coffee({
            bare: true
        }))
        .pipe(gulp.dest(paths.output));
}

// TreeScript placeholder compilation (you can replace this with actual logic)
function compileTreeScript() {
    return gulp.src(paths.treescript)
        .pipe(gulp.dest(paths.output)); // Assuming you might just copy them for now
}

// Compile .wat files to .wasm
function compileWat() {
    return gulp.src(paths.wat)
        .pipe(exec('wat2wasm <%= file.path %> -o <%= file.path.replace(/\\.wat$/, \'.wasm\') %>'))
        .pipe(exec.reporter({
            showSuccess: true
        }));
}

function makeBin() {
    return gulp.src(paths.bins)
        .pipe(exec('pkg -o src/cli.mjs ./dist/treescript'))
        .pipe(exec.reporter({
            showSuccess: true
        }));
}

// Main compilation task
const compileAll = gulp.series(
    compileCoffeeScript,
    compileTreeScript,
    //    compileWat,
    makeBin
);

// Export tasks
exports.default = compileAll;