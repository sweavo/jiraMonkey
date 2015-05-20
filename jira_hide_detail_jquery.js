// ==UserScript==
// @name         JIRA Hide Detail
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @include      /^https?:\/\/yokczc3195gggd[^:/]*:8081\/secure\/RapidBoard.jspa\?rapidView=1/
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
// Install: open tamperMonkey or greaseMonkey, paste this as a new user script.
// I've only tried it in tamperMonkey(chrome) so YMMV in greaseMonkey/Firefox.
// I don't expect IE to support it, but let me know if it works or nearly so!

function remove_detail_view()
{
    $('#ghx-detail-view').css( { display: 'None' } );
    if ( $('#shc-no-detail').is(':checked') )
    {
        setTimeout( remove_detail_view, 500 );
    }
}

function no_detail_click() {
    if ( $('#shc-no-detail').is(':checked') )
    {
        remove_detail_view();
    }
}

function install_button() { 
    $('#ghx-modes').html( 
        '<input id="shc-no-detail" type="checkbox" title="No Detail View">No Detail View'
        + $('#ghx-modes').html()
    );
    $('#shc-no-detail').click( no_detail_click);
}

$(document).ready( install_button );
