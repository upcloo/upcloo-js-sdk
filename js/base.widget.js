(function(global){
	
	var upCloo = global.upCloo;
		base = function(){};
	base.prototype = {
		'init' : function(elem){
			this.data = false;
			this.siteKey = false;
			this.vSiteKey = false;
			this.options = {};
			this.hasImage =false;
			this.widgetElem = elem;	
			this.uid = this.widgetElem.getAttribute('id');
		},
		'setOptions' :function(opts){
			this.options = opts || {};
		},
		'setSiteKey':function(k){
			this.siteKey = k;		
		},
		'setVSiteKey':function(vk){
			this.vSiteKey = vk;		
		},
		'setData' : function(dataObj){
			this.data = dataObj;
		},
		'_makeLink':function(obj){ 
			var link = document.createElement('a'),
				li = document.createElement('li'),
				el = document.createElement('span'),
				imageWrap = document.createElement('span'),
				that = this;	
				upCloo.utils.addClass(li,'upcloo-'+obj.type);
				link.setAttribute('href',obj.url);
				
				for(var elem in obj){
					if( obj.hasOwnProperty(elem) && 
						(elem !== 'url' && elem !== 'trackUrl' && elem !== 'type') ){
						var sub = false,
							image = (elem == 'image' ? (obj[elem] ? obj[elem] : this.options.defaultImage) : false);
						if(image !== false){
							if( !that.hasImage )continue;
							sub = document.createElement('img');
							sub.setAttribute('src',image);
							upCloo.utils.addClass(imageWrap,'upcloo-suggest-img');
							imageWrap.appendChild(sub);
							continue;
						} 
							sub = document.createElement('span');
							sub.innerHTML = obj[elem];
							upCloo.utils.addClass(sub,'upcloo-suggest-'+elem);
							upCloo.utils.addClass(el,'upcloo-suggest-span');
						
						el.appendChild(sub);
						
					}
				}
				if(that.hasImage ){
					link.appendChild(imageWrap);
				}
				link.appendChild(el);
				upCloo.utils.bind(link,'mousedown',function(){
					var vk = that.vSiteKey !== false ? '|' + that.vSiteKey : '' ;				
					var trackUrl = obj.trackUrl + (that.options.ga === true ? '?ga=' + upCloo.utils.base64.encode( 'inline|' + that.options.theme + vk ) : '') ;
						this.setAttribute('href',trackUrl );
				});
				li.appendChild(link);
				return li;
		},
		'setHasImage':function(yesno){
			this.hasImage = yesno;
		}
	};
	if('upCloo' in global){
		'widgets' in global.upCloo ? false : global.upCloo.widgets = {};
		global.upCloo.widgets.base = base
	}
})(window === undefined ? this : window);
