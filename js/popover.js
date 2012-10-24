(function(global){
	
	var upCloo = global.upCloo;
		popOver = function(){
			this.data = false;
			this.options = {};
			this.widgetElem = document.createElement('div');
			this.hasImage = false;
			this.widgetElemInDom = false;
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
				hasImg = 'image' in obj  && this.hasImage && obj.image.length > 0;
			link.innerHTML = hasImg ? "<img src='"+obj.image+"' alt='' border='0'/>"+obj.title : obj.title ;
			upCloo.utils.bind(link,'mousedown',function(){this.setAttribute('href',obj.trackUrl);});
			return link;
		},
		'_doScrollCheck': function(){
			var that = this;
			upCloo.utils.bind(window,'scroll',function(e) {
				var nVScroll = document.documentElement.scrollTop || document.body.scrollTop;
				nVScroll > 400 ? that.show() : that.hide() ;
			});
		},
		'hidden': function(){
			return this.widgetElem.style.display == 'none';
		},
		'show': function(){
			this.widgetElem.style.display = 'block';
		},
		'hide': function(){
			this.widgetElem.style.display = 'none';
		},
		'setHasImage':function(yesno){
			this.hasImage = yesno;
		},
		'render' : function(){
			var arr = this.data,
				tmpRoot = this.widgetElem,
				tmpHeadline = document.createElement('li'),	
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
				tmpHeadline.innerHTML = this.options.headline;
				tmpRoot.appendChild(tmpHeadline);
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