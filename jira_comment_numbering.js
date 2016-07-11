// ==UserScript==
// @name         JIRA comment numbering
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Periodically (because I had trouble with addEventListener on the show-more-comments element) insert # numbers into comments.
// @author       sweavo@gmail.com
// @include      YOUR JIRA SERVER HERE
// @grant        none
// ==/UserScript==

JCN_LOG_TO_CONSOLE=false;

function prepend( container, child )
{
    container.insertBefore(child, container.childNodes[0]);
}

function get_start_point( activity_comment )
{
    var show_more =activity_comment.getElementsByClassName ('show-more-comments' );
    if ( show_more.length === 0 )
    {
        return 1;
    }
    else
    {
        if ( JCN_LOG_TO_CONSOLE ) console.log('show-more found');
        var number = show_more[0].getAttribute('data-collapsed-count');
        if ( JCN_LOG_TO_CONSOLE ) console.log( number );
        return 1 + parseInt( number );
    }
}

function isTextNodeMatching( node, text )
{
    if ( node.nodeType != 3 )
    {
        return false;
    }
    if ( JCN_LOG_TO_CONSOLE ) console.log( "existing: " + node.textContent );
    if ( JCN_LOG_TO_CONSOLE ) console.log( "new: " + text );
    return ( node.textContent == text ) ;
}

function number_comments( )
{
    if ( JCN_LOG_TO_CONSOLE ) console.log('number_comments start');
    var comments = document.getElementsByClassName( 'activity-comment' );
    var i;
    var offset = get_start_point( document.getElementById( 'issue_actions_container'  ));
    for (i = 0; i < comments.length; i++) {
        var deets = comments[i].getElementsByClassName( 'action-details' );
        if ( JCN_LOG_TO_CONSOLE ) console.log( deets );
        var numberText =  "#" + ( i + offset );
        var firstChild =  deets[0].childNodes[0];
        if ( ! isTextNodeMatching( firstChild, numberText) )
        {
            var newText = document.createTextNode( numberText );
            prepend( deets[0], newText );
        }
    }
    if ( JCN_LOG_TO_CONSOLE ) console.log('number_comments done');
}

function schedule_numbering( )
{
    if ( JCN_LOG_TO_CONSOLE ) console.log('scheduling number_comments');
    setTimeout( number_comments, 1000 );
}
(function() {
    'use strict';

    // Your code here...
    setInterval( number_comments, 2000 );
})();
