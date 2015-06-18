// ==UserScript==
// @name         JIRA Hide Detail No jQuery
// @namespace    https://github.com/sweavo/jiraMonkey
// @version      0.3
// @description  Further to https://jira.atlassian.com/browse/GHS-11160 install a checkbox to keep detail view hidden
// @author       sweavo@gmail.com
// @include      /^https?:\/\/[^/]*\/secure\/RapidBoard.jspa\?rapidView/
// @grant        none
// ==/UserScript==
// Notes: this script is probably only compatible with Chrome, the only browser I've tried it in.
//
// To install: open tamperMonkey dashboard, create a new script, paste this whole file over the whole edit buffer.


function remove_detail_view()
{
    GH.PlanController.setDetailViewOpenedState(false);
    GH.WorkController.setDetailViewOpenedState(false);
    GH.PlanView.updateHorizontalPositioning();
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
    set_no_detail_on_row_or_card_click();
    if( document.getElementById('shc-no-detail').checked )
    {
        schedule_remove_detail_view(100);
    }
}

function rowcard_click()
{
    no_detail_click();
    // Have to wait until it loads, but waitForKeyElements didn't work.
    // Scheduled this way, we'll have an opportunity to catch it at 100, 600, and 860 ms from
    // the click, and the detail view will "stay gone" when we change tabs.
    schedule_remove_detail_view(500);
    schedule_remove_detail_view(750);
}


function scheduledRemoveForRowOrCard()
{
    schedule_remove_detail_view(100);
}

function set_no_detail_on_row_or_card_click()
{
    var rowCardArea = document.getElementById('ghx-rabid');
    if(rowCardArea)
    {
        if( document.getElementById('shc-no-detail').checked )
        {
            rowCardArea.addEventListener( 'click',scheduledRemoveForRowOrCard);
        }
        else
        {
            rowCardArea.removeEventListener( 'click', scheduledRemoveForRowOrCard);
        }
    }
}

function install_button( parent )
{ 
    var prnt = document.getElementById('ghx-modes');
    var plan = document.getElementById('plan-toggle');
    var work = document.getElementById('work-toggle');

    var toggleDiv = document.createElement('span');
    // The checkbox that makes the thing work
    var inp = document.createElement('input');
    inp.setAttribute('id', 'shc-no-detail');
    inp.setAttribute('type', 'checkbox');
    inp.setAttribute('title', 'No Detail View');
    toggleDiv.appendChild( inp );
    // Label for checkbox
    // Debug button
    prnt.insertBefore( toggleDiv, plan );
    document.getElementById('shc-no-detail').addEventListener( 'click', no_detail_click);
    no_detail_click();
    
    // Have to wait until it loads, but waitForKeyElements didn't work.
    plan.addEventListener('click', rowcard_click);
    work.addEventListener('click', rowcard_click);
}

document.addEventListener('load',  install_button);


