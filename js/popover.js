(function(global){
	
	var upCloo = global.upCloo;
		popOver = function(){
			this.data = false;
			this.options = {};
			this.widgetElem = document.createElement('div');
			this.hasImage = false;
			this.widgetElemInDom = false;
			this.isAnimate = false;
		};
	popOver.prototype = {
		'setOptions' :function(opts){
			this.options = opts || {};
		},
		'setData' : function(dataObj){
			this.data = dataObj;
		},
		'_makeLink':function(obj){ 
			
			var link = document.createElement('a');
				link.setAttribute('href',obj.url),
				imageSrc = obj.image.length > 0 ? obj.image : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
				
				link.innerHTML = this.hasImage ? "<img src='"+imageSrc+"' alt='' border='0'/>" + obj.title : obj.title ;
			upCloo.utils.bind(link,'mousedown',function(){this.setAttribute('href',obj.trackUrl);});
			return link;
		},
		'_doScrollCheck': function(){
			
			var that = this;
			var handle = function(e) {
				
				var nVScroll = document.documentElement.scrollTop || document.body.scrollTop;
				nVScroll > 400 ? that.show() : false;
				nVScroll < 100 ? that.hide() : false;
			};
			that.refScrollHandler = handle;
			upCloo.utils.bind(window,'scroll',handle);
			
		},
		'hidden': function(){
			return this.widgetElem.style.display == 'none';
		},
		'show': function(){
			
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
		},
		'hide': function(){
			this.widgetElem.style.opacity = 0;
			this.widgetElem.style.filter = 'alpha(opacity=0)'
			this.widgetElem.style.display = 'none';
		},
		'setHasImage':function(yesno){
			this.hasImage = yesno;
		},
		'render' : function(){
			var arr = this.data,
				that = this,
				tmpRoot = this.widgetElem,
				tmpHeadline = document.createElement('li'),
				closeBtn = document.createElement('span'),
				tmpUl = document.createElement('ul'),
				count = 'limit' in this.options ? parseInt(this.options.limit,10) : 3 ;
			upCloo.utils.addClass(tmpRoot,'upcloo-over');
			upCloo.utils.addClass(tmpRoot,'upcloo-widget');
			//pos
			upCloo.utils.addClass(tmpRoot,'upcloo-over-' + ('pos' in this.options ? this.options.pos : 'br'));
			//theme
			upCloo.utils.addClass(tmpRoot,'upcloo-over-' + this.options.theme);
			//headline
			upCloo.utils.addClass(tmpHeadline,'upcloo-over-title');
			if(this.hasImage)upCloo.utils.addClass(this.widgetElem,'upcloo-img');
			if('headline' in this.options && this.options.headline ){
				closeBtn.innerHTML = 'x';
				upCloo.utils.bind(closeBtn,'click',function(){
					upCloo.utils.unbind(window,'scroll',that.refScrollHandler)
					tmpRoot.parentNode.removeChild(tmpRoot)
				});
				upCloo.utils.addClass(closeBtn,'upcloo-over-close');
				tmpHeadline.innerHTML = this.options.headline;
				tmpHeadline.appendChild(closeBtn);
				tmpUl.appendChild(tmpHeadline);
			}
			for(var i=0; i < count; i++){
				if(arr[i] === undefined)break;
				var tmpLi = document.createElement('li');
				
					tmpLi.appendChild(this._makeLink(arr[i]));
					tmpUl.appendChild(tmpLi);
			}
			tmpRoot.appendChild(tmpUl);
			if(!this.widgetElemInDom){
				document.getElementsByTagName('body')[0].appendChild(this.widgetElem);
				this.widgetElemInDom = true;
			} 
			this.hide();
			this._doScrollCheck();
		}
	};

	if('upCloo' in global){
		'widgets' in global.upCloo ? false : global.upCloo.widgets = {};
		global.upCloo.widgets.popOver = function(){ return new popOver(); }
	}
})(window === undefined ? this : window);