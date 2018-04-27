<script type="text/javascript">
/* Jira Comment Numbering
 *
 * See https://github.com/sweavo/jiraMonkey/blob/master/jira_comment_numbering.js
 *
 * Inserts human-readable #1, #2, etc at the top of each comment.
 * Then other humans can type stuff like "I agree with comment #3" 
 *
 * Put this in the announcement banner on your jira instance.
 * It's a bit pointless to have this as a tampermonkey script, as
 * you want to be able to use the numbers when communicating with
 * your colleagues, and tampermonkey will only put it in your
 * browser.
 *
 * TODO: Trigger the re-run of number_comments on expansion of 
 *       show-more-comments, rather than doing it every 2 seconds
 *       regardless.
 * TODO: Allow #3 type notation within comments that will jump to
 *       the anchor of the referenced comment.
 * 
 */ 
"use strict";

/* Whether to log stuff to console to show it working */
const JCN_LOG_TO_CONSOLE=false;

/* Insert child as the first child nodes of container. */
function prepend( container, child )
{
    container.insertBefore( child, container.childNodes[0] );
}

/* In a jira comments block, we start counting at 1 unless the "show more comments"
 * div is visible. In that case, we start at the number of hidden comments + 1 
 */
function get_start_point( issue_actions_container )
{
    if ( ! issue_actions_container )
    {
        if ( JCN_LOG_TO_CONSOLE ) console.log( "issue_actions_container was null" );
        return 1;
    }
    var show_more =issue_actions_container.getElementsByClassName( 'show-more-comments' );
    if ( show_more.length === 0 )
    {
        return 1;
    }
    else
    {
        if ( JCN_LOG_TO_CONSOLE ) console.log( 'show-more found' );
        var number = show_more[0].getAttribute( 'data-collapsed-count' );
        if ( JCN_LOG_TO_CONSOLE ) console.log( number );
        return 1 + parseInt( number );
    }
}

/* true if and only if node is a textnode whose contents match text */
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

/* insert numbers to the start of the headers of comments on the browse page */
function number_comments( )
{
    if ( JCN_LOG_TO_CONSOLE ) console.log( 'number_comments start' );
    if ( ! document )
    {
        if ( JCN_LOG_TO_CONSOLE ) console.log( "document was null" );
        return;
    }
    var comments = document.getElementsByClassName( 'activity-comment' );
    var i;
    var issue_actions_container = document.getElementById( 'issue_actions_container' )
    if ( ! issue_actions_container )
    {
        /* This doesn't look like an issue view; bail out. */
        return;
    }
    var offset = get_start_point( issue_actions_container );
    for ( i = 0; i < comments.length; i++ ) {
        if ( ! comments[i] )
        {
            alert( 'comments[i] was null' );
            continue;
        }
        var deets = comments[i].getElementsByClassName( 'action-details' );
        if ( JCN_LOG_TO_CONSOLE ) console.log( deets );
        var numberText =  "#" + ( i + offset );
        var firstChild =  deets[0].childNodes[0];
        if ( ! isTextNodeMatching( firstChild, numberText ) )
        {
            var newText = document.createTextNode( numberText );
            prepend( deets[0], newText );
        }
    }
    if ( JCN_LOG_TO_CONSOLE ) console.log( 'number_comments done' );
}

/* insert numbers and set an interval to repeat it. This is because triggering
 * number_comments on the click event of show-more-comments didn't always work.
 */
function number_comments_persistently( ) 
{
  setInterval( number_comments, 2000 );
  number_comments( );
}

/* once the DOM is loaded, start the modifications. */
document.addEventListener( "DOMContentLoaded", number_comments_persistently, false );

</script>
