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
    'hbs!views/home/homeTemplate',
    'nivoslider',
    'skrollr',
    'skrollrmenu'
], function ($, ArchView, template, nivoslider) {
    return ArchView.extend({
        model: {adjective: "awesome"},

        template: template,
        skrollParentEl: 0,
        sliderEl: 0,

        initialize: function () {
            ArchView.prototype.initialize.apply(this); //super call
        },


        initDomHandles: function () {
            this.skrollParentEl = this.$el.find('.skrollr-parent');
            this.sliderEl = this.$el.find('#slider');


        },


        render: function () {
            ArchView.prototype.render.apply(this);
            //activate the slider

            console.log(this.sliderEl);
            return this;

        },


        /**
         *  Always call this function after you have added this.el to the dom of the page
         */
        postRender:function() {
            this.initSkrollr();
            this.initNivoSlider();
        },


        initSkrollr: function() {
            var s = skrollr.init({
                forceHeight: false,
                smoothScrolling: true,
                edgeStrategy: 'set'
            });
            skrollr.menu.init(s, {
                duration: function(){
                  return 1500;
                },
                easing: 'linear'
            });
        },

        initNivoSlider: function() {

            $(this.sliderEl).nivoSlider({
                effect: 'slideInLeft'//,
                // manualAdvance: true
            });
        },

        events: {
            "click .menu-btn-start": "onStart",
            "click .menu-btn-settings": "onSettings",
            "click .menu-btn-about": "onAbout",
            "click .menu-btn-rules": "onRules"

        }


    });
});