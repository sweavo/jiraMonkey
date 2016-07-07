// ==UserScript==
// @name         JIRA Quicksearch plus
// @namespace    https://github.com/sweavo/jiraMonkey
// @version      1.0
// @description  Quicksearch to use current project and unresolved only.
// @author       sweavo@gmail.com
// @include      /^https?:\/\/HOSTNAME:8080/
// @grant        none
// @run-at       document-end
// ==/UserScript==
// To install:
//    open tamperMonkey dashboard,
//    create a new script,
//    paste this whole file over the whole edit buffer
//    edit HOSTNAME above to the hostname of your JIRA server
//    update the port 8080 if necessary
//    set your project name below.
var PROJECT_NAME="UPDATEME";

function dress_qs_as_jql( qs )
{
    return 'text ~ "' + qs + '"' +
        ' and resolution is EMPTY' +
        ' and project="' + PROJECT_NAME + '"';
}

// TamperMonkey executes this script on DOMContentLoaded
var quicksearch = document.getElementById("quicksearch");
var qsInput = document.getElementById("quickSearchInput");

// Override the search box behavior and mouseover hint
quicksearch.addEventListener("submit",function(){ qsInput.value = dress_qs_as_jql( qsInput.value ); });
qsInput.name="jql"; // No longer submitting quickSearch, but advanced

// Advertise that we've overridden the behavior
qsInput.placeholder="S.U.I.P.";
qsInput.title="Search unresolved tickets in project " + PROJECT_NAME + " (Type '/')";
