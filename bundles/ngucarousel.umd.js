(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.ngucarousel = global.ng.ngucarousel || {}),global.ng.core,global.ng.common));
}(this, (function (exports,_angular_core,_angular_common) { 'use strict';

var NguCarouselItemDirective = /** @class */ (function () {
    function NguCarouselItemDirective() {
    }
    NguCarouselItemDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[NguCarouselItem]'
                },] },
    ];
    /** @nocollapse */
    NguCarouselItemDirective.ctorParameters = function () { return []; };
    return NguCarouselItemDirective;
}());
var NguCarouselNextDirective = /** @class */ (function () {
    function NguCarouselNextDirective() {
    }
    NguCarouselNextDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[NguCarouselNext]'
                },] },
    ];
    /** @nocollapse */
    NguCarouselNextDirective.ctorParameters = function () { return []; };
    return NguCarouselNextDirective;
}());
var NguCarouselPrevDirective = /** @class */ (function () {
    function NguCarouselPrevDirective() {
    }
    NguCarouselPrevDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[NguCarouselPrev]'
                },] },
    ];
    /** @nocollapse */
    NguCarouselPrevDirective.ctorParameters = function () { return []; };
    return NguCarouselPrevDirective;
}());
var NguCarouselPointDirective = /** @class */ (function () {
    function NguCarouselPointDirective() {
    }
    NguCarouselPointDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[NguCarouselPoint]'
                },] },
    ];
    /** @nocollapse */
    NguCarouselPointDirective.ctorParameters = function () { return []; };
    return NguCarouselPointDirective;
}());

var NguItemComponent = /** @class */ (function () {
    function NguItemComponent() {
        this.classes = true;
    }
    NguItemComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ngu-item',
                    template: "<ng-content></ng-content>",
                    styles: ["\n    :host {\n        display: inline-block;\n        white-space: initial;\n        vertical-align: top;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    NguItemComponent.ctorParameters = function () { return []; };
    NguItemComponent.propDecorators = {
        "classes": [{ type: _angular_core.HostBinding, args: ['class.item',] },],
    };
    return NguItemComponent;
}());

var NguCarouselComponent = /** @class */ (function () {
    function NguCarouselComponent(el, renderer, platformId) {
        this.el = el;
        this.renderer = renderer;
        this.platformId = platformId;
        this.carouselLoad = new _angular_core.EventEmitter();
        this.onMove = new _angular_core.EventEmitter();
        this.pauseCarousel = false;
        this.Arr1 = Array;
        this.pointNumbers = [];
        this.data = {
            type: 'fixed',
            classText: '',
            deviceType: 'lg',
            items: 0,
            load: 0,
            deviceWidth: 0,
            carouselWidth: 0,
            itemWidth: 0,
            visibleItems: { start: 0, end: 0 },
            slideItems: 0,
            itemWidthPer: 0,
            itemLength: 0,
            currentSlide: 0,
            easing: 'cubic-bezier(0, 0, 0.2, 1)',
            speed: 400,
            transform: { xs: 0, sm: 0, md: 0, lg: 0, all: 0 },
            loop: false,
            dexVal: 0,
            touchTransform: 0,
            touch: { active: false, swipe: '', velocity: 0 },
            isEnd: false,
            isFirst: true,
            isLast: false,
            RTL: false
        };
    }
    NguCarouselComponent.prototype.ngOnChanges = function (changes) {
        // tslint:disable-next-line:no-unused-expression
        this.moveToSlide > -1 &&
            !changes.moveToSlide.firstChange &&
            this.moveTo(changes.moveToSlide.currentValue);
    };
    NguCarouselComponent.prototype.ngOnInit = function () {
        this.carousel = this.el.nativeElement;
        this.carouselMain = this.carouselMain1.nativeElement;
        this.carouselInner = this.carouselInner1.nativeElement;
        // this.carouselItems = this.carouselInner.getElementsByClassName('item');
        this.rightBtn = this.next.nativeElement;
        this.leftBtn = this.prev.nativeElement;
        this.data.type = this.userData.grid.all !== 0 ? 'fixed' : 'responsive';
        this.data.loop = this.userData.loop || false;
        this.userData.easing = this.userData.easing || 'cubic-bezier(0, 0, 0.2, 1)';
        this.data.touch.active = this.userData.touch || false;
        this.data.RTL = this.userData.RTL ? true : false;
        this.directionSym = this.data.RTL ? '' : '-';
        this.carouselSize();
        // const datas = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    };
    NguCarouselComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.listener1 = this.renderer.listen(this.leftBtn, 'click', function () {
            return _this.carouselScrollOne(0);
        });
        this.listener2 = this.renderer.listen(this.rightBtn, 'click', function () {
            return _this.carouselScrollOne(1);
        });
        this.carouselCssNode = this.createStyleElem();
        this.storeCarouselData();
        this.buttonControl();
        if (_angular_common.isPlatformBrowser(this.platformId)) {
            this.carouselInterval();
            this.onWindowScrolling();
            this.touch();
            this.listener3 = this.renderer.listen('window', 'resize', function (event) {
                _this.onResizing(event);
            });
        }
        this.items.changes.subscribe(function (val) {
            _this.data.isLast = false;
            _this.carouselPoint();
            _this.buttonControl();
        });
        // tslint:disable-next-line:no-unused-expression
        this.moveToSlide > -1 && this.moveTo(this.moveToSlide);
    };
    NguCarouselComponent.prototype.ngAfterViewInit = function () {
        if (this.userData.point.pointStyles) {
            var datas = this.userData.point.pointStyles.replace(/.ngucarouselPoint/g, "." + this.data.classText + " .ngucarouselPoint");
            this.createStyleElem(datas);
        }
        else if (this.userData.point && this.userData.point.visible) {
            this.renderer.addClass(this.pointMain.nativeElement, 'ngucarouselPointDefault');
        }
    };
    NguCarouselComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.carouselInt);
        // tslint:disable-next-line:no-unused-expression
        this.itemsSubscribe && this.itemsSubscribe.unsubscribe();
        // remove listeners
        this.listener1();
        this.listener2();
        if (this.listener3) {
            this.listener3();
        }
        if (this.listener4) {
            this.listener4();
        }
        if (this.listener5) {
            this.listener5();
        }
        if (this.listener6) {
            this.listener6();
        }
        if (this.listener7) {
            this.listener7();
        }
        if (this.listener8) {
            this.listener8();
        }
    };
    NguCarouselComponent.prototype.onResizing = function (event) {
        var _this = this;
        clearTimeout(this.onResize);
        this.onResize = setTimeout(function () {
            // tslint:disable-next-line:no-unused-expression
            // tslint:disable-next-line:no-unused-expression
            _this.data.deviceWidth !== event.target.outerWidth &&
                _this.storeCarouselData();
        }, 500);
    };
    /* Get Touch input */
    /* Get Touch input */
    NguCarouselComponent.prototype.touch = /* Get Touch input */
    function () {
        var _this = this;
        if (this.userData.touch) {
            var hammertime = new Hammer(this.carouselInner);
            hammertime.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
            hammertime.on('panstart', function (ev) {
                _this.data.carouselWidth = _this.carouselInner.offsetWidth;
                _this.data.touchTransform = _this.data.transform[_this.data.deviceType];
                _this.data.dexVal = 0;
                _this.setStyle(_this.carouselInner, 'transition', '');
            });
            hammertime.on('panleft', function (ev) {
                _this.touchHandling('panleft', ev);
            });
            hammertime.on('panright', function (ev) {
                _this.touchHandling('panright', ev);
            });
            hammertime.on('panend', function (ev) {
                // this.setStyle(this.carouselInner, 'transform', '');
                // this.setStyle(this.carouselInner, 'transform', '');
                _this.data.touch.velocity = ev.velocity;
                var direc = 0;
                if (!_this.data.RTL) {
                    direc = _this.data.touch.swipe === 'panright' ? 0 : 1;
                }
                else {
                    direc = _this.data.touch.swipe === 'panright' ? 1 : 0;
                }
                _this.carouselScrollOne(direc);
            });
            hammertime.on("hammer.input", function (ev) {
                // allow nested touch events to no propagate, this may have other side affects but works for now.
                // TODO: It is probably better to check the source element of the event and only apply the handle to the correct carousel
                ev.srcEvent.stopPropagation();
            });
        }
    };
    /* handle touch input */
    /* handle touch input */
    NguCarouselComponent.prototype.touchHandling = /* handle touch input */
    function (e, ev) {
        // vertical touch events seem to cause to panstart event with an odd delta
        // and a center of {x:0,y:0} so this will ignore them
        if (ev.center.x === 0) {
            return;
        }
        ev = Math.abs(ev.deltaX);
        var valt = ev - this.data.dexVal;
        valt =
            this.data.type === 'responsive'
                ? Math.abs(ev - this.data.dexVal) / this.data.carouselWidth * 100
                : valt;
        this.data.dexVal = ev;
        this.data.touch.swipe = e;
        if (!this.data.RTL) {
            this.data.touchTransform =
                e === 'panleft'
                    ? valt + this.data.touchTransform
                    : this.data.touchTransform - valt;
        }
        else {
            this.data.touchTransform =
                e === 'panright'
                    ? valt + this.data.touchTransform
                    : this.data.touchTransform - valt;
        }
        if (this.data.touchTransform > 0) {
            this.setStyle(this.carouselInner, 'transform', this.data.type === 'responsive'
                ? "translate3d(" + this.directionSym + this.data.touchTransform + "%, 0px, 0px)"
                : "translate3d(" + this.directionSym + this.data.touchTransform + "px, 0px, 0px)");
        }
        else {
            this.data.touchTransform = 0;
        }
    };
    /* this used to disable the scroll when it is not on the display */
    /* this used to disable the scroll when it is not on the display */
    NguCarouselComponent.prototype.onWindowScrolling = /* this used to disable the scroll when it is not on the display */
    function () {
        var top = this.carousel.offsetTop;
        var scrollY = window.scrollY;
        var heightt = window.innerHeight;
        var carouselHeight = this.carousel.offsetHeight;
        if (top <= scrollY + heightt - carouselHeight / 4 &&
            top + carouselHeight / 2 >= scrollY) {
            this.carouselIntervalEvent(0);
        }
        else {
            this.carouselIntervalEvent(1);
        }
    };
    /* store data based on width of the screen for the carousel */
    /* store data based on width of the screen for the carousel */
    NguCarouselComponent.prototype.storeCarouselData = /* store data based on width of the screen for the carousel */
    function () {
        if (_angular_common.isPlatformBrowser(this.platformId)) {
            this.data.deviceWidth = window.innerWidth;
        }
        else {
            this.data.deviceWidth = 1200;
        }
        this.data.carouselWidth = this.carouselMain.offsetWidth;
        if (this.data.type === 'responsive') {
            this.data.deviceType =
                this.data.deviceWidth >= 1200
                    ? 'lg'
                    : this.data.deviceWidth >= 992
                        ? 'md'
                        : this.data.deviceWidth >= 768 ? 'sm' : 'xs';
            this.data.items = this.userData.grid[this.data.deviceType];
            this.data.itemWidth = this.data.carouselWidth / this.data.items;
        }
        else {
            this.data.items = Math.trunc(this.data.carouselWidth / this.userData.grid.all);
            this.data.itemWidth = this.userData.grid.all;
            this.data.deviceType = 'all';
        }
        this.data.slideItems = +(this.userData.slide < this.data.items
            ? this.userData.slide
            : this.data.items);
        this.data.load =
            this.userData.load >= this.data.slideItems
                ? this.userData.load
                : this.data.slideItems;
        this.userData.speed =
            this.userData.speed || this.userData.speed > -1
                ? this.userData.speed
                : 400;
        this.carouselPoint();
    };
    /* Init carousel point */
    /* Init carousel point */
    NguCarouselComponent.prototype.carouselPoint = /* Init carousel point */
    function () {
        // if (this.userData.point.visible === true) {
        var Nos = this.items.length - (this.data.items - this.data.slideItems);
        this.pointIndex = Math.ceil(Nos / this.data.slideItems);
        var pointers = [];
        if (this.pointIndex > 1 || !this.userData.point.hideOnSingleSlide) {
            for (var i = 0; i < this.pointIndex; i++) {
                pointers.push(i);
            }
        }
        this.pointNumbers = pointers;
        this.carouselPointActiver();
        if (this.pointIndex <= 1) {
            this.btnBoolean(1, 1);
        }
        else {
            if (this.data.currentSlide === 0 && !this.data.loop) {
                this.btnBoolean(1, 0);
            }
            else {
                this.btnBoolean(0, 0);
            }
        }
        this.buttonControl();
        // }
    };
    /* change the active point in carousel */
    /* change the active point in carousel */
    NguCarouselComponent.prototype.carouselPointActiver = /* change the active point in carousel */
    function () {
        var i = Math.ceil(this.data.currentSlide / this.data.slideItems);
        this.pointers = i;
    };
    /* this function is used to scoll the carousel when point is clicked */
    /* this function is used to scoll the carousel when point is clicked */
    NguCarouselComponent.prototype.moveTo = /* this function is used to scoll the carousel when point is clicked */
    function (index) {
        if (this.pointers !== index && index < this.pointIndex) {
            var slideremains = 0;
            var btns = this.data.currentSlide < index ? 1 : 0;
            if (index === 0) {
                this.btnBoolean(1, 0);
                slideremains = index * this.data.slideItems;
            }
            else if (index === this.pointIndex - 1) {
                this.btnBoolean(0, 1);
                slideremains = this.items.length - this.data.items;
            }
            else {
                this.btnBoolean(0, 0);
                slideremains = index * this.data.slideItems;
            }
            this.carouselScrollTwo(btns, slideremains, this.data.speed);
        }
    };
    /* set the style of the carousel based the inputs data */
    /* set the style of the carousel based the inputs data */
    NguCarouselComponent.prototype.carouselSize = /* set the style of the carousel based the inputs data */
    function () {
        this.data.classText = this.generateID();
        var dism = '';
        var styleid = '.' + this.data.classText + ' > .ngucarousel > .ngucarousel-inner > .ngucarousel-items >';
        if (this.userData.custom === 'banner') {
            this.renderer.addClass(this.carousel, 'banner');
        }
        if (this.userData.animation === 'lazy') {
            dism += styleid + " .item {transition: transform .6s ease;}";
        }
        var itemStyle = '';
        if (this.data.type === 'responsive') {
            var itemWidth_xs = this.userData.type === 'mobile'
                ? styleid + " .item {width: " + 95 / +this.userData.grid.xs + "%}"
                : styleid + " .item {width: " + 100 / +this.userData.grid.xs + "%}";
            var itemWidth_sm = styleid + ' .item {width: ' + 100 / +this.userData.grid.sm + '%}';
            var itemWidth_md = styleid + ' .item {width: ' + 100 / +this.userData.grid.md + '%}';
            var itemWidth_lg = styleid + ' .item {width: ' + 100 / +this.userData.grid.lg + '%}';
            itemStyle = "@media (max-width:767px){" + itemWidth_xs + "}\n                    @media (min-width:768px){" + itemWidth_sm + "}\n                    @media (min-width:992px){" + itemWidth_md + "}\n                    @media (min-width:1200px){" + itemWidth_lg + "}";
        }
        else {
            itemStyle = styleid + " .item {width: " + this.userData.grid.all + "px}";
        }
        this.renderer.addClass(this.carousel, this.data.classText);
        this.data.RTL &&
            this.renderer.addClass(this.carousel, 'ngurtl');
        this.createStyleElem(dism + " " + itemStyle);
    };
    /* logic to scroll the carousel step 1 */
    /* logic to scroll the carousel step 1 */
    NguCarouselComponent.prototype.carouselScrollOne = /* logic to scroll the carousel step 1 */
    function (Btn) {
        var itemSpeed = this.data.speed;
        var translateXval, currentSlide = 0;
        var touchMove = Math.ceil(this.data.dexVal / this.data.itemWidth);
        this.setStyle(this.carouselInner, 'transform', '');
        if (this.pointIndex === 1) {
            return;
        }
        else if (Btn === 0 &&
            ((!this.data.loop && !this.data.isFirst) || this.data.loop)) {
            var slide = this.data.slideItems * this.pointIndex;
            var currentSlideD = this.data.currentSlide - this.data.slideItems;
            var MoveSlide = currentSlideD + this.data.slideItems;
            this.btnBoolean(0, 1);
            if (this.data.currentSlide === 0) {
                currentSlide = this.items.length - this.data.items;
                itemSpeed = 400;
                this.btnBoolean(0, 1);
            }
            else if (this.data.slideItems >= MoveSlide) {
                currentSlide = translateXval = 0;
                this.btnBoolean(1, 0);
            }
            else {
                this.btnBoolean(0, 0);
                if (touchMove > this.data.slideItems) {
                    currentSlide = this.data.currentSlide - touchMove;
                    itemSpeed = 200;
                }
                else {
                    currentSlide = this.data.currentSlide - this.data.slideItems;
                }
            }
            this.carouselScrollTwo(Btn, currentSlide, itemSpeed);
        }
        else if (Btn === 1 && ((!this.data.loop && !this.data.isLast) || this.data.loop)) {
            if (this.items.length <=
                this.data.currentSlide + this.data.items + this.data.slideItems &&
                !this.data.isLast) {
                currentSlide = this.items.length - this.data.items;
                this.btnBoolean(0, 1);
            }
            else if (this.data.isLast) {
                currentSlide = translateXval = 0;
                itemSpeed = 400;
                this.btnBoolean(1, 0);
            }
            else {
                this.btnBoolean(0, 0);
                if (touchMove > this.data.slideItems) {
                    currentSlide =
                        this.data.currentSlide +
                            this.data.slideItems +
                            (touchMove - this.data.slideItems);
                    itemSpeed = 200;
                }
                else {
                    currentSlide = this.data.currentSlide + this.data.slideItems;
                }
            }
            this.carouselScrollTwo(Btn, currentSlide, itemSpeed);
        }
        // cubic-bezier(0.15, 1.04, 0.54, 1.13)
    };
    /* logic to scroll the carousel step 2 */
    /* logic to scroll the carousel step 2 */
    NguCarouselComponent.prototype.carouselScrollTwo = /* logic to scroll the carousel step 2 */
    function (Btn, currentSlide, itemSpeed) {
        // tslint:disable-next-line:no-unused-expression
        this.userData.animation &&
            this.carouselAnimator(Btn, currentSlide + 1, currentSlide + this.data.items, itemSpeed, Math.abs(this.data.currentSlide - currentSlide));
        if (this.data.dexVal !== 0) {
            var val = Math.abs(this.data.touch.velocity);
            var somt = Math.floor(this.data.dexVal /
                val /
                this.data.dexVal *
                (this.data.deviceWidth - this.data.dexVal));
            somt = somt > itemSpeed ? itemSpeed : somt;
            itemSpeed = somt < 200 ? 200 : somt;
            this.data.dexVal = 0;
        }
        this.setStyle(this.carouselInner, 'transition', "transform " + itemSpeed + "ms " + this.userData.easing);
        this.data.itemLength = this.items.length;
        this.transformStyle(currentSlide);
        this.data.currentSlide = currentSlide;
        this.onMove.emit(this.data);
        this.carouselPointActiver();
        this.carouselLoadTrigger();
        this.buttonControl();
    };
    /* boolean function for making isFirst and isLast */
    /* boolean function for making isFirst and isLast */
    NguCarouselComponent.prototype.btnBoolean = /* boolean function for making isFirst and isLast */
    function (first, last) {
        this.data.isFirst = first ? true : false;
        this.data.isLast = last ? true : false;
    };
    /* set the transform style to scroll the carousel  */
    /* set the transform style to scroll the carousel  */
    NguCarouselComponent.prototype.transformStyle = /* set the transform style to scroll the carousel  */
    function (slide) {
        var slideCss = '';
        if (this.data.type === 'responsive') {
            this.data.transform.xs = 100 / this.userData.grid.xs * slide;
            this.data.transform.sm = 100 / this.userData.grid.sm * slide;
            this.data.transform.md = 100 / this.userData.grid.md * slide;
            this.data.transform.lg = 100 / this.userData.grid.lg * slide;
            slideCss = "@media (max-width: 767px) {\n              ." + this.data
                .classText + " > .ngucarousel > .ngucarousel-inner > .ngucarousel-items { transform: translate3d(" + this.directionSym + this
                .data.transform.xs + "%, 0, 0); } }\n            @media (min-width: 768px) {\n              ." + this.data
                .classText + " > .ngucarousel > .ngucarousel-inner > .ngucarousel-items { transform: translate3d(" + this.directionSym + this
                .data.transform.sm + "%, 0, 0); } }\n            @media (min-width: 992px) {\n              ." + this.data
                .classText + " > .ngucarousel > .ngucarousel-inner > .ngucarousel-items { transform: translate3d(" + this.directionSym + this
                .data.transform.md + "%, 0, 0); } }\n            @media (min-width: 1200px) {\n              ." + this.data
                .classText + " > .ngucarousel > .ngucarousel-inner > .ngucarousel-items { transform: translate3d(" + this.directionSym + this
                .data.transform.lg + "%, 0, 0); } }";
        }
        else {
            this.data.transform.all = this.userData.grid.all * slide;
            slideCss = "." + this.data
                .classText + " > .ngucarousel > .ngucarousel-inner > .ngucarousel-items { transform: translate3d(" + this.directionSym + this.data
                .transform.all + "px, 0, 0);";
        }
        // this.renderer.createText(this.carouselCssNode, slideCss);
        this.carouselCssNode.innerHTML = slideCss;
    };
    /* this will trigger the carousel to load the items */
    /* this will trigger the carousel to load the items */
    NguCarouselComponent.prototype.carouselLoadTrigger = /* this will trigger the carousel to load the items */
    function () {
        if (typeof this.userData.load === 'number') {
            // tslint:disable-next-line:no-unused-expression
            this.items.length - this.data.load <=
                this.data.currentSlide + this.data.items &&
                this.carouselLoad.emit(this.data.currentSlide);
        }
    };
    /* generate Class for each carousel to set specific style */
    /* generate Class for each carousel to set specific style */
    NguCarouselComponent.prototype.generateID = /* generate Class for each carousel to set specific style */
    function () {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return "ngucarousel" + text;
    };
    /* handle the auto slide */
    /* handle the auto slide */
    NguCarouselComponent.prototype.carouselInterval = /* handle the auto slide */
    function () {
        var _this = this;
        if (typeof this.userData.interval === 'number' && this.data.loop) {
            this.listener4 = this.renderer.listen(this.carouselMain, 'touchstart', function () {
                _this.carouselIntervalEvent(1);
            });
            this.listener5 = this.renderer.listen(this.carouselMain, 'touchend', function () {
                _this.carouselIntervalEvent(0);
            });
            this.listener6 = this.renderer.listen(this.carouselMain, 'mouseenter', function () {
                _this.carouselIntervalEvent(1);
            });
            this.listener7 = this.renderer.listen(this.carouselMain, 'mouseleave', function () {
                _this.carouselIntervalEvent(0);
            });
            this.listener8 = this.renderer.listen('window', 'scroll', function () {
                clearTimeout(_this.onScrolling);
                _this.onScrolling = setTimeout(function () {
                    _this.onWindowScrolling();
                }, 600);
            });
            this.carouselInt = setInterval(function () {
                // tslint:disable-next-line:no-unused-expression
                !_this.pauseCarousel && _this.carouselScrollOne(1);
            }, this.userData.interval);
        }
    };
    /* pause interval for specific time */
    /* pause interval for specific time */
    NguCarouselComponent.prototype.carouselIntervalEvent = /* pause interval for specific time */
    function (ev) {
        var _this = this;
        this.evtValue = ev;
        if (this.evtValue === 0) {
            clearTimeout(this.pauseInterval);
            this.pauseInterval = setTimeout(function () {
                // tslint:disable-next-line:no-unused-expression
                // tslint:disable-next-line:no-unused-expression
                _this.evtValue === 0 && (_this.pauseCarousel = false);
            }, this.userData.interval);
        }
        else {
            this.pauseCarousel = true;
        }
    };
    /* animate the carousel items */
    /* animate the carousel items */
    NguCarouselComponent.prototype.carouselAnimator = /* animate the carousel items */
    function (direction, start, end, speed, length) {
        var _this = this;
        var val = length < 5 ? length : 5;
        val = val === 1 ? 3 : val;
        var itemList = this.items.toArray();
        if (direction === 1) {
            for (var i = start - 1; i < end; i++) {
                val = val * 2;
                // tslint:disable-next-line:no-unused-expression
                itemList[i] && this.setStyle(itemList[i].nativeElement, 'transform', "translate3d(" + val + "px, 0, 0)");
            }
        }
        else {
            for (var i = end - 1; i >= start - 1; i--) {
                val = val * 2;
                // tslint:disable-next-line:no-unused-expression
                itemList[i] && this.setStyle(itemList[i].nativeElement, 'transform', "translate3d(-" + val + "px, 0, 0)");
            }
        }
        setTimeout(function () {
            _this.items.forEach(function (elem) {
                return _this.setStyle(elem.nativeElement, 'transform', "translate3d(0, 0, 0)");
            });
        }, speed * .7);
    };
    /* control button for loop */
    /* control button for loop */
    NguCarouselComponent.prototype.buttonControl = /* control button for loop */
    function () {
        if (!this.data.loop || (this.data.isFirst && this.data.isLast)) {
            this.setStyle(this.leftBtn, 'display', this.data.isFirst ? 'none' : 'block');
            this.setStyle(this.rightBtn, 'display', this.data.isLast ? 'none' : 'block');
        }
        else {
            this.setStyle(this.leftBtn, 'display', 'block');
            this.setStyle(this.rightBtn, 'display', 'block');
        }
    };
    /** Short form for setElementStyle */
    /** Short form for setElementStyle */
    NguCarouselComponent.prototype.setStyle = /** Short form for setElementStyle */
    function (el, prop, val) {
        this.renderer.setStyle(el, prop, val);
    };
    /** For generating style tag */
    /** For generating style tag */
    NguCarouselComponent.prototype.createStyleElem = /** For generating style tag */
    function (datas) {
        var styleItem = this.renderer.createElement('style');
        if (datas) {
            var styleText = this.renderer.createText(datas);
            this.renderer.appendChild(styleItem, styleText);
        }
        this.renderer.appendChild(this.carousel, styleItem);
        return styleItem;
    };
    NguCarouselComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'ngu-carousel',
                    template: "<div #ngucarousel class=\"ngucarousel\"><div #forTouch class=\"ngucarousel-inner\"><div #nguitems class=\"ngucarousel-items\"><ng-content select=\"[NguCarouselItem]\"></ng-content></div><div style=\"clear: both\"></div></div><ng-content select=\"[NguCarouselPrev]\"></ng-content><ng-content select=\"[NguCarouselNext]\"></ng-content></div><div #points *ngIf=\"userData.point.visible\"><ul class=\"ngucarouselPoint\"><li #pointInner *ngFor=\"let i of pointNumbers; let i = index\" [class.active]=\"i==pointers\" (click)=\"moveTo(i)\"></li></ul></div>",
                    styles: ["\n    :host {\n      display: block;\n      position: relative;\n    }\n\n    :host.ngurtl {\n      direction: rtl;\n    }\n\n    .ngucarousel .ngucarousel-inner {\n      position: relative;\n      overflow: hidden;\n    }\n    .ngucarousel .ngucarousel-inner .ngucarousel-items {\n      white-space: nowrap;\n      position: relative;\n    }\n\n    .banner .ngucarouselPointDefault .ngucarouselPoint {\n      position: absolute;\n      width: 100%;\n      bottom: 20px;\n    }\n    .banner .ngucarouselPointDefault .ngucarouselPoint li {\n      background: rgba(255, 255, 255, 0.55);\n    }\n    .banner .ngucarouselPointDefault .ngucarouselPoint li.active {\n      background: white;\n    }\n    .banner .ngucarouselPointDefault .ngucarouselPoint li:hover {\n      cursor: pointer;\n    }\n\n    .ngucarouselPointDefault .ngucarouselPoint {\n      list-style-type: none;\n      text-align: center;\n      padding: 12px;\n      margin: 0;\n      white-space: nowrap;\n      overflow: auto;\n      box-sizing: border-box;\n    }\n    .ngucarouselPointDefault .ngucarouselPoint li {\n      display: inline-block;\n      border-radius: 50%;\n      background: rgba(0, 0, 0, 0.55);\n      padding: 4px;\n      margin: 0 4px;\n      transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);\n      transition: 0.4s;\n    }\n    .ngucarouselPointDefault .ngucarouselPoint li.active {\n      background: #6b6b6b;\n      transform: scale(1.8);\n    }\n    .ngucarouselPointDefault .ngucarouselPoint li:hover {\n      cursor: pointer;\n    }\n\n  "]
                },] },
    ];
    /** @nocollapse */
    NguCarouselComponent.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.Renderer2, },
        { type: Object, decorators: [{ type: _angular_core.Inject, args: [_angular_core.PLATFORM_ID,] },] },
    ]; };
    NguCarouselComponent.propDecorators = {
        "userData": [{ type: _angular_core.Input, args: ['inputs',] },],
        "moveToSlide": [{ type: _angular_core.Input, args: ['moveToSlide',] },],
        "carouselLoad": [{ type: _angular_core.Output, args: ['carouselLoad',] },],
        "onMove": [{ type: _angular_core.Output, args: ['onMove',] },],
        "items": [{ type: _angular_core.ContentChildren, args: [NguCarouselItemDirective, { read: _angular_core.ElementRef },] },],
        "points": [{ type: _angular_core.ViewChildren, args: ['pointInner', { read: _angular_core.ElementRef },] },],
        "next": [{ type: _angular_core.ContentChild, args: [NguCarouselNextDirective, { read: _angular_core.ElementRef },] },],
        "prev": [{ type: _angular_core.ContentChild, args: [NguCarouselPrevDirective, { read: _angular_core.ElementRef },] },],
        "carouselMain1": [{ type: _angular_core.ViewChild, args: ['ngucarousel', { read: _angular_core.ElementRef },] },],
        "carouselInner1": [{ type: _angular_core.ViewChild, args: ['nguitems', { read: _angular_core.ElementRef },] },],
        "carousel1": [{ type: _angular_core.ViewChild, args: ['main', { read: _angular_core.ElementRef },] },],
        "pointMain": [{ type: _angular_core.ViewChild, args: ['points', { read: _angular_core.ElementRef },] },],
        "forTouch": [{ type: _angular_core.ViewChild, args: ['forTouch', { read: _angular_core.ElementRef },] },],
    };
    return NguCarouselComponent;
}());

var NguTileComponent = /** @class */ (function () {
    function NguTileComponent() {
        this.classes = true;
    }
    NguTileComponent.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: 'ngu-tile',
                    template: "<div class=\"tile\"><ng-content></ng-content></div>",
                    styles: ["\n    :host {\n        display: inline-block;\n        white-space: initial;\n        padding: 10px;\n        box-sizing: border-box;\n        vertical-align: top;\n    }\n\n    .tile {\n        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n    }\n\n    * {\n        box-sizing: border-box;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    NguTileComponent.ctorParameters = function () { return []; };
    NguTileComponent.propDecorators = {
        "classes": [{ type: _angular_core.HostBinding, args: ['class.item',] },],
    };
    return NguTileComponent;
}());

var NguCarouselModule = /** @class */ (function () {
    function NguCarouselModule() {
    }
    NguCarouselModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule],
                    exports: [
                        NguCarouselComponent,
                        NguItemComponent,
                        NguTileComponent,
                        NguCarouselPointDirective,
                        NguCarouselItemDirective,
                        NguCarouselNextDirective,
                        NguCarouselPrevDirective
                    ],
                    declarations: [
                        NguCarouselComponent,
                        NguItemComponent,
                        NguTileComponent,
                        NguCarouselPointDirective,
                        NguCarouselItemDirective,
                        NguCarouselNextDirective,
                        NguCarouselPrevDirective
                    ],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    NguCarouselModule.ctorParameters = function () { return []; };
    return NguCarouselModule;
}());

var NguCarouselStore = /** @class */ (function () {
    function NguCarouselStore() {
    }
    return NguCarouselStore;
}());
var NguCarousel = /** @class */ (function () {
    function NguCarousel() {
    }
    return NguCarousel;
}());

exports.NguCarouselModule = NguCarouselModule;
exports.NguCarousel = NguCarousel;
exports.NguCarouselStore = NguCarouselStore;

Object.defineProperty(exports, '__esModule', { value: true });

})));
