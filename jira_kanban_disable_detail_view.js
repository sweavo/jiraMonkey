// ==UserScript==
// @name         JIRA Kanban Disable Detail View
// @namespace    https://github.com/sweavo/jiraMonkey
// @version      1.0
// @description  Further to https://jira.atlassian.com/browse/GHS-11160 just stop GreenHopper (JIRA agile) opening the detail view at all in Kanban boards
// @author       sweavo@gmail.com
// @include      /^https?:\/\/[^/]*\/secure\/RapidBoard.jspa\?rapidView/
// @grant        none
// @run-at       document-end
// ==/UserScript==
// To install: open tamperMonkey dashboard, create a new script, paste this whole file over the whole edit buffer.

// To open the actual issue, it's necessary to shift-click or ctrl-click the issue key.

// TamperMonkey executes this script on DOMContentLoaded
// We cause the controller to forget how to open the planview.
GH.WorkController.openDetailsView=function (a){ /* nothing */ };

