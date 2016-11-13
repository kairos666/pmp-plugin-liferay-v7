'use strict'

const ruleHelpers = require('./lib/rule-helpers');
const htmlHelpers = require('./lib/html-helpers');

interface IPmpPlugin {
    name:                   string;
    description:            string;
    ruleHelperObjectName:   string;
    ruleHelpers:            any;
    htmlHelpers:            any;
}

let plugin:IPmpPlugin = {
    name: 'liferay 7 helpers plugin',
    description: `liferay 7 helpers for easier hacking on Liferay portal pages
        - inject main stylesheet (sennaJS version)
        - inject main JS script (sennaJS version)
        - page layout html helpers
        - portlet skin HTML helpers
    `,
    ruleHelperObjectName: 'lfr7',
    ruleHelpers: ruleHelpers,
    htmlHelpers: htmlHelpers
};

module.exports = plugin;