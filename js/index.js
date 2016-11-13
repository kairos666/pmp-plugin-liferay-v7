'use strict';
var ruleHelpers = require('./lib/rule-helpers');
var htmlHelpers = require('./lib/html-helpers');
var plugin = {
    name: 'liferay 7 helpers plugin',
    description: "liferay 7 helpers for easier hacking on Liferay portal pages\n        - inject main stylesheet (sennaJS version)\n        - inject main JS script (sennaJS version)\n        - page layout html helpers\n        - portlet skin HTML helper\n    ",
    ruleHelperObjectName: 'lfr7',
    ruleHelpers: ruleHelpers,
    htmlHelpers: htmlHelpers
};
module.exports = plugin;
