/*!
 * jQuery Responsive Sticky footer v1.0.2
 *
 * Copyright 2016 William Belle
 * Released under the MIT license
 */

(function($, window) {
  'use strict';

  // Plugin definition
  $.fn.responsiveStickyFooter = function(opts) {

    // Extend default options with those provided
    var options = $.extend({}, $.fn.responsiveStickyFooter.defaults, opts);

    $.fn.responsiveStickyFooter.setFooterPosition(this, options.extraHeight);
    var self = this;
    $(window).scroll(function() {
      $.fn.responsiveStickyFooter.setFooterPosition(self, options.extraHeight);
    }).resize(function() {
      $.fn.responsiveStickyFooter.setFooterPosition(self, options.extraHeight);
    });

    // Chain
    return this;
  };

  // Plugin defaults
  $.fn.responsiveStickyFooter.defaults = {
    extraHeight: 0,
  };

  // Set footer position
  $.fn.responsiveStickyFooter.setFooterPosition = function(el, extraHeight) {
    var footerHeight = $(el).height();
    extraHeight = extraHeight || 0;
    var htmlHeight = $(document.body).height() + footerHeight + extraHeight;
    if (htmlHeight < $(window).height()) {
      $(el).css({position: 'absolute'});
    } else {
      $(el).css({position: 'static'});
    }
  };

})(jQuery, window);
