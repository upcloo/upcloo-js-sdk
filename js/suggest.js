(function(global){
	var upCloo = global.upCloo;
	
	var	_defaults = {
			'widget':{},
			'sendBeacon': true,
			'customCss':false,
			'pos':'br',
			'limit':3,
			'headline':false,
			'type':'popOver',
			'theme':'grey' ,
			'showImage':false,
			'upClooSuggestBase':'repository.upcloo.com',
			'upClooBeaconBase':'t.upcloo.com',
			'upClooAssetEndpoint':'//repository.upcloo.com/a'
		};
	var Suggest = function(siteKey,pageId,vSiteKey,options,domElem){
			this.currentWidget = false;
			this.siteKey = false;
			this.pageId = false;
			this.vSiteKey = false;
			this.repoToken = false;
			this.options = {};
			this.domElem = domElem;
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
				this.options = upCloo.utils.clone(_defaults);
			}
			this.pageId = pageId;

			this.setSiteKey(siteKey);
			
			this.setVSiteKey(vSiteKey ? vSiteKey : false);
			
			if(!this.options.customCss){
				upCloo.utils.cssFile(this.options.upClooAssetEndpoint + '/' + 'u.css');	
			}
			var dataUrl = this.options.upClooSuggestBase + '/' + this.siteKey + '/' +
						( this.getVSiteKey() ? this.getVSiteKey() + '/': '' )  +
						hash;
			upCloo.utils.script( dataUrl ,function(){
				var callback = that.getVSiteKey() ? 'getExtraData' : 'getData';
				if( callback in upCloo.suggest && upCloo.suggest[callback]() !== false ){
					var wName = that.options.type,
						renderer = upCloo.widgets[wName](that.domElem),
						data = upCloo.suggest[callback](),
						hasImage = false;
					that.renderer = renderer;
					if(data.length === 0)return false;
					for(var i =0; i< data.length; i++){
						if('image' in data[i] && data[i].image )hasImage = true;
						data[i].trackUrl = "http://"+that.repoToken+".c.upcloo.com/"+that.getSiteKey()+"/"+b64.encode(data[i].url);
					}
						renderer.setData(data);
						renderer.setOptions(that.options);
						renderer.setHasImage(hasImage && that.options.showImage)
						renderer.render();
					
				} else {
					if(!that.options.sendBeacon)return;
					var beacon = new Image();
					beacon.src = that.options.upClooBeaconBase + '/' + that.siteKey + '/' + b64.encode(that.pageId) ;
				}
			},1.5);
		
		};
	Suggest.prototype = {
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
						this.repoToken = repoToken;
						this.options.upClooSuggestBase = '//' +
						(repoToken ? repoToken + '.' : '') + this.options.upClooSuggestBase;
						this.options.upClooBeaconBase = '//' +
						(repoToken ? repoToken : 'corley') + '.' + this.options.upClooBeaconBase;

						return this.siteKey;
			},
			'setVSiteKey':function(vSiteKey){
				this.vSiteKey = vSiteKey;
			},
			'getVSiteKey':function(){
				return	this.vSiteKey;
			},
			'getSiteKey':function(){
				return this.siteKey;
			},
			'getPageId':function(){
				return this.pageId;
			}
	};
	
	if('upCloo' in global){
		global.upCloo.suggest = Suggest;
	}

})(window === undefined ? this : window);
