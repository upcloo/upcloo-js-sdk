
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
		'render' : function(){
			var arr = this.data,
				tmpRoot = this.widgetElem,
				tmpHeadline = document.createElement('li'),	
				tmpUl = document.createElement('ul');
			upCloo.utils.addClass(tmpRoot,'upcloo-over');
			upCloo.utils.addClass(tmpRoot,'upcloo-over-' + ('pos' in this.options ? this.options.pos : 'br'));
			
			if('headline' in this.options ){
				tmpHeadline.innerHTML = this.options.headline;
				upCloo.utils.addClass(tmpHeadline,'upcloo-over-title');
				tmpRoot.appendChild(tmpHeadline);
			}
			
			for(var i=0; i < arr.length; i++){
					var tmpLi = document.createElement('li');
						
					upCloo.utils.addClass(tmpLi,'upcloo-suggest_li');
					tmpLi.innerHTML = this._makeLink(arr[i]);
					tmpUl.appendChild(tmpLi);
			}
			tmpRoot.appendChild(tmpUl);
			if(!this.widgetElemInDom){
				document.getElementsByTagName('body')[0	].appendChild(this.widgetElem);
				this.widgetElemInDom = true;
			} 
		}
	};

	if('upCloo' in global){
		'widget' in global.upCloo.suggest ? false : global.upCloo.suggest.widget = {};
		global.upCloo.suggest.widget.popOver = function(){ return new popOver(); }
	}
})(window === undefined ? this : window);