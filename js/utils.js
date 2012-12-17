(function(global){
	var _boundDecorator = [];
	
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
		_boundDecorator.push([callback,eventHandle]);
	};
	
	var _unbind =function(elem, type, handle ){
		
			var vanillaUnbind = document.removeEventListener ?
					function( elem, type, handle ) {
						if ( elem.removeEventListener ) {
							elem.removeEventListener( type, handle, false );
					}
				} : function( elem, type, handle ) {
					if ( elem.detachEvent ) {
						elem.detachEvent( "on" + type, handle );
					}
				},
				currCallback = false;
			for(var i=0; i < _boundDecorator.length;i++){
				if(_boundDecorator[i][1] == handle)currCallback = _boundDecorator[i][0];
			}	
			vanillaUnbind(elem,type,currCallback)
	}
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
			isTimeout ? false : (isTimeout = true) && done.call(this);
		};
		if (js.readyState) {// readystate on js elem will exclude onload compatible browsers
			js.onreadystatechange = function () { 
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					clearTimeout(tmRef);
					isTimeout ? false : (isTimeout = true) && done.call(this);
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

	var _$byClass = function(className){
		var toArr = Array.prototype.slice,
			ret = false,
			fallback = function(className){
				var elArray = [], 
					tmp = document.getElementsByTagName("*") ,
					regex = new RegExp( '(^|s)' + className + '(s|$)');
			
				for ( var i = 0; i < tmp.length; i++ ) {
					if ( regex.test(tmp[i].className) )	elArray.push(tmp[i]);
				}
				return elArray;
			};
			
		if ('querySelectorAll' in document){
			try {
				ret = toArr.call(document.querySelectorAll('.'+className),0);
				
			} catch( e ) {
				ret = fallback(className);
			}
		}
		return ret ? ret : fallback(className);
	};
	var _clone = function me(obj){
		var clone = {};
        for(var i in obj) {
            if(typeof(obj[i])=="object")
                clone[i] = me(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone;
	}
	var _ready = function (doc) {
        function dispatch() {
            hasRun = 1;
            for (var i = 0, l = queue.length; i < l; i++) queue[i]()
        }
        var hasRun = 0,
        queue = [],
        d, e, f = !1,
        aElem = doc.createElement("a"),
        dloaded = "DOMContentLoaded",
        bind = "addEventListener",
        ready = "onreadystatechange";
        /^loade|c/.test(doc.readyState) && (hasRun = 1), 
        doc[bind] && doc[bind](dloaded, me = function () {
            doc.removeEventListener(dloaded, me, f), dispatch();
        }, f ), aElem.doScroll && doc.attachEvent(ready, d = function () {

            if(/^c/.test(doc.readyState)){doc.detachEvent(ready, d);dispatch();}
        });
        var check = aElem.doScroll ? function (callback) {
            self != top ? hasRun ? callback() : queue.push(callback) : ! function () {
                try {
                    aElem.doScroll("left")
                } catch (b) {
                    return setTimeout(function () {
                        check(callback)
                    }, 50)
                }
                callback()
            }()
        } : function (callback) {
            hasRun ? callback() : queue.push(callback)
        };
        return check;
    }(document); 
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
	 
			return output.replace(/\//g,'_');
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
	
	if('upCloo' in global){
	global.upCloo.utils = {
				'curStyle'	: _getCurStyle,
				'getOffset'	: _getOffset,
				'bind'		: _bind,
				'unbind'	: _unbind,
				'jsonp'		: _jsonp,
				'script'	: _script,
				'addClass'	: _addClass,
				'removeClass': _removeClass,
				'hasClass'	: _hasClass,
				'index'		: _index,
				'base64'	: _base64,
				'cssFile'   : _cssFile,
				'ready'		: _ready,
				'$byClass'  : _$byClass,
				'clone'		: _clone
		};
	}
})(window === undefined ? this : window);