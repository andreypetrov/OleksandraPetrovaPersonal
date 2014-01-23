define([
    'jquery',
    'underscore',
    'backbone',
    'router', // Request router.js
    'skrollr'
], function ($, _, Backbone, Router) {

    var initialize = function () {
        // Pass in our Router module and call it's initialize function
        //also assign it to the app object for future acessibility
        this.router = Router.initialize();
    }

    return { initialize: initialize };
});