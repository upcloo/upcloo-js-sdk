(function(global){
	
	var upCloo = global.upCloo,
		popOver = function popOver(elem){return new popOver.prototype.init(elem);};

		upCloo.utils.inherit(popOver,upCloo.widgets.base);
		popOver.prototype.init = (function(superInit){ 
			return function(elem){
				this.widgetElemInDom = false;
				this.isAnimate = false;
				this.trackShow = false;
				return superInit.apply(this,[elem]);
			};
		})(popOver.prototype.init);
		
		popOver.prototype._doScrollCheck =function(){
			
			var that = this;
			var handle = function(e) {
				
				var nVScroll = document.documentElement.scrollTop || document.body.scrollTop;
				nVScroll > that.options.popIn ? that.show() : false;
				nVScroll < that.options.popOut ? that.hide() : false;
			};
			that.refScrollHandler = handle;
			upCloo.utils.bind(window,'scroll',handle);
			
		};
		popOver.prototype.hidden =function(){
			return this.widgetElem.style.display == 'none';
		};
		popOver.prototype.show = function(){
			
			var that = this;
			if(!this.isAnimate && this.hidden()){
				this.isAnimate = true;
				var opacity = 0;
				setTimeout(function me(){
					opacity += 0.1;
					that.widgetElem.style.opacity = ""+ opacity;
					that.widgetElem.style.filter = 'alpha(opacity='+opacity*100+')'
					if(opacity < 1){
						setTimeout(me,50)
					} else{
						that.isAnimate = false;
						opacity = 0;
					}
				},50)
			}
			
			this.widgetElem.style.display = 'block';
			
		};
		popOver.prototype.hide = function(){
			this.widgetElem.style.opacity = 0;
			this.widgetElem.style.filter = 'alpha(opacity=0)'
			this.widgetElem.style.display = 'none';
		};
		popOver.prototype.render = function(){
			var arr = this.data,
				that = this,
				tmpRoot = this.widgetElem,
				tmpHeadline = document.createElement('li'),
				closeBtn = document.createElement('span'),
				tmpUl = document.createElement('ul'),
				count = 'limit' in this.options ? parseInt(this.options.limit,10) : 3 ;
			
			//pos
			//upCloo.utils.addClass(tmpRoot,'upcloo-over-' + ('pos' in this.options ? this.options.pos : 'br'));
			//theme
			//upCloo.utils.addClass(tmpRoot,'upcloo-over-' + this.options.theme);
			//headline
			if('headline' in this.options && this.options.headline ){
				upCloo.utils.addClass(tmpHeadline,'upcloo-header');
				closeBtn.innerHTML = 'x';
				upCloo.utils.bind(closeBtn,'click',function(){
					upCloo.utils.unbind(window,'scroll',that.refScrollHandler)
					tmpRoot.parentNode.removeChild(tmpRoot)
				});
				upCloo.utils.addClass(closeBtn,'upcloo-header-close');
				tmpHeadline.innerHTML = this.options.headline;
				tmpHeadline.appendChild(closeBtn);
				tmpUl.appendChild(tmpHeadline);
			}
			for(var i=0; i < count; i++){
				if(arr[i] === undefined)break;

				tmpUl.appendChild(this._makeLink(arr[i]));
		
			}
			
			tmpRoot.appendChild(tmpUl);
			if(!this.widgetElemInDom){
				document.getElementsByTagName('body')[0].appendChild(this.widgetElem.parentNode.removeChild(this.widgetElem));
				this.widgetElemInDom = true;
			} 
			this.hide();
			this._doScrollCheck();
		};
		popOver.prototype.init.prototype = popOver.prototype;	

	if('upCloo' in global){
		'widgets' in global.upCloo ? false : global.upCloo.widgets = {};
		global.upCloo.widgets.popOver = popOver;
	}
})(window === undefined ? this : window);
