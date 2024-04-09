'use strict';

const got = require('got');

const BASE_URL = 'https://api.domainr.com/v2';
const CLIENT_ID = 'd03affbe48744f2e8a2e8453e5d3f27f' || process.env.DOMAINR_CLIENT_ID;

module.exports = (domain) => {
  var opts = {
    headers: {
      'Origin': 'https://domainr.com'
    },
    json: true
  };

  var status = got(`${BASE_URL}/status?domain=${domain}&client_id=${CLIENT_ID}`, opts);
  var whois = got(`${BASE_URL}/whois?domain=${domain}&client_id=${CLIENT_ID}`, opts);

  return Promise.all([status, whois]);
};
