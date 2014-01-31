/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-09-12
 * Time: 4:26 PM
 * To change this template use File | Settings | File Templates.
 */

// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    hbs: {
        disableI18n: true,
        disableHelpers: true
    },

    paths: {
        jquery: '../lib/jquery-2.0.3',
        underscore: '../lib/underscore',
        backbone: '../lib/backbone',
        handlebars: "../lib/hbs/handlebars",
        hbs: '../lib/hbs/hbs',
        i18nprecompile: '../lib/hbs/i18nprecompile',
        json2: '../lib/hbs/json2',
        'skrollr': '../lib/skrollr.min',
        'skrollrmenu':'../lib/skrollr.menu.min',
        nivoslider:'../lib/jquery.nivo.slider.pack'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        nivoslider: {
            deps: ["jquery"]
        },
        skrollrmenu: {
            deps: ["skrollr"]
        }
    }
});

require([
    // Load our app module and pass it to our definition function
    'app'
], function (App) {
    // The "app" dependency is passed in as "App"
    //export global object with the router in it


    window.app = App;
    App.initialize();
});