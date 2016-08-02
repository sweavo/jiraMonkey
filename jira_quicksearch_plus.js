// ==UserScript==
// @name         JIRA Quicksearch plus
// @namespace    https://github.com/sweavo/jiraMonkey
// @version      1.0
// @description  Quicksearch to use current project and unresolved only. Inspired by https://jira.atlassian.com/browse/JRA-15306
// @author       sweavo@gmail.com
// @include      /^https?:\/\/HOSTNAME:8080/
// @grant        none
// @run-at       document-end
// ==/UserScript==
//
// To install:
//    open tamperMonkey dashboard,
//    create a new script,
//    paste this whole file over the whole edit buffer
//    edit HOSTNAME above to the hostname of your JIRA server
//    update the port 8080 if necessary
// Put your default project in DEFAULT_PROJECT below.
var DEFAULT_PROJECT = "DEFAULT";

// TamperMonkey executes this script on DOMContentLoaded
function get_meta_data( key, default_value )
{
    // retrieve value from <meta name="{key}" content="{value}">
    var meta_element = document.getElementsByName(key)[0];
    return meta_element ? meta_element.content : default_value;
}

var PROJECT_NAME = get_meta_data( 'ghx-project-key', DEFAULT_PROJECT );
console.log( "Quicksearch Plus: Project is '" + PROJECT_NAME + "'" );

var quicksearch = document.getElementById("quicksearch");
var qsInput = document.getElementById("quickSearchInput");

function dress_qs_as_jql( qs )
{
    return 'text ~ "' + qs + '"' +
	      ' and resolution is EMPTY' +
	      ' and project="' + PROJECT_NAME + '"';
}

function jm_submit_quicksearch( )
{
    RE_INT= /^\d+$/;
    // If numeric, don't futz with the field
    if ( RE_INT.test( qsInput.value ) )
    {
    	return;
    }

    // Else we will restrict the project and resolution
    qsInput.value = dress_qs_as_jql( qsInput.value );
    qsInput.name="jql"; // No longer submitting quickSearch, but advanced
}


// Override the search box behavior and mouseover hint
quicksearch.addEventListener( "submit", jm_submit_quicksearch );

// Advertise that we've overridden the behavior
qsInput.placeholder="S.U.I.P.";
qsInput.title="Search unresolved tickets in project " + PROJECT_NAME + " (Type '/')";
