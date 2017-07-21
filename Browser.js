/**
 * @fileoverview This module detects the kind of well-known browser and version.
 * @author NHN Ent.
 *         FE Development Lab <dl_javascript@nhnent.com>
 */

'use strict';

/**
 * This object has an information that indicate the kind of browser.<br>
 * The list below is a detectable browser list.
 *  - ie8 ~ ie11
 *  - chrome
 *  - firefox
 *  - safari
 *  - edge
 * @memberof tui.util
 * @example
 *   tui.util.browser.chrome === true;    // chrome
 *  tui.util.browser.firefox === true;    // firefox
 *  tui.util.browser.safari === true;    // safari
 *  tui.util.browser.msie === true;    // IE
 *  tui.util.browser.edge === true;     // edge
 *  tui.util.browser.others === true;    // other browser
 *  tui.util.browser.version;    // browser version
 */
let browser = {
    chrome: false,
    firefox: false,
    safari: false,
    msie: false,
    edge: false,
    others: false,
    version: 0
};

let nav = window.navigator;
let appName = nav.appName.replace(/\s/g, '_');
let userAgent = nav.userAgent;

let rIE = /MSIE\s([0-9]+[.0-9]*)/;
let rIE11 = /Trident.*rv:11\./;
let rEdge = /Edge\/(\d+)\./;
let versionRegex = {
    firefox: /Firefox\/(\d+)\./,
    chrome: /Chrome\/(\d+)\./,
    safari: /Version\/([\d\.]+).*Safari\/(\d+)/
};

let key, tmp;

let detector = {
    Microsoft_Internet_Explorer: function() { // eslint-disable-line camelcase
        let detectedVersion = userAgent.match(rIE);

        if (detectedVersion) { // ie8 ~ ie10
            browser.msie = true;
            browser.version = parseFloat(detectedVersion[1]);
        } else { // no version information
            browser.others = true;
        }
    },
    Netscape: function() { // eslint-disable-line complexity
        let detected = false;

        if (rIE11.exec(userAgent)) {
            browser.msie = true;
            browser.version = 11;
            detected = true;
        } else if (rEdge.exec(userAgent)) {
            browser.edge = true;
            browser.version = userAgent.match(rEdge)[1];
            detected = true;
        } else {
            for (key in versionRegex) {
                if (versionRegex.hasOwnProperty(key)) {
                    tmp = userAgent.match(versionRegex[key]);
                    if (tmp && tmp.length > 1) { // eslint-disable-line max-depth
                        browser[key] = detected = true;
                        browser.version = parseFloat(tmp[1] || 0);
                        break;
                    }
                }
            }
        }
        if (!detected) {
            browser.others = true;
        }
    }
};

let fn = detector[appName];

if (fn) {
    detector[appName]();
}

module.exports = browser;