// ==UserScript==
// @name         JIRA Hide Detail No jQuery
// @namespace    https://github.com/sweavo/jiraMonkey
// @version      0.2
// @description  Further to https://jira.atlassian.com/browse/GHS-11160 install a checkbox to keep detail view hidden
// @author       sweavo@gmail.com
// @include      /^https?:\/\/[^:/]*[:8081]?\/secure\/RapidBoard.jspa\?rapidView*/
// @grant        none
// ==/UserScript==
// Notes: this script is probably only compatible with Chrome, the only browser I've tried it in.
//
// To install: open tamperMonkey dashboard, create a new script, paste this whole file over the whole edit buffer.


function remove_detail_view()
{
    var detail = document.getElementById( 'ghx-detail-view' );
    if(detail !== null)
    {
        var planClass = document.getElementById('plan-toggle').getAttribute('class');
        if( planClass == 'aui-button active' )
        {
            detail.style.display = 'None';
            GH.DetailsView.hide();
            GH.PlanView.updateHorizontalPositioning();
        }
    }
}

function schedule_remove_detail_view(ms)
{
    if (ms === null)
    {
        ms = 500;
    }
    setTimeout( remove_detail_view, ms );
}

function no_detail_click( )
{
    set_no_detail_in_backlog();
    if( document.getElementById('shc-no-detail').checked )
    {
        schedule_remove_detail_view(100);
    }
}

function plan_click()
{
    no_detail_click();
    // Have to wait until it loads, but waitForKeyElements didn't work.
    schedule_remove_detail_view(500);
    schedule_remove_detail_view(750);
}


function scheduledBacklogClick()
{
    schedule_remove_detail_view(100);
}

function set_no_detail_in_backlog()
{
    var backlog = document.getElementById('ghx-backlog-column');
    if(backlog)
    {
        if( document.getElementById('shc-no-detail').checked )
        {
            backlog.addEventListener( 'click',scheduledBacklogClick);
        }
        else
        {
            backlog.removeEventListener( 'click', scheduledBacklogClick);
        }
    }
}

function install_button( parent )
{ 
    var prnt = document.getElementById('ghx-modes');
    var plan = document.getElementById('plan-toggle');

    var toggleDiv = document.createElement('span');
    var inp = document.createElement('input');
    inp.setAttribute('id', 'shc-no-detail');
    inp.setAttribute('type', 'checkbox');
    inp.setAttribute('title', 'No Detail View');
    toggleDiv.appendChild( inp );
    
    prnt.insertBefore( toggleDiv, plan );
    document.getElementById('shc-no-detail').addEventListener( 'click', no_detail_click);
    no_detail_click();
    
    // Have to wait until it loads, but waitForKeyElements didn't work.
    plan.addEventListener('click', plan_click);
}

document.addEventListener('load',  install_button);
