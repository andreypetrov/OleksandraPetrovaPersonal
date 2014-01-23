/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-09-12
 * Time: 4:33 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/home',
    'skrollr'
], function ($, _, Backbone, HomeView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "home"
        },

        initialize: function () {
            this.homeView = new HomeView();
        },

        home: function () {
            $('#app').html(this.homeView.render().el);

            skrollr.init({
                forceHeight: false,
                smoothScrolling: true,
                edgeStrategy: 'set'
            });
            //skrollr.init({'forceHeight': true, 'scale':5});    //always init the scroller after all the elements in the dom have been added
        }

    });

    //initialize the router and give a reference to it
    var initialize = function () {
        var appRouter = new AppRouter();
        Backbone.history.start();
        return appRouter;
    };

    return { initialize: initialize};
});


