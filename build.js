/**
 * @file build.js
 * @version 2.0.2
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category Build
 * @description
 * * Build automation script using esbuild. Handles bundling, minification, and output generation.
 * @requires esbuild
 * * High-performance JavaScript bundler.
 * @requires ./package.json
 * * Project configuration and versioning.
 * @requires child_process
 * * For executing shell commands to generate TypeScript definitions.
 */

const esbuild = require('esbuild');
const pkg = require('./package.json');
const { exec } = require('child_process');
const banner = `/**
 * ${pkg.name} - ${pkg.description}
 * @version ${pkg.version}
 * @homepage ${pkg.homepage}
 * @author ${pkg.author}
 * @license ${pkg.license}
 * @copyright ${new Date().getFullYear()} ${pkg.author}
 */`;

const baseConfig = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    banner: { js: banner },
    logLevel: 'info',
    platform: 'neutral',
    sourcemap: true,
};

const browserBuild = {
    ...baseConfig,
    entryPoints: ['src/browser.ts'],
    format: 'iife',
    outfile: 'dist/jbase.browser.js',
    legalComments: 'inline',
    platform: 'browser',
};

const browserMinBuild = {
    ...browserBuild,
    outfile: 'dist/jbase.min.js',
    minify: true,
    legalComments: 'none',
};

const esmBuild = {
    ...baseConfig,
    format: 'esm',
    outfile: 'dist/index.mjs',
};

const cjsBuild = {
    ...baseConfig,
    format: 'cjs',
    outfile: 'dist/index.cjs',
    platform: 'node',
};

const serverBuild = {
    ...baseConfig,
    entryPoints: ['src/server.ts'],
    platform: 'node',
    format: 'cjs',
    outfile: 'dist/server.js',
    external: ['jsdom', 'canvas', 'bufferutil', 'utf-8-validate'],
};

function generateTypes() {
    return new Promise((resolve, reject) => {
        console.log('\x1b[36m%s\x1b[0m', '🔨: Generating TypeScript Definitions...');
        exec('npx tsc --emitDeclarationOnly --outDir dist', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating types: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) console.error(`TSC Stderr: ${stderr}`);
            console.log('\x1b[32m%s\x1b[0m', '✅: TypeScript Definitions generated.');
            resolve();
        });
    });
}

Promise.all([
    esbuild.build(browserBuild),
    esbuild.build(browserMinBuild),
    esbuild.build(esmBuild),
    esbuild.build(cjsBuild),
    esbuild.build(serverBuild),
    generateTypes()
]).then(() => {
    console.log('\x1b[32m%s\x1b[0m', `*********************************************************************`);
    console.log('\x1b[32m%s\x1b[0m', `🗊: jBase v${pkg.version}: A modern micro-framework for the web.`);
    console.log('\x1b[32m%s\x1b[0m', `🗊: A modern micro-framework for the web: jBase offers the familiar`);
    console.log('\x1b[32m%s\x1b[0m', `🗊: syntax of classic DOM libraries, but without their baggage. Fully`);
    console.log('\x1b[32m%s\x1b[0m', `🗊: typed, modular, and optimized for modern browser engines.`);
    console.log('\x1b[32m%s\x1b[0m', `Ⓒ: Copyright (C) ${new Date().getFullYear()} ${pkg.author}`);
    console.log('\x1b[32m%s\x1b[0m', `§: Released under the ${pkg.license} License.`);
    console.log('\x1b[32m%s\x1b[0m', `*********************************************************************`);
}).catch((error) => {
    console.error('\x1b[31m%s\x1b[0m', '❌ Build failed:', error);
    process.exit(1);
});