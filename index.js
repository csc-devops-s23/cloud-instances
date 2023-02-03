#!/usr/bin/env node
const yargs = require('yargs');
const { version } = require('./package.json');
const { exit } = require('yargs');

yargs
    .middleware(preReqs)
    .commandDir('./commands')
    .version()
    .epilog(version ? `Version: ${version}` : '')
    .demandCommand(1, 'Did you forget to specify a command?')
    .recommendCommands()
    .showHelpOnFail(false, 'Specify --help for available options')
    .strict(true)
    .help()
    .wrap(yargs.terminalWidth())
    .argv

function preReqs() {
    if (!process.env.DO_TOKEN || process.env.DO_TOKEN == '') {
        console.error('You must set DO_TOKEN environment variable to your DigitalOcean API token.');
        exit(1);
    }
}