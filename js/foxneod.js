/*global define */

define([
    'Dispatcher',
    'Debug',
    'polyfills',
    'utils',
    'player',
    'query',
    'system',
    'base64',
    'cookies',
    'mvpd',
    'ovp',
    'analytics',
    'underscoreloader',
    'jqueryloader',
    'omnitureloader'], function (Dispatcher, Debug, polyfills, utils, player, query, system, base64, cookies, mvpd, ovp, analytics, _, jquery, omnitureloader) {
    'use strict';

    //////////////////////////////////////////////// instance variables
    var debug = new Debug('core'),
        dispatcher = new Dispatcher();
    ////////////////////////////////////////////////




    //////////////////////////////////////////////// public methods
    var getOmnitureLibraryReady = function (account) {
        return omnitureloader.getOmnitureLibrary(account);
    };
    ////////////////////////////////////////////////




    //////////////////////////////////////////////// private methods
    function _messageUnsupportedUsers () {
        var title = "Unsupported Browser",
            message = '';

        if (system.isBrowser('ie', 7))
        {
            if (system.isEngine('trident', 6))
            {
                message = "You're currently using Internet Explorer 10 in \"Compatibility\" mode, which has been " +
                    "known to freeze the video. Please switch your browser into \"Standards\" mode to get a better " +
                    "experience.";
            }
            else
            {
                message = "You're currently using Internet Explorer 7, which is an unsupported browser for video " +
                    "playback. We recommend switching to a more modern browser or upgrading IE to get a better " +
                    "experience.";
            }
        }

        //show site modal
        if (_.has(window, 'VideoAuth') && _.has(window.VideoAuth, 'Modal') && (!_.isEmpty(title) && !_.isEmpty(message)))
        {
            var $htmlFragment = jquery('<div id="foxneod-error">\n    <h1>Warning</h1>\n    <p class="error-message">' + message + '</p>\n</div>');

            window.VideoAuth.Modal.open(null, title);
            window.VideoAuth.Modal.content.set($htmlFragment);
        }
    }
    ////////////////////////////////////////////////



    //////////////////////////////////////////////// initialization
    var init = function () {
        debug.log('ready (build date: @@buildDate)');

        _messageUnsupportedUsers();
    };
    ////////////////////////////////////////////////


    // Public API
    return {
        _init: init,
        buildDate: '@@buildDate',
        packageName: '@@packageName',
        version: '@@version',
        getOmnitureLibraryReady: getOmnitureLibraryReady,
        dispatcher: dispatcher,
        dispatch: dispatcher.dispatch,
        on: dispatcher.on,
        addEventListener: dispatcher.on,
        getEventListeners: dispatcher.getEventListeners,
        hasEventListener: dispatcher.hasEventListener,
        removeEventListener: dispatcher.removeEventListener,
        analytics: analytics,
        cookies: cookies,
        Debug: Debug,
        mvpd: mvpd,
        ovp: ovp,
        player: player,
        query: query,
        system: system,
        utils: utils,
        _: _,
        jQuery: jquery,
        __test__: {
            jQuery: jquery,
            base64: base64,
            removeAllEventListeners: dispatcher.removeAllEventListeners
        }
    };
});