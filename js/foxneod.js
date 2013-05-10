/*global define, _, FDM_Player_vars, alert */

define(['player', 'utils', 'css', 'polyfills', 'debug'], function (player, utils, css, polyfills, Debug) {
    'use strict';

    var buildTimestamp = '@@buildDate';
    var debug = new Debug('core');

    var userAgentFlags = {
        android: false,
        ios: false,
        flash: false
    };
    //-------------------------------------------------------------------------------- /private methods

    //-------------------------------------------------------------------------------- initialization
    (function init () {

        debug.log('ready', {
            buildDate: '@@buildDate',
            authors: '@@authors'
        });
//        debug.log('Ready', {
//            buildDate: '@@buildDate',
//            authors: '@@authors'
//        }, '!');

        if (FDM_Player_vars.isFlash)
        {
            userAgentFlags.flash = true;
        }
        else if (FDM_Player_vars.isIOS)
        {
            userAgentFlags.ios = true;
        }
    })();
    //-------------------------------------------------------------------------------- /initialization

    // Public API
    return {
        version: '@@version',
        packageName: '@@packageName',
        buildDate: '@@buildDate',
        player: player,
        utils: utils,
        debug: Debug
    };
});