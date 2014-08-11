;activateAll = (function($, undefined){

  var _defaults = {
    linkText: Drupal.t('Alle auswählen'),
    linkWrapper: '<div class="select-all-wrapper"></div>'
  }

  function init(elements) {
    $(elements).each(function(i, element) {
       var $element = $(element);
       var $parent = $element.parent();
       insert({
         wrapper: $parent,
         target: 'select'
       })
    });
  }

  function insert(options) {
    options = $.extend({}, _defaults, options);
    var $wrappers = $(options.wrapper);
    $wrappers.each(function(i, wrapper) {
      var $wrapper = $(wrapper);
      var $link = _getLinkHtml($wrapper, options);
      $wrapper.append($link);
    });
  }

  function _getLinkHtml($wrapper, options) {
    var $link = $(options.linkWrapper);
    $link.append('<a href="#">'+options.linkText+'</a>');
    $link.find('a').bind('click', function(e) {
      e.preventDefault();
      if ($wrapper.find(options.target).is('select')) {
        _bindSelect($wrapper, options);
      }
      if ($wrapper.find(options.target).is('input[type="checkbox"]')) {
        _bindCheckbox($wrapper, options)
      }
    });
    return $link;
  }

  function _bindCheckbox($wrapper, options) {
    var $unchecked = $wrapper.find(options.target+':not([checked])');
    if ($unchecked.length == 0) {
      _uncheckAll($wrapper, options);
    } else {
      _checkAll($wrapper, options);
    }
  }

  function _checkAll($wrapper, options) {
    $wrapper.find(options.target).each(function(i, target) {
      $(target).attr('checked', 'checked');
    });
  }

  function _uncheckAll($wrapper, options) {
    $wrapper.find(options.target).each(function(i, target) {
      $(target).removeAttr('checked');
    });
  }

  function _bindSelect($wrapper, options) {
    var $select = $wrapper.find(options.target);
    var $unselected = $select.find('option:not(:selected)');
    if ($unselected.length == 0) {
      _unselectAll($select);
    } else {
      _selectAll($select);
    }
  }

  function _unselectAll($select) {
    $select.find('option').each(function(i, option) {
      $(option).removeAttr('selected');
    });
  }

  function _selectAll($select) {
    $select.find('option').each(function(i, option) {
      $(option).attr('selected', 'selected');
    })
  }

  return {
    init: init,
    insert: insert
  }
})(jQuery);

jQuery(document).ready(function() {
  activateAll.init('.activate-all-field');
});