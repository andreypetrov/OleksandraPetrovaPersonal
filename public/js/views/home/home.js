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

        hiLabelEl: 0,
        aboutLabelEl: 0,
        portfolioLabelEl: 0,
        contactsLabelEl: 0,

        hiNavEl: 0,
        aboutNavEl: 0,
        portfolioNavEl: 0,
        contactsNavEl: 0,
        activeNavEl: 0,

        //emailNameEl: 0,
        emailEmailEl: 0,
        emailMessageEl: 0,


        initialize: function () {
            ArchView.prototype.initialize.apply(this); //super call
        },


        initDomHandles: function () {
            this.skrollParentEl = this.$el.find('.skrollr-parent');
            this.sliderEl = this.$el.find('#slider');

            this.hiLabelEl = this.$el.find('.nav-hi').find('.label');
            this.aboutLabelEl = this.$el.find('.nav-about').find('.label');
            this.portfolioLabelEl = this.$el.find('.nav-portfolio').find('.label');
            this.contactsLabelEl = this.$el.find('.nav-contacts').find('.label');

            this.hiNavEl = this.$el.find('.nav-hi').find('a');
            this.aboutNavEl = this.$el.find('.nav-about').find('a');
            this.portfolioNavEl = this.$el.find('.nav-portfolio').find('a');
            this.contactsNavEl = this.$el.find('.nav-contacts').find('a');

            //this.emailNameEl = this.$el.find('.email-name');
            this.emailEmailEl = this.$el.find('.email-email');
            this.emailMessageEl = this.$el.find('.email-message');

            this.initNavBar();
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
        postRender: function () {
            this.initSkrollr();
            this.initNivoSlider();
        },


        initSkrollr: function () {
            var s = skrollr.init({
                forceHeight: false,
                smoothScrolling: true,
                edgeStrategy: 'set'
            });
            skrollr.menu.init(s, {
                duration: function (currentTop, targetTop) {//the duration of the animation as a function of the distance

                    var distance = Math.abs(targetTop - currentTop);
                    var speed = 2; // 2000 pixels per second

                    var time = distance / speed; // t = S/v, where
                    return time;
                },
                easing: 'linear'
            });
        },

        initNivoSlider: function () {

            $(this.sliderEl).nivoSlider({
                effect: 'slideInLeft',//,
                manualAdvance: false,
                pauseTime: 5000
            });
        },

        events: {
            "click .email-submit": "onEmailSubmit"
        },


        initNavBar: function () {
            var that = this;
            this.toggleVisibilityOfTarget(this.hiNavEl, this.hiLabelEl);
            this.toggleVisibilityOfTarget(this.aboutNavEl, this.aboutLabelEl);
            this.toggleVisibilityOfTarget(this.portfolioNavEl, this.portfolioLabelEl);
            this.toggleVisibilityOfTarget(this.contactsNavEl, this.contactsLabelEl);


        },


        /**
         * Toggle the visibility of the target element when the user hovers on the toggleButotnEl, but don't do anything if the nav button is currently active
         * @param toggleButtonEl
         * @param targetEl
         */
        toggleVisibilityOfTarget: function (toggleButtonEl, targetEl) {
            var that = this;
            toggleButtonEl.mouseenter(function () {

                if (that.getCurrentPageButton() !== toggleButtonEl) {  //only mess with the label if we are not on its page

                    targetEl.css('opacity', 1);
                }
            });
            toggleButtonEl.mouseleave(function () {
                if (that.getCurrentPageButton() !== toggleButtonEl) {  //only mess with the label if we are not on its page
                    targetEl.css('opacity', 0);
                }
            })
        },

        /**
         * Toggle the visibility of a dom element
         * @param domElement
         */
        toggleVisibility: function (domElement) {

            console.log(domElement.css('visibility'));
            if (domElement.css('opacity') == "hidden") {
                domElement.css('visibility', 'visible');
            } else {
                domElement.css('visibility', 'hidden');
            }

        },

        getCurrentPageButton: function () {
            //console.log("we are here");
            var scrollTop = skrollr.get().getScrollTop();
            console.log(scrollTop);
            if (scrollTop < 3500) return this.hiNavEl;
            if (scrollTop < 4500) return this.aboutNavEl;
            if (scrollTop < 5500) return this.portfolioNavEl;
            else return this.contactsNavEl;
        },

        onEmailSubmit: function () {              //TODO add prettier error handling
            if (this.isEmailValid(this.emailEmailEl.val())) {
                var data = JSON.stringify(this.getEmailObject());

                $.ajax({
                    type: "POST",
                    url: "/email",
                    // The key needs to match your method's input parameter (case-sensitive).
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    //dataType: "json",
                    success: function (result) {
                        alert(result);
                    },
                    failure: function (errMsg) {
                        alert(errMsg);
                    }
                });
            }  else {
                alert ("Please enter a valid email!");
            }
        },

        getEmailObject: function () {
            var emailObject = {}; //create an empty object to hold the values
            //emailObject.name = this.emailNameEl.val();
            emailObject.email = this.emailEmailEl.val();
            emailObject.message = this.emailMessageEl.val();
            return emailObject;
        },

        isEmailValid: function (email) {
            console.log(email);
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(email);
        },

        isInputValid: function() {
             if (this.emailEmailEl.val() && this.emailMessageEl.val() && this.isEmailValid()) {
                 return true;
             } else {
                 return false;
             }
        }

    });
})
;