// ==UserScript==
// @name         JIRA Hide Detail in Kanban fiew No jQuery No checkbox
// @namespace    https://github.com/sweavo/jiraMonkey
// @version      1.0
// @description  Further to https://jira.atlassian.com/browse/JSWCLOUD-11160 just stop GreenHopper (JIRA agile) opening the detail view at all.
// @author       sweavo@gmail.com
// @match        https://*.com/secure/RapidBoard.jspa*
// @grant        none
// @run-at       document-end
// ==/UserScript==
// To install: open tamperMonkey dashboard, create a new script, paste this whole file over the whole edit buffer.

// TamperMonkey executes this script on DOMContentLoaded
console.log('JiraHideDetail: TamperMonkey about to neuter openDetailsView.\n');
GH.WorkController.openDetailsView=function openDetailsView(a) {
    console.log('JiraHideDetail: neutered openDetailsView called on item ' + a + '\n' );
};
console.log('JiraHideDetail: TamperMonkey neutered openDetailsView.\n');
