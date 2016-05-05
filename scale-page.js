(function(){
   /**
     * A small library to scale the web pages as per the screen fit.
     * It has lots of configuration options which will give you flexibility 
     * to scale the page by width or height or screen fit.
     *
     * @author Amitesh Kumar
     * 
     * @param {[type]} options [description]
     */
    function ScalePage(options){
        options = options || {};

        /**
         * Type of page scaling
         * Possible values - best-fit (default), height, width
         * best-fit : In this case plugin will try to scale the content 
         *            to fit in the current screen size
         * height : It scales the app to fit the content in the screen height
         * width  : It scales the app to fit the content in the screen width
         * @type {[type]}
         */
        var scaleBy = options.scaleBy || 'best-fit';

        /**
         * It is base fixed width of container
         * @type {[type]}
         */
        var baseWidth = options.baseWidth || 500;

        /**
         * It is base fixed height of container
         * @type {[type]}
         */
        var baseHeight = options.baseHeight || 400;

        /**
         * Option to scale the content for smaller or bigger screen.
         * small-screen : (default) Scale the content for screen 
         *                 which is smaller than the content size. For example, if we want to 
         *                 open the content on mobile devices then it will be srink to the mobile screen.
         * big-screen : If content is smaller than the current screen then scale it to fit 
         *              the screen as per the scaleBy value.
         * all-screen : Scale the content for all screen sizes.
         * @type {[type]}
         */
        var scaleContentFor = options.scaleContentFor || 'small-screen'; // 'all-screen', 'big-screen'

        /**
         * Set the content in center of page.
         * center: Set the content horizontally and vertically both.
         * center-horizontally: Set the content in center horizontally only.
         * center-vertically: Set the content in middle vertically only.
         * @type {[type]}
         */
        var position = options.position || 'center-horizontally'; // 'center', 'center-vertically'

        /**
         * Container to position
         * @type {[type]}
         */
        var containerToPosition = options.containerToPosition || 'body';

        /**
         * Container to apply scale
         * @type {[type]}
         */
        var scalingContainer = $(options.container || 'body');

        /**
         * Flag to show scale info
         * @type {[type]}
         */
        var showInfo = (options.showInfo == null || options.showInfo == undefined || 
                            options.showInfo) ? true : false;

        var $window      = $(window);
        var scaleTo      = 1;
        var scaledWidth  = 'auto';
        var scaledHeight = 'auto';

        return {
            /**
             * Set the scaling feature
             * @return {[type]} [description]
             */
            init: function(){
                var self = this;
                $(window).resize($.proxy( self.scale, self ));
                this.scale();
            },

            /**
             * Scale the page as per the given scaleBy option
             * @return {[type]} [description]
             */
            scale: function(){
                switch (scaleBy){
                    case 'width':
                        this.scaleByWidth();
                        break;
                    case 'height':
                        this.scaleByHeight();
                        break;
                    case 'best-fit':
                        this.scaleByBestFit();
                        break;

                    default:
                        scaleBy = 'best-fit';
                        this.scaleByBestFit();
                }

                this.setScale();
                if(showInfo){
                    this.showInfo();
                }
            },

            /**
             * Scale the app to fit into the current width
             * @return {[type]} [description]
             */
            scaleByWidth: function(){
                var ww = $window.width();
                var wh = $window.height();

                scaleTo      = 1;
                scaledWidth  = 'auto';
                scaledHeight = 'auto';

                if(scaleContentFor !== 'big-screen' && ww < baseWidth){
                    scaleTo      = ww / baseWidth;
                    scaledHeight = baseHeight * scaleTo;
                }else if(scaleContentFor !== 'small-screen'){
                    scaleTo      = ww / baseWidth;
                    scaledHeight = baseHeight * scaleTo;
                    scalingContainer.css('width', baseWidth);
                }else{
                    // Leave it as normal
                }

                if(wh > scaledHeight){
                    scalingContainer.css('overflow-y', 'hidden');
                }else{
                    scalingContainer.css('overflow-y', 'auto');
                }
                scalingContainer.css('overflow-x', 'hidden');
            },

            /**
             * Scale the app to fit into the current height
             * @return {[type]} [description]
             */
            scaleByHeight: function(){
                var ww = $window.width();
                var wh = $window.height();

                scaleTo      = 1;
                scaledWidth  = 'auto';
                scaledHeight = 'auto';

                if(scaleContentFor !== 'big-screen' && wh < baseHeight){
                    scaleTo     = wh / baseHeight;
                    scaledWidth = baseWidth * scaleTo;
                }else if(scaleContentFor !== 'small-screen'){
                    scaleTo     = wh / baseHeight;
                    scaledWidth = baseWidth * scaleTo;
                    scalingContainer.css('height', baseHeight);
                }else{
                    // Leave it as normal
                }

                if(ww > scaledWidth){
                    scalingContainer.css('overflow-x', 'hidden');
                }else{
                    scalingContainer.css('overflow-x', 'auto');
                }
                scalingContainer.css('overflow-y', 'hidden');
            },

            /**
             * Scale the app to fit into the current screen size
             * @return {[type]} [description]
             */
            scaleByBestFit: function(){
                var ww = $window.width();
                var wh = $window.height();

                scaleTo      = 1;
                scaledWidth  = 'auto';
                scaledHeight = 'auto';

                // compare ratios
                if (ww / wh < baseWidth / baseHeight) { // tall ratio
                    scaleTo     = ww / baseWidth;
                    scaledWidth = baseWidth;
                } else { // wide ratio
                    scaleTo      = wh / baseHeight;
                    scaledHeight = baseHeight;
                }

                scalingContainer.css('overflow', 'hidden');
            },

            setScale: function(){
                scalingContainer.css('transform', 'scale(' + scaleTo + ',' + scaleTo + ')');
                scalingContainer.css('transform-origin', '0 0');
                scalingContainer.css('min-width', baseWidth);
                scalingContainer.css('min-height', baseHeight);

                // Set the scaling factor to the element.
                scalingContainer.data('scale-factor', scaleTo);

                if(scaleBy == 'best-fit' || scaleBy == 'height'){
                    this.setCenterPosition();
                }
            },

            /**
             * An Api to get the current scale factor
             * @return {[type]} [description]
             */
            getScaleFactor: function(){
                return scaleTo;
            },

            keepOriginal: function(){
                var top  = $(scalingContainer).css('margin-top');
                var left = $(scalingContainer).css('margin-left');

                var isSetOriginal = $(scalingContainer).data('margin-left') ? true : false;

                if(!isSetOriginal){
                    $(scalingContainer).data('margin-left', $(scalingContainer).css('margin-left'));
                    $(scalingContainer).data('margin-top', $(scalingContainer).css('margin-top'));
                }
            },

            clearScale: function(){
                scalingContainer.css('transform', 'none');
                scalingContainer.css('transform-origin', '0 0');
                scalingContainer.css('min-width', 'auto');
                scalingContainer.css('min-height', 'auto');

                $(scalingContainer).css('margin-top', $(scalingContainer).data('margin-top'));
                $(scalingContainer).css('margin-left', $(scalingContainer).data('margin-left'));
            },

            setCenterPosition: function(){
                this.keepOriginal();

                var ww = $window.width();
                var wh = $window.height();

                var isHorizontally = position == 'center' || position == 'center-horizontally';
                var isVertically   = position == 'center' || position == 'center-vertically';

                if(isHorizontally){
                    var marginLeft = (ww - ($(containerToPosition).width() * scaleTo )) / 2;
                    $(scalingContainer).css('margin-left', marginLeft);
                }

                if(isVertically){
                    var marginTop = (wh - ($(containerToPosition).height() * scaleTo )) / 2;
                    $(scalingContainer).css('margin-top', marginTop);
                }
            },

            showInfo: function(){
                var s = 'window =>' + $window.width() + ' x ' + $window.height();

                s = s + '<br> container =>' + document.body.offsetWidth + ' x ' + document.body.offsetHeight;
                s = s + '<br> screen =>'    + window.screen.width + ' x ' + window.screen.height;
                s = s + '<br> scale =>'     + scaleTo;
                s = s + '<br> scaleBy =>'   + scaleBy;

                if($('.scale-info').size() > 0){
                    $('.scale-info').html(s);
                }else{
                    $('<div class="scale-info"></div>').appendTo('body');
                    $('.scale-info').html(s);
                }
            }

        };
    };

    window.ScalePage = ScalePage;
})()