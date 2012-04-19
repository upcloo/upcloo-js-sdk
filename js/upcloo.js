(function(global){
	
	var upCloo = {
		'name' :'upCloo',
		'version' : 1,
		
	};
	
	if( global.hasOwnProperty('upCloo') ){ throw 'global upCloo var already defined !'; } 
	global.upCloo = upCloo;

})(window == undefined ? this : window);
(function(global){
	
	var _bind = function(elem,type,eventHandle){
		//handle ie && standard evt handling
		if ( elem.addEventListener ) {
			elem.addEventListener( type, eventHandle, false );
		} else if ( elem.attachEvent ) {
			elem.attachEvent( "on" + type, eventHandle );
		}
	};
	var _jsonp = function(url,q,callback){
		
	}
	// adapted form jQuery.fn.offset see http://ejohn.org/blog/getboundingclientrect-is-awesome/
	var _getOffset = function (elem, doc, docElem) {
	    try {
	        box = elem.getBoundingClientRect();
	    } catch(e) {}
	    
	    if (!box) {
	        return  { top: 0,left: 0 };
	    }
	    var body = doc.body,
	        win = document.defaultView || document.parentWindow,
	        clientTop = docElem.clientTop || body.clientTop || 0,
	        clientLeft = docElem.clientLeft || body.clientLeft || 0,
	        scrollTop = win.pageYOffset ||  docElem.scrollTop || body.scrollTop,
	        scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft,
	        top = box.top + scrollTop - clientTop,
	        left = box.left + scrollLeft - clientLeft;

	    return {
	        top: top,
	        left: left,
	        width: box.width,
	        height: box.height
	    };
	};
	var _getCurStyle = function(el,styleProp){
		if (el.currentStyle)
	        var y = el.currentStyle[styleProp];
	    else if (window.getComputedStyle)
	        var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
	    return y;
	}

	if(global.hasOwnProperty('upCloo')){
		upCloo['utils'] = {
			'curStyle'  : _getCurStyle,
			'getOffset' : _getOffset,
			'bind'		: _bind	
		};
	}
})(window == undefined ? this : window);
(function(global){
	var guid = 0;
	
	var _autocomplete = function (selector){
			guid++;
			return new _autocomplete.fn.init(selector,guid);
		}
		_autocomplete.fn = _autocomplete.prototype = {
			'constructor': _autocomplete,
			'init':	function (el,guid){
				this.elem = el;
				this.guid = guid;
				this.createSuggestDiv();
				this.bindEvt();	
			},
			'bindEvt':function(){
				var that = this;
				upCloo.utils.bind(this.elem,'keydown',function(){
					that.showSuggest();
				});
				upCloo.utils.bind(this.elem,'blur',function(){
					that.hideSuggest();
				});
				
			},
			'createSuggestDiv':function(){
				var temp = document.createElement('ul');
					temp.className = ' upcloo_autocomplete '
					this.auto_elem = temp;
					
					document.body.appendChild(temp);
				return this;
			},
			'get2BorderAndPadding':function(el){
				var old =  upCloo.utils.curStyle(el,'width');
				el.style.width = '0px';
				acOffsetWidth = upCloo.utils.getOffset(el,document,document.documentElement).width;
				el.style.width = upCloo.utils.curStyle(el,'width');
				return acOffsetWidth;
			},
			'setAutoElemOffset':function(){
				var temp = this.auto_elem,
					inputOffset =  upCloo.utils.getOffset(this.elem,document,document.documentElement);
					wpadding = this.get2BorderAndPadding(this.auto_elem);
				temp.style.position = 'absolute';
				
				temp.style.top = inputOffset.top + inputOffset.height + 'px';
				temp.style.left = inputOffset.left + 'px';
				
				temp.style.width = (inputOffset.width - wpadding  ) + 'px';
				temp.innerHTML = 'autocomplete '+ this.guid +' list placeholder';
			},
			'showSuggest': function(){
				
				this.auto_elem.style.display = 'block';
				this.setAutoElemOffset();
			},
			'hideSuggest': function(){
				this.auto_elem.style.display = 'none';
			},
			'makeItLime': function(){
				this.auto_elem.style.border = '1px solid lime';
			}
		};
		_autocomplete.fn.init.prototype = _autocomplete.fn;
	
		if(global.hasOwnProperty('upCloo')){
			upCloo['autocomplete'] = _autocomplete;
		}
})(window == undefined ? this : window);