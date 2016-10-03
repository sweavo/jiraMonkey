// ==UserScript==
// @name         JIRA Comment Absolute Dates
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Don't use "2 days ago" etc in comment headers.
// @author       sweavo@gmail.com
// @include      /^https?:\/\/[^/]*\/browse\//
// @grant        none
// ==/UserScript==

JCAT_LOG_TO_CONSOLE=false;

function prepend( container, child )
{
    container.insertBefore(child, container.childNodes[0]);
}

function begins( whole, part )
{
    return whole.substring( 0, part.length ) == part;
}

function patch_absolute_dates( )
{
    if ( JCAT_LOG_TO_CONSOLE ) console.log('patch_absolute_dates start');
    var comments = document.getElementsByClassName( 'activity-comment' );
    var i;
    for (i = 0; i < comments.length; i++) {
        var stampContainer = comments[i].getElementsByClassName( 'user-tz' )[0];
        var absolute = stampContainer.title;
        var displayed = stampContainer.innerText;
        if ( JCAT_LOG_TO_CONSOLE ) console.log( absolute + " - " + displayed );
        /* since the server preiodically updates the <time> element that contains
         * the displayed text, we are not going to change it directly. Instead, we
         * insert the absolute time before the auto-updated text.
         */
        if ( ! begins( displayed, absolute ) )
        {
            prepend( stampContainer, document.createTextNode( absolute + ": " ) );
        }
    }
    if ( JCAT_LOG_TO_CONSOLE ) console.log('patch_absolute_dates done');
}

(function() {
    'use strict';
    setInterval( patch_absolute_dates, 2000 );
    patch_absolute_dates();
})();
