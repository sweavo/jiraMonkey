// ==UserScript==
// @name         Swap title and subtitle on kanban board
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  I want to see the project large and the fact it's a kaban board small.
// @author       You
// @include      /^https?:\/\/[^/]*\/secure\/RapidBoard.jspa
// @grant        none
// ==/UserScript==

function swap_contents( o1, o2 )
{
    var swap  = o1.innerHTML;
    o1.innerHTML=o2.innerHTML;
    o2.innerHTML=swap;
}

function clear_title() {
    console.log("clear title");

    swap_contents( document.getElementById('subnav-title').childNodes[0],
                   document.getElementById('ghx-board-name') );
}
(function() {
    'use strict';
    window.setTimeout( clear_title, 100 );
})();
