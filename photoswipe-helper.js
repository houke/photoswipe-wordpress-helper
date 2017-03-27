var PhotoSwipe = require('photoswipe/dist/photoswipe.js');
var PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default.js');
var ps = (function($){

  function parseThumbnailElements(gallery, el) {
    var elements = $(gallery).find('a[data-size]').has('img'),
      galleryItems = [],
      index;

    elements.each(function(i) {
      var $el = $(this),
        size = $el.data('size').split('x'),
        caption;

      if( $el.next().is('.wp-caption-text') ) {
        caption = $el.next().text();
      } else if( $el.parent().next().is('.wp-caption-text') ) {
        caption = $el.parent().next().text();
      } else {
        caption = $el.attr('title');
      }
function parseThumbnailElements(gallery, el) {
		var elements = $(gallery).find('a[data-size]').has('img'),
			galleryItems = [],
			index;

		elements.each(function(i) {
			var $el = $(this),
				size = $el.data('size').split('x'),
				caption,
				link,
				external;

			if( $el.next().is('.c-post__subtitle') ) {
				caption = $el.next().text();
			} else if( $el.parent().next().is('.c-post__subtitle') ) {
				// gallery icon with caption
				caption = $el.parent().next().text();
			} else {
				caption = $el.attr('title');
			}

			if( $el.attr('data-link') ){
				link = $el.attr('data-link');
			}else{
				link = "";
			}
			if( $el.attr('data-external') ){
				external = $el.attr('data-external');
			}else{
				external = "";
			}

			galleryItems.push({
				src: $el.attr('data-src'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10),
				title: caption,
				link: link,
				msrc: $el.find('img').attr('src'),
				el: $el,
				external: external
			});
			if( el === $el.get(0) ) {
				index = i;
			}
		});

		return [galleryItems, parseInt(index, 10)];
	};

	function openPhotoSwipe( element, disableAnimation ) {
		var pswpElement = $('.pswp').get(0),
			galleryElement = $(element).parents('[data-photoswipe-container]').first(),
			gallery,
			options,
			items, index, color = '';
		items = parseThumbnailElements(galleryElement, element);
		index = items[1];
		items = items[0];

		options = {
			index: index,
			opacity:0,
			showHideOpacity: true,
			showAnimationDuration:0,
			history: false,
			getThumbBoundsFn: function(index) {
				var image = items[index].el.find('img'),
					offset = image.offset();
				color = $(items[index].el).data('color');
				if(color && color != ''){
					$('.pswp').css('color', color);
				}else{
					$('.pswp').css('color', '');
				}
				return {x:offset.left, y:offset.top, w:image.width()};
			},

		};

		if(disableAnimation) {
			options.showAnimationDuration = 0;
		}

		gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.listen('beforeChange', function(a,b,c) {
			color = $(gallery.currItem.el).data('color');
			if(color && color != ''){
				$('.pswp').css('color', color);
			}else{
				$('.pswp').css('color', '');
			}
		});

		PhotoSwipeGallery = gallery;
		gallery.init();
	};

	function closePhotoSwipe(){
		if(PhotoSwipeGallery != ''){
			PhotoSwipeGallery.close();
			PhotoSwipeGallery = '';
		}
	}

	return{
		open : openPhotoSwipe
	}
}(jQuery));

module.exports = ps;
