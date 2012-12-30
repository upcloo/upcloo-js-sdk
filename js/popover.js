(function(global){
	
	var upCloo = global.upCloo;
		popOver = function(){
			this.data = false;
			this.options = {};
			this.widgetElem = document.createElement('div');
			this.hasImage = false;
			this.widgetElemInDom = false;
			this.isAnimate = false;
			this.trackShow = false;
			this.siteKey = false;
			this.vSiteKey = false
		};
	popOver.prototype = {
		'setOptions' :function(opts){
			this.options = opts || {};
		},
		'setData' : function(dataObj){
			this.data = dataObj;
		},
		'setSiteKey':function(k){
			this.siteKey = k;		
		},
		'setVSiteKey':function(vk){
			this.vSiteKey = vk;		
		},
		'_makeLink':function(obj){ 
			
			var link = document.createElement('a'),
			li = document.createElement('li'),
			imageSrc = obj.image.length > 0 ? obj.image : this.options.defaultImage,
			that = this;	
			upCloo.utils.addClass(li,'upcloo-'+obj.type);
			link.setAttribute('href',obj.url);
			 
			for(var elem in obj){
				if( obj.hasOwnProperty(elem) && 
					(elem !== 'url' && elem !== 'trackUrl' && elem !== 'type') ){
					console.log(elem)
					var isImg = elem =='image',
						el = document.createElement(isImg ? 'image' : 'span');
					isImg ? el.setAttribute('src',obj[elem]) : el.innerHTML = obj[elem];
					upCloo.utils.addClass(el,'upcloo-suggest-'+elem);
					isImg ? (that.hasImage ? link.appendChild(el) : false ) 
							: link.appendChild(el);
				}
			}
			upCloo.utils.bind(link,'mousedown',function(){
				var vk = that.vSiteKey !== false ? '|' + that.vSiteKey : '' ;				
				var trackUrl = obj.trackUrl + (that.options.ga === true ? '?ga=' + upCloo.utils.base64.encode( 'popOver|' + that.options.theme + vk ) : '') ;
					this.setAttribute('href',trackUrl );
			});
			li.appendChild(link);
			return li;
		},
		'_doScrollCheck': function(){
			
			var that = this;
			var handle = function(e) {
				
				var nVScroll = document.documentElement.scrollTop || document.body.scrollTop;
				nVScroll > that.options.popIn ? that.show() : false;
				nVScroll < that.options.popOut ? that.hide() : false;
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
			
			//pos
			upCloo.utils.addClass(tmpRoot,'upcloo-over-' + ('pos' in this.options ? this.options.pos : 'br'));
			//theme
			upCloo.utils.addClass(tmpRoot,'upcloo-over-' + this.options.theme);
			//headline
			upCloo.utils.addClass(tmpHeadline,'upcloo-title');
		
			if('headline' in this.options && this.options.headline ){
				closeBtn.innerHTML = 'x';
				upCloo.utils.bind(closeBtn,'click',function(){
					upCloo.utils.unbind(window,'scroll',that.refScrollHandler)
					tmpRoot.parentNode.removeChild(tmpRoot)
				});
				upCloo.utils.addClass(closeBtn,'upcloo-close');
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
