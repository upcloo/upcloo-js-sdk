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
		var callback  = function(e){
			console.log(e.type)
			var evtObj = e || window.event;
				target = evtObj.target || evtObj.srcElement,
				returnVal = eventHandle.apply(elem,[evtObj,target]);
				
			if(!returnVal){
				if('preventDefault' in evtObj ){
					evtObj.preventDefault();
				} else{
					evtObj.returnValue = false;
					evtObj.cancelBubble = true;
				}
			
			}
			return returnVal;
		};
		
		if ( elem.addEventListener ) {
			elem.addEventListener( type,callback, false );
		} else if ( elem.attachEvent ) {
			elem.attachEvent( "on" + type, callback );
		}
	};
	var _jsonp = function(url,q,callback){
		var js = document.createElement('script'),
	    	first = document.getElementsByTagName('script')[0],
	    	uniqCallback = new Date().getTime()+''+Math.floor(Math.random() * 10e4);
		js.src = url + '?' + 'callback=upcloo_'+uniqCallback;
		global['upcloo_'+uniqCallback] = function(json){
			
			callback.call(this,json);
			
			delete global['upcloo_'+uniqCallback];
			first.parentNode.removeChild(js);
		}
		first.parentNode.insertBefore(js, first);	
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
	};
	var _hasClass = function(el,cName){
		return el.className.length > 0 && el.className.match(new RegExp("(^|\\s+)" + cName + "(\\s+|$)") );
	};
	var _addClass = function(el,cName){
		var prevClassName = el.className;
		if(!_hasClass(el,cName))el.className += ( prevClassName.substr(-1) == ' ' ? '' :' ') + cName + ' ';
		return true;
	};
	var _removeClass = function(el,cName){
		if(!el.className || el.className.length == 0)return;
		var currClassName = el.className;
		el.className = currClassName.replace(new RegExp("(^|\\s+)" + cName + "(\\s+|$)"), ' ' );
	}
	var _index = function(el){
		var n = -1;
		for (var i = el.parentNode.childNodes.length; i >= 0; i--)
		{
		    if (el.parentNode.childNodes[i] === el){n = i; break; }
		}
		return n;
	};
	
	if(global.hasOwnProperty('upCloo')){
		upCloo['utils'] = {
			'curStyle'   : _getCurStyle,
			'getOffset'  : _getOffset,
			'bind'		 : _bind,
			'jsonp'		 : _jsonp,
			'addClass'   : _addClass,
			'removeClass': _removeClass,
			'hasClass'   : _hasClass,
			'index'		 : _index
		};
	}
})(window == undefined ? this : window);
(function(global){
	var guid = 0,
		upCloo = global.upCloo,
		_defaults = {
		   jsonpBaseUrl:'http://127.0.0.1/upCloo.js/demo/autocomplete.php',
		   
		};
	var _autocomplete = function (selector){
			guid++;
			return new _autocomplete.fn.init(selector,guid);
		}
		_autocomplete.fn = _autocomplete.prototype = {
			'constructor': _autocomplete,
			'init':	function (el,guid){
				this.elem = el;
				this.guid = guid;
				this.selectedItemIdx = false;
				this.currSelected = 0;
				this.createSuggestDiv();
				this.bindEvt();
				this.searchTimeout = false;
			},
			'handleChar':function(ch){
				this.delayedComplete();
				return true;
			},
			'setSelected':function(idx){
				var liItems = this.auto_elem.childNodes;
				this.elem.value = (typeof idx == 'number' ?  liItems[idx] : idx ).innerHTML;
			},
			'handleNonChar':function(key){
				//up
				if(key == 38){
					this.currSelected--;
					this.markSelected();
					return false;
				}
				//down
				if(key == 40){
					this.currSelected++;
					this.markSelected();	
					return false;
				}
				//delete
				if(key == 8){
					this.delayedComplete();
					return true;
				}
				//enter 
				if(key == 13){
					if(this.currSelected !== false){
						this.setSelected(this.currSelected);
						this.hideSuggest();
					}
					return false;
				}
				return true;
			},
			'bindEvt':function(){
				var that = this,
					nonChar = false,
				    handleKey = function(evt) {
					    var char;
					    if (evt.type == "keydown") {
					    	char = evt.keyCode;
					        if (char <16 || (char> 16 && char <32) || 
					           (char> 32 && char <41) || char == 46) {
					        	var ret = that.handleNonChar.apply(that,[char]);
					            	nonChar = true;
					            return ret;
					        } else { nonChar = false; }
					       return true; 
					    } else { 
					    	 if (nonChar) return true;               
					        char = (evt.charCode) ?
					                   evt.charCode : evt.keyCode;
					        if (char> 31 && char <256)
					        	var ret = that.handleChar.apply(that,[char]); 
					        return ret;
					    }   
				};
				
				upCloo.utils.bind(this.elem,'keydown',handleKey);
				upCloo.utils.bind(this.elem,'keypress',handleKey);
				upCloo.utils.bind(this.elem,'blur',function(){
					that.hideSuggest();
				});
				upCloo.utils.bind(this.auto_elem,'mousedown',function(e,target){
					if( upCloo.utils.hasClass(target,'autocomplete_item') ){
						that.setSelected(target);
					}
					return true;
				});
				upCloo.utils.bind(this.auto_elem,'mousemove',function(e,target){
					if( upCloo.utils.hasClass(target,'autocomplete_item') ){
						that.currSelected = upCloo.utils.index(target);
						that.markSelected();	
					}
					return true;
				});
				
			},
			'createSuggestDiv':function(){
				var temp = document.createElement('ul');
					upCloo.utils.addClass(temp,'upcloo_autocomplete')
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
			},
			'createSuggestLi': function(arr){
				this.auto_elem.innerHTML = '';
				
				while(arr.length){
					var currSuggest = arr.pop();
					var tmpLi = document.createElement('li');
						upCloo.utils.addClass(tmpLi,'autocomplete_item');
						tmpLi.innerHTML = currSuggest;
					this.auto_elem.appendChild(tmpLi);
				}
			},
			'delayedComplete':function(){
				var that = this,
					delay = this.searchTimeout == false ? 0 :200;
				clearTimeout(this.searchTimeout);
				this.searchTimeout = setTimeout(function(){
					that.doAutocomplete();
				},delay);
			},
			'doAutocomplete':function(q){
				var that = this,
				    currVal = this.elem.value;
				console.log('autocomplete for',currVal)
				upCloo.utils.jsonp(_defaults.jsonpBaseUrl,'&q='+encodeURI(currVal),function(data){
					that.createSuggestLi(data);
					that.showSuggest();
						
				});
			},
			'showSuggest': function(){
				this.auto_elem.style.display = 'block';
				this.setAutoElemOffset();
			},
			'hideSuggest': function(){
				this.auto_elem.style.display = 'none';
			},
			'isHidden': function(){
				return this.auto_elem.style.display == 'none' ? 
						true : false; 
			},
			'markSelected':function(){
				var liItems = this.auto_elem.childNodes;
					for(var l in liItems) upCloo.utils.removeClass(liItems[l],'active_item');
						if(this.currSelected < 0) this.currSelected = liItems.length - 1; 
						if(this.currSelected == liItems.length) this.currSelected = 0;
										
					upCloo.utils.addClass(liItems[this.currSelected],'active_item');
			}
		};
		
		_autocomplete.fn.init.prototype = _autocomplete.fn;
	
		if(global.hasOwnProperty('upCloo')){
			global.upCloo['autocomplete'] = _autocomplete;
		}
})(window == undefined ? this : window);