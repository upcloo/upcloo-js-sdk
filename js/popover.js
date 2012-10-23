
(function(global){
	
	var upCloo = global.upCloo;
		popOver = function(){
			this.data = false;
			this.options = {};
			this.widgetElem = document.createElement('div');
			this.widgetElemInDom = false;
		};
	popOver.prototype = {
		'setOptions' :function(opts){
			this.options = opts || {};
		},
		'setData' : function(dataObj){
			this.data = dataObj;
		},
		'_makeLink':function(obj){ return '<a href="'+obj.url+'">'+obj.title+'</a>';},
		'_doScrollCheck': function(){
			var that = this;
			upCloo.utils.bind(window,'scroll',function(e) {
				var nVScroll = document.documentElement.scrollTop || document.body.scrollTop;
				nVScroll > 400 ? that.show() : that.hide();
			});
		},
		'show': function(){
			this.widgetElem.style.display = 'block';
		},
		'hide': function(){
			this.widgetElem.style.display = 'none';
		},
		'render' : function(){
		
			var arr = this.data,
				tmpRoot = this.widgetElem,
				tmpHeadline = document.createElement('li'),	
				tmpUl = document.createElement('ul'),
				count = 'limit' in this.options ? parseInt(this.options.limit,10) : 3 ;
			upCloo.utils.addClass(tmpRoot,'upcloo-over');
			upCloo.utils.addClass(tmpRoot,'upcloo-over-' + ('pos' in this.options ? this.options.pos : 'br'));
			
			if('headline' in this.options && this.options.headline ){
				tmpHeadline.innerHTML = this.options.headline;
				upCloo.utils.addClass(tmpHeadline,'upcloo-over-title');
				tmpRoot.appendChild(tmpHeadline);
			}
			for(var i=0; i < count; i++){
				if(arr[i] === undefined)break;
				var tmpLi = document.createElement('li');
					upCloo.utils.addClass(tmpLi,'upcloo-suggest_li');
					tmpLi.innerHTML = this._makeLink(arr[i]);
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