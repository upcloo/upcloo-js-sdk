(function(global){
	
	var upCloo = global.upCloo;
		Inline = function(elem){
		
			this.data = false;
			this.options = {};
			this.widgetElem = elem;
			
		};
	Inline.prototype = {
		'setOptions' :function(opts){
		
			this.options = opts || {};
		},
		'setData' : function(dataObj){
			this.data = dataObj;
		},
		'_makeLink':function(obj){ return '<a href="'+obj.url+'">'+obj.title+'</a>';},
		'render' : function(){
			var arr = this.data,
				tmpHeadline = document.createElement('span'),	
				tmpUl = document.createElement('ul'),
				count = 'limit' in this.options ? parseInt(this.options.limit,10) : 3 ;
				
			upCloo.utils.addClass(this.widgetElem,'upcloo-inline');
			
			if('headline' in this.options ){
				tmpHeadline.innerHTML = this.options.headline;
				upCloo.utils.addClass(tmpHeadline,'upcloo-over-title');
				this.widgetElem.appendChild(tmpHeadline);
			}
			for(var i=0; i < count; i++){
				if(arr[i] === undefined)break;
				var tmpLi = document.createElement('li');
					upCloo.utils.addClass(tmpLi,'upcloo-suggest_li');
					tmpLi.innerHTML = this._makeLink(arr[i]);
					tmpUl.appendChild(tmpLi);
			}
			this.widgetElem.appendChild(tmpUl);
		}
	};

	if('upCloo' in global){
		'widgets' in global.upCloo ? false : global.upCloo.widgets = {};
		global.upCloo.widgets.inline = function(elem){ return new Inline(elem); }
	}
})(window === undefined ? this : window);