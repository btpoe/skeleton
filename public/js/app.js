;
(function ($) {

	function ListingTable(wrap) {

		var table = this;
		var rows = [];
		table.wrap = $(wrap);

		var o = {
			data: [],
			rowFormat: "",
			childFormat: ""
		};

		table.init = function (options) {

			setProperties(options);

			if (table.wrap[0].listingTable) {
				return table.wrap[0].listingTable;
			}

			setMethods();
			bindEvents();

			table.wrap[0].listingTable = table;
			return table.wrap[0].listingTable
		};

		function setProperties(options) {

			o.extend(options);

		}

		function setMethods() {

			function buildRow(data, child) {
				return o[!child ? 'rowFormat' : 'childFormat'].replace(/\{\{\s*data\.([\w\d\-_]+)\s*}}/g, function(match, p1) {
					return data[p1];
				});
			}

			table.addRow = function(data, index, child) {
				if (child) {

				}
				else {
					rows.splice(index, 0, buildRow(data, child));
				}
			};

			table.openChild = function(index) {
				table.addRow(rows[index], index, true);
				rows[index].childOpen = true;
			};

			table.closeChild = function(index) {
				if (rows[index].childOpen) {
					$('this row').next().remove();
					rows[index].childOpen = false;
				}
			}

		}

		function bindEvents() {

			var events = {
				click: function (e) {
					e.preventDefault();

					return false;
				}
			};

			table.wrap.on('click.listingTable', events.click);
		}
	}

	$.fn.listingTable = function (options) {
		return this.each(function () {
			var opts = $.extend({}, options, $(this).data('listingTable'));
			return new ListingTable(this).init(opts);
		});
	};

})(jQuery || Zepto);
var app = (function() {

	function init() {
		initFoundation();
		initStyledSelects();
		initGalleries();
		initSticky();
		initFeatures();
	}

	function initFoundation() {
		$(document).foundation();
	}

	function initStyledSelects() {
		$('select:not(.plain-select)').customSelect({camelCase: false});
	}

	function initGalleries() {
		if (Galleria && $('.gallery').length) {
			Galleria.loadTheme('/js/vendor/galleria/themes/hendrick/galleria.hendrick.js');
			Galleria.run('.gallery');
		}
	}

	function initSticky() {
		$('.fixedsticky').fixedsticky();

		var sidebar = $('.page-sidebar');
		if (false) {//(sidebar.length) {
			var sTop = sidebar.offset().top,
				clone;

			sidebar.after( clone = $('<div class="page-sidebar">')).css('position', 'fixed');
			sidebar.css({
				width: clone.outerWidth(),
				top: sidebar.offset().top + 'px',
				bottom: 0,
				zIndex: 1
			});

			FrameEvents.on(window, 'scroll', function() {
				sidebar.css('top', Math.max(95, sTop - Math.max(0, $(window).scrollTop())) + 'px');
			});
		}
	}

	function initFeatures() {

		var contentWrappers = $('.content-wrapper');
		var features = $('.feature-wrapper');

		enquire.register("screen and (max-width:22.99em)", {
			match: render
		});
		enquire.register("screen and (min-width:23em) and (max-width:40.99em)", {
			match: render
		});
		enquire.register("screen and (min-width:40em) and (max-width:55.99em)", {
			match: render
		});
		enquire.register("screen and (min-width:55em) and (max-width:71.99em)", {
			match: render
		});
		enquire.register("screen and (min-width:72em)", {
			match: render
		});

		function render() {

			features.removeClass('feature-wrapper--left feature-wrapper--right');
			$('.content-block--advertisement').remove();

			contentWrappers.each(function() {

				var wrapper = $(this);
				var wrapperWidth = $(this).width();

				$(this).find('.feature-wrapper').each(function() {
					var feature = $(this);
					var block = feature.parent();

					if (block.position().left == 0) {
						feature.addClass('feature-wrapper--left');

						if (block.prev().length && block.prev().position().left + block.prev().width() < wrapperWidth * .95) {
							block.before("<div class=\"content-block content-block--advertisement\" style=\"display: block;\"><img src=\"http://fpoimg.com/200x300?text=Sponsor\" style=\"display: block; margin: 10% auto;\" /></div>");
						}
					}

					if (block.position().left + block.width() > wrapperWidth * .95) {
						feature.addClass('feature-wrapper--right');
					}
				})
			});
		}
	}

	return {
		init: init
	};
})();

$(document).ready(function() { app.init(); });