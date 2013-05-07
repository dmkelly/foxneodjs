/*global define, _, console */

define([], function () {
    'use strict';

    var arrayToObject = function (arr) {
        var obj = {};

        for (var i = 0, n = arr.length; i < n; i++)
        {
            var item = arr[i];
            if (item.indexOf('=') !== -1)
            {
                var itemPieces = item.split('=');

                obj[itemPieces[0]] = itemPieces[1];
            }
            else
            {
                obj[i] = item;
            }
        }

        return obj;
    };

    //only supports shallow objects right now
    var objectToArray = function (obj) {
        var outputArray = [];

        for (var prop in obj)
        {
            if (!(_.isObject(obj[prop]) || _.isArray(obj[prop])))
            {
                outputArray.push(prop + '=' + obj[prop]);
            }
            else
            {
                throw new Error('objectToArray only supports shallow objects (no nested objects or arrays).');
            }
        }

        return outputArray;
    };

    var pipeStringToObject = function (pipeString) {
        var obj = {};

        var kvPairs = pipeString.split('|');

        for (var i = 0, n = kvPairs.length; i < n; i++)
        {
            var pair = kvPairs[i].split('=');
            var value = pair[1] || null; //i just prefer null to undefined
            obj[pair[0]] = value; //sets the key value pair on our return object
        }

        return obj;
    };

    var objectToPipeString = function (obj, delimiter) {
        var properties = [];

        for (var prop in obj)
        {
            properties.push(prop + '=' + obj[prop]);
        }

        return properties.join(delimiter || '|');
    };

    var lowerCasePropertyNames = function (obj) { //only does a shallow lookup
        var output = {};

        for (var prop in obj)
        {
            output[prop.toLowerCase()] = obj[prop];
        }

        return output;
    };

//    var getRandomColor = function () {
//        var letters = '0123456789ABCDEF'.split('');
//        var color = '#';
//
//        for (var i = 0; i < 6; i++)
//        {
//            color += letters[Math.round(Math.random() * 15)];
//        }
//
//        return color;
//    };

    var getColorFromString = function (color) {
        if (!_.isUndefined(color))
        {
            if (!_.isString(color))
            {
                throw new Error('The value supplied to getColorFromString() should be a string, not whatever you passed in.');
            }

            /**
             * We want to make sure that the color supplied is the right length (6 characters without a hash
             * and 7 with). Then, if no hash exists, we add it ourselves.
             */
            var correctLength = (color.length === 6 || color.length === 7);
            if (correctLength)
            {
                if (color.length === 6 && color.indexOf('#') === -1)
                {
                    color = '#' + color;
                }

                return color.toLowerCase();
            }
//            else
//            {
//                debug.log({
//                    type: 'utils',
//                    message: 'Whatever you supplied to getColorFromString() was either not a string, not a number and/or ' +
//                        'not the right length (should be 6 characters with no hash and 7 with).',
//                    warn: true
//                });
//            }
        }

        return null;
    };

    var addPixelSuffix = function (text) {
        var size = String(text);
        var index = String(size).indexOf('px');

        if (index === -1)
        {
            size = size + 'px';
        }
//        else if (index < (text.length-1))
//        {
              //hmmmm - should I strip the px out of the string if it's mid string, add the px and return that but warn anyway?
//            debug.log({
//                type: 'utils',
//                message: "Whatever you supplied to addPixelSuffix() already had px in it, but it wasn't at the end of " +
//                    "the string, which is probably a bad thing.",
//                warn: true
//            });
//        }

        return size;
    };

    var removePixelSuffix = function (text) {
        text = String(text);
        var index = text.indexOf('px');

        if (index !== -1)
        {
            if (index === (text.length-2))
            {
                return text.substr(0, index);
            }
//            else
//            {
//                debug.log({
//                    type: 'utils',
//                    message: "Whatever you supplied to removePixelSuffix() already had px in it, but it wasn't at the " +
//                        "end of the string, which is probably a bad thing.",
//                    warn: true
//                });
//            }
        }

        return text;
    };

    var dispatchEvent = function (eventName, data) {
        var event = document.createEvent('Event');
        var name = '@@packageName:' + eventName;
        event.initEvent(name, true, true);
        event.customData = data || {};
        window.dispatchEvent(event);
    };




    //---------------------------------------------- url stuff
    var urlString = window.location.href;

    var getQueryParams = function (url) {
        var queryParamsObject = {}; //this is what we're storing and returning
        url = url || urlString;

        if (url.indexOf('?') !== -1)
        {
            var urlSplit = url.split('?');
            var queryParams = urlSplit[1].split('&');

            /**
             * final data will look like so:
             * {
                     *     playerParams: {
                     *         id: "player",
                     *         width: 640,
                     *         ...
                     *     }
                     * }
             */

            if (urlSplit[1].indexOf('|') !== -1)
            {
                for (var i = 0, n = queryParams.length; i < n; i++)
                {
                    var queryParam = queryParams[i];
                    var firstEqIndex = queryParam.indexOf('=');
                    if (firstEqIndex !== -1)
                    {
                        var keyValuePairsString = queryParam;
                        var collectionKey = queryParam.substr(0, firstEqIndex); //equates to playerParams in the example above
                        queryParamsObject[collectionKey] = {};
                        var keyValuePairsArray = keyValuePairsString.split('|');

                        for (var j = 0, kvpLength = keyValuePairsArray.length; j < kvpLength; j++)
                        {
                            var keyValuePair = keyValuePairsArray[j].split('=');
                            var key = keyValuePair[0];
                            var value = keyValuePair[1];

                            if (urlSplit[1].indexOf('&') !== -1)
                            {
                                keyValuePairsString = queryParam.substr(firstEqIndex+1);
                                //if we have an ampersand, it's not just a basic pipe string, so we need to make a
                                // more complex object
                                queryParamsObject[collectionKey][key] = value;
                            }
                            else
                            {
                                //just a pipe string, no other key-value pairs so we can make a basic object
                                queryParamsObject[key] = value;
                            }
                        }
                    }
                }
            }
            else
            {
                queryParamsObject = arrayToObject(queryParams);
            }
        }

        return queryParamsObject;
    };

    var getParamValue = function (key, url) {
        var queryParams = getQueryParams();

        if (_.isObject(queryParams)) //it should always be an object, but just in case
        {
            for (var prop in queryParams)
            {
                if (prop === key)
                {
                    return queryParams[prop];
                }
            }
        }

        return;
    };

    //second and third params optional
    var paramExists = function (key, value, url) {
        var queryParams = getQueryParams(url);

        for (var prop in queryParams)
        {
            if (queryParams.hasOwnProperty(prop))
            {
                if (prop === key)
                {
                    if (value)
                    {
                        if (queryParams[prop] === value)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }

                    return true;
                }
            }
        }

        return false;
    };

    /**
     * This is mostly for testing purposes so we can spoof URLs easily, but it's public since I'm big on the "eat your
     * own dog food" thing.
     * @param url
     */
    var setURL = function (url) {
        this.url = url;
    };
    //---------------------------------------------- /url stuff


    // Public API
    return {
        arrayToObject: arrayToObject,
        objectToArray: objectToArray,
        pipeStringToObject: pipeStringToObject,
        objectToPipeString: objectToPipeString,
        lowerCasePropertyNames: lowerCasePropertyNames,
//        getRandomColor: getRandomColor,
        getColorFromString: getColorFromString,
        addPixelSuffix: addPixelSuffix,
        removePixelSuffix: removePixelSuffix,
        dispatchEvent: dispatchEvent,
        dispatch: dispatchEvent, //alias,

        getParamValue: getParamValue,
        getQueryParams: getQueryParams,
        paramExists: paramExists,
        setURL: setURL
    };
});