/**
 * Created with IntelliJ IDEA.
 * User: andrey
 * Date: 2013-09-11
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'views/archview',
    'hbs!views/home/homeTemplate'
], function ($, ArchView, template) {
    return ArchView.extend({
        model: {adjective: "awesome"},

        template: template,
        skrollParentEl: 0,

        initialize: function () {
            ArchView.prototype.initialize.apply(this); //super call


        },


        initDomHandles: function () {
            var that = this;

            this.skrollParentEl = this.$el.find('.skrollr-parent');
            /*$(window).scroll(function () {
                var scrolledVal = $(document).scrollTop().valueOf();
                if (scrolledVal >= 3000) {
                    console.log(that.skrollParentEl);
                    $(that.skrollParentEl).css({position: 'relative'});
                }
                else {
                    $(that.skrollParentEl).css({position: 'fixed'});
                }

                console.log(scrolledVal + ' = scroll value');

            });*/
        },




        render: function () {
            ArchView.prototype.render.apply(this);


            return this;

        },

        events: {
            "click .menu-btn-start": "onStart",
            "click .menu-btn-settings": "onSettings",
            "click .menu-btn-about": "onAbout",
            "click .menu-btn-rules": "onRules"

        }


    });
});