// ==UserScript==
// @name         JIRA Remove Detail View No jQuery for JIRA Software 7.1.8
// @namespace    http://tampermonkey.net/
// @version      7.1.8
// @description  Close and disable the detail view in backlog
// @author       sweavo@gmail.com
// @include      /^https?:\/\/.*\/secure\/RapidBoard\.jspa\?rapidView/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function remove_detail_view()
    {
        console.log('JHDNjQ: remove_detail_view');
        GH.PlanController.setDetailViewOpenedState(false);
        GH.PlanView.updateHorizontalPositioning();
        // And nobble the method
        GH.PlanController.setDetailViewOpenedState = function( boolValue ) {};
    }


    console.log('JHDNjQ: hello');
    remove_detail_view();
})();

