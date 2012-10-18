(function(global){
	var upCloo = global.upCloo;
	
	var	_defaults = {
			'widget':{},
			'sendBeacon': true,
			'customCss':false,
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
				var that = this,
					b64 = upCloo.utils.base64,
					hash = b64.encode(pageId) + '.js';
				
				if(options){
					for (var i in _defaults) {
						if(_defaults.hasOwnProperty(i))
							this.options[i] = (i in options )? options[i] : _defaults[i] ;
					}
				} else {
					//TO-DO add a _extends util to copy & extend e
					this.options = _defaults;
				}
				this.pageId = pageId;

				this.setSiteKey(siteKey);
				
				if(!this.options.customCss){
					upCloo.utils.cssFile(this.options.upClooAssetEndpoint + '/' + 'u.css');	
				}
				upCloo.utils.script( this.options.upClooSuggestBase + '/' + this.siteKey + '/' + hash ,function(){
					if( 'getData' in upCloo.suggest && upCloo.suggest.getData() !== false ){
						var wName = 'widget' in that.options && 'type' in that.options.widget ? 
									that.options.widget.type : 'popOver',
							renderer = upCloo.suggest.widget[wName]();
							renderer.setData(upCloo.suggest.getData());
							if('widget' in that.options ){
								renderer.setOptions(that.options.widget.opts);
							}
							renderer.render();
					} else {
						if(!that.options.sendBeacon)return;
						var beacon = new Image();
							beacon.src = that.options.upClooBeaconBase + '/' + that.siteKey + '/' + b64.encode(that.pageId)
					}
				},1.5);
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
	
	if('upCloo' in global){
		global.upCloo.suggest = suggest;
	}

})(window === undefined ? this : window);
