// ==UserScript==
// @name         JIRA Hide Detail No jQuery
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @include      /^https?:\/\/yokczc3195gggd[^:/]*:8081\/secure\/RapidBoard.jspa\?rapidView=1/
// @grant        none
// ==/UserScript==
// Notes: this script is probably only compatible with Chrome, the only browser I've tried it in.
//
// To install: open tamperMonkey dashboard, create a new script, paste this whole file over the whole edit buffer.

function remove_detail_view()
{
    document.getElementById( "ghx-detail-view" ).style.display = "None";
    if (  document.getElementById('shc-no-detail').checked )
    {
        setTimeout( remove_detail_view, 500 );
    }
}

function no_detail_click( event ) {
    if( document.getElementById('shc-no-detail').checked )
    {
        remove_detail_view();
    }
    event.stopPropagation();
}

function install_button( parent ) { 
    var parent = document.getElementById('ghx-modes');
    var before = document.getElementById('plan-toggle');

    var toggleDiv = document.createElement('span');
    var inp = document.createElement('input');
    inp.setAttribute("id", "shc-no-detail");
    inp.setAttribute("type", "checkbox");
    inp.setAttribute("title", "No Detail View");
    toggleDiv.appendChild( inp );
    
    parent.insertBefore( toggleDiv, before );
    document.getElementById('shc-no-detail').addEventListener( 'click', no_detail_click);

}
document.addEventListener("load",  install_button );
