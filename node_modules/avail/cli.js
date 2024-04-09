#!/usr/bin/env node
'use strict';

const pkg = require('./package.json');
const avail = require('./');
const argv = process.argv.slice(2);

const symbols = require('log-symbols');
const updateNotifier = require('update-notifier');
updateNotifier({pkg}).notify();

function help() {
  console.log([
    '',
    '  ' + pkg.description,
    '',
    '  Example',
    '    avail avail.io',
    '',
    '    avail.io ' + symbols.success,
    '    avail.com ' + symbols.error
  ].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

function summarySymbol(summary) {
  switch (summary) {
    case 'inactive':
      return symbols.success;
      break;
    case 'active':
      return symbols.error;
      break;
    case 'reserved':
      return symbols.warning;
      break;
    default:
      return symbols.error;
      break;
  }
}

avail(argv[0])
  .then(result => {
    const status = result[0];
    const whois = result[1];

    const domains = status.body.status;

    domains.forEach(domain => {
      console.log(whois.body.whoisText);
      console.log(summarySymbol(domain.summary), domain.domain, `(${domain.status})`);
    });
  })
  .catch(console.log);
