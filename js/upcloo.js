//  About unsafe comparisons / When blocks omit {} / When code is not in strict mode
(function(global){

	global.upCloo.name = 'upCloo js SDK';
	global.upCloo.version = 1;

})(window === undefined ? this : window);
(function(global){

	var _bind = function(elem,type,eventHandle){
		//handle ie && standard evt handling
		var callback  = function(e){

			var evtObj = e || window.event,
			target = evtObj.target || evtObj.srcElement;
			var returnVal = eventHandle.apply(elem,[evtObj,target]);

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
		};
		first.parentNode.insertBefore(js, first);	
	};
	//check something for onload handling ie 7
	var _script = function(url,done,timeout){
		var js = document.createElement('script'),
			first = document.getElementsByTagName('script')[0],
			tmRef = false,
			isTimeout = false;
		js.src = url;
		if(timeout){
			tmRef = setTimeout(function(){ 
						isTimeout = true;
						done.call(this);
					},timeout * 1000);}
		js.onload = function(){
			clearTimeout(tmRef);
			isTimeout ? false : done.call(this);
		};
		if (js.readyState) {// readystate on js elem will exclude onload compatible browsers
			js.onreadystatechange = function () { 
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					clearTimeout(tmRef);
					isTimeout ? false : done.call(this);
				}
			};
		}
		first.parentNode.insertBefore(js, first);
	};
	var _cssFile = function(url){
		var f = document.createElement("link");
         f.setAttribute("rel", "stylesheet");
         f.setAttribute("type", "text/css");
         f.setAttribute("href", url);
         
         if(typeof f != "undefined"){
             document.getElementsByTagName("head")[0].appendChild(f);
         }
		};
	
	// adapted form jQuery.fn.offset see http://ejohn.org/blog/getboundingclientrect-is-awesome/
	var _getOffset = function (elem, doc, docElem) {
		var box;
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
		var y ;
		if (el.currentStyle)
			y = el.currentStyle[styleProp];
		else if (window.getComputedStyle)
			y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
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
		if(!el.className || el.className.length === 0)return;
		var currClassName = el.className;
		el.className = currClassName.replace(new RegExp("(^|\\s+)" + cName + "(\\s+|$)"), ' ' );
	};
	var _index = function(el){
		var n = -1;
		for (var i = el.parentNode.childNodes.length; i >= 0; i--)
		{
			if (el.parentNode.childNodes[i] === el){n = i; break; }
		}
		return n;
	};
	var _base64 = {
	 
		// private property
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	 
		// public method for encoding
		encode : function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
	 
			input = _base64._utf8_encode(input);
	 
			while (i < input.length) {
	 
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
	 
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
	 
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
	 
				output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
	 
			}
	 
			return output;
		},
	 
		// private method for UTF-8 encoding
		_utf8_encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
	 
			for (var n = 0; n < string.length; n++) {
	 
				var c = string.charCodeAt(n);
	 
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
	 
			}
	 
			return utftext;
		}
	};
	if(global.hasOwnProperty('upCloo')){
	global.upCloo.utils = {
				'curStyle'	: _getCurStyle,
				'getOffset'	: _getOffset,
				'bind'		: _bind,
				'jsonp'		: _jsonp,
				'script'	: _script,
				'addClass'	: _addClass,
				'removeClass': _removeClass,
				'hasClass'	: _hasClass,
				'index'		: _index,
				'base64'	: _base64,
				'cssFile'   : _cssFile
		};
	}
})(window === undefined ? this : window);

(function(global){
	var upCloo = global.upCloo;
	
	var	_defaults = {
			'widget':{},
			'sendBeacon': true,
			'upClooSuggestBase':'repository.upcloo.com',
			'upClooBeaconBase':'t.upcloo.com',
			'upClooAssetEndpoint':'//repository.upcloo.com/a'
		};
	var suggest = {
			'currentWidget' : false,
			'siteKey' : false,
			'pageId' : false,
			'options':{},
			'init':function(siteKey,pageId,options){
				if(options){
					for (var i in _defaults) {
						if(_defaults.hasOwnProperty(i))
							this.options[i] = (i in options )? options[i] : _defaults[i] ;
					}
				} else {
					this.options = _defaults;
				}
				
				this.setSiteKey(siteKey);
				this.pageId = pageId ;
				
				var that = this ,
					b64 = upCloo.utils.base64,
					hash = b64.encode(this.pageId)+'.js';
					
					//hash with something the URL
				upCloo.utils.cssFile(this.options.upClooAssetEndpoint + '/' + 'u.css');	
				upCloo.utils.script( this.options.upClooSuggestBase + '/' + this.siteKey + '/' + hash ,function(){
					//better test neeeded for upCloo.suggest.getData()
					
					if( 'getData' in upCloo.suggest && upCloo.suggest.getData() !== false ){
						var wName = 'widget' in that.options && 'type' in that.options.widget ? 
									that.options.widget.type : 'popOver',
							renderer = upCloo.suggest.widget[wName]();
							
							renderer.setData( upCloo.suggest.getData() );
							if('widget' in that.options ){
								renderer.setOptions(that.options.widget.opts );
							}
							renderer.render();
					} else {
						
						if(that.options.sendBeacon){
							var beacon = new Image();
								beacon.src = that.options.upClooBeaconBase + '/' + that.siteKey + '/' + b64.encode(that.pageId)
						}
					}
					
				},1.5 );
			},
			'setWidget' : function(upClooWidget){
				this.currentWidget = upClooWidget;
				return this.currentWidget;
			},
			'getWidget' : function(){
				return this.currentWidget;
			},
			'setSiteKey':function(siteKey){
				var repoToken = siteKey.split('-').length > 1 ?
					siteKey.split('-')[0] : false;
					
					this.siteKey = siteKey;
					
					this.options.upClooSuggestBase = '//' +
						(repoToken ? repoToken + '.' : '') + this.options.upClooSuggestBase;
					this.options.upClooBeaconBase = '//' +
						(repoToken ? repoToken : 'corley') + '.' + this.options.upClooBeaconBase;
				
					return this.siteKey;
			},
			'getSiteKey':function(){
				return this.siteKey;
			},
			'getPageId':function(){
				return this.pageId;
			}
	};
	
	if(global.hasOwnProperty('upCloo')){
		global.upCloo.suggest = suggest;
	}

})(window === undefined ? this : window);

(function(global){
	var guid = 0,
	upCloo = global.upCloo,
	_defaults = {
			jsonpBaseUrl:'./demo/autocomplete.php',
			onSelectedItem:function(){}
	};
	var _autocomplete = function (selector,opts){
		guid++;
		return new _autocomplete.fn.init(selector,guid,opts);
	};
	_autocomplete.fn = _autocomplete.prototype = {
			'constructor': _autocomplete,
			'init':	function (el,guid,options){
				this.elem = el;
				this.guid = guid;
				this.isFocused = false;
				this.selectedItemIdx = false;
				this.currSelected = 0;
				this.options = {};
				for (var i in _defaults) {
					if(_defaults.hasOwnProperty(i))this.options[i] = i in options ? options[i] : _defaults[i] ;
				}

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
				return this.elem.value = (typeof idx == 'number' ?  liItems[idx] : idx ).innerHTML;
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
					if(this.currSelected !== false && this.isFocused === false){
						var selectedData = this.setSelected(this.currSelected);
						this.options.onSelectedItem.apply(this.elem,[this.currSelected,selectedData]);
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
					var ret;
					if (evt.type == "keydown") {
						char = evt.keyCode;
						if (char <16 || (char> 16 && char <32) || 
								(char> 32 && char <41) || char == 46) {
							ret = that.handleNonChar.apply(that,[char]);
							nonChar = true;
							return ret;
						} else { nonChar = false; }
						return true; 
					} else { 
						if (nonChar) return true;               
						char = (evt.charCode) ?
								evt.charCode : evt.keyCode;
						if (char> 31 && char <256)
							ret = that.handleChar.apply(that,[char]); 
						return ret;
					}   
				};

				upCloo.utils.bind(this.elem,'keydown',handleKey);
				upCloo.utils.bind(this.elem,'keypress',handleKey);
				upCloo.utils.bind(this.elem,'focus',function(){
					that.hasFocus = true;
				});
				upCloo.utils.bind(this.elem,'blur',function(){
					that.hasFocus = false;
					that.hideSuggest();
				});
				upCloo.utils.bind(this.auto_elem,'mousedown',function(e,target){
					if( upCloo.utils.hasClass(target,'autocomplete_item') ){
						var selectedData = that.setSelected(target);
						that.options.onSelectedItem.apply(that.elem,[that.currSelected,selectedData]);
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
				upCloo.utils.addClass(temp,'upcloo_autocomplete');
				this.auto_elem = temp;
				document.body.appendChild(temp);
				return this;
			},
			'get2BorderAndPadding':function(el){
				var old = upCloo.utils.curStyle(el,'width');
				el.style.width = '0px';
				var acOffsetWidth = upCloo.utils.getOffset(el,document,document.documentElement).width;
                          
				el.style.width = upCloo.utils.curStyle(el,'width');
				return acOffsetWidth;
			},
			'setAutoElemOffset':function(){
				var temp = this.auto_elem,
				inputOffset =  upCloo.utils.getOffset(this.elem,document,document.documentElement),
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
				delay = this.searchTimeout === false ? 0 :200;
				clearTimeout(this.searchTimeout);
				this.searchTimeout = setTimeout(function(){
					that.doAutocomplete();
				},delay);
			},
			'doAutocomplete':function(q){
				var that = this,
				currVal = this.elem.value;
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
				for(var l in liItems)if(liItems.hasOwnProperty(l))upCloo.utils.removeClass(liItems[l],'active_item');
				if(this.currSelected < 0) this.currSelected = liItems.length - 1; 
				if(this.currSelected == liItems.length) this.currSelected = 0;

				upCloo.utils.addClass(liItems[this.currSelected],'active_item');
			}
	};

	_autocomplete.fn.init.prototype = _autocomplete.fn;

	if(global.hasOwnProperty('upCloo')){
		global.upCloo.autocomplete = _autocomplete;
	}
})(window === undefined ? this : window);

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

	if(global.hasOwnProperty('upCloo')){
		'widget' in global.upCloo.suggest ? false : global.upCloo.suggest.widget = {};
		global.upCloo.suggest.widget.popOver = function(){ return new popOver(); }
	}
})(window === undefined ? this : window);
(function(global){
var config = upCloo.bootStrap;
	upCloo.suggest.init(config.siteKey,config.pageId,config.opts);
})(window === undefined ? this : window);