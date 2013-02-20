(function(global){
	var upCloo = global.upCloo;
	
	var	_defaults = {
			'widget':{},
			'sendBeacon': true,
			'customCss':false,
			'pos':'br',
			'limit':3,
			'headline':false,
			'cssStyle':false,
			'type':'popOver',
			'theme':'grey' ,
			'ga':false,
			'wrap':function(a){return a;},
			'showImage':false,
			'popIn':400,
			'popOut':100,
			'defaultImage':'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
			'upClooSuggestBase':'o.upcloo.com',
			'upClooBeaconBase':'t.upcloo.com',
			'upClooAssetEndpoint':'//r.upcloo.com/a',
			'preRender':function(dE){return dE;}
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
				hash = b64.encode(pageId);
		
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
		
			var dataUrl = this.options.upClooSuggestBase + '/' + this.siteKey + '/' +
						( this.getVSiteKey() ? this.getVSiteKey() + '/': '' )  +
						hash;
			
			upCloo.utils.jsonp( dataUrl,'',function(data){
				if( data !== false ){
					
					var wName = that.options.type,
						renderer = upCloo.widgets[wName](that.domElem),
						hasImage = false;
					that.renderer = renderer;
					if(data.length === 0)return false;
					for(var i =0; i< data.length; i++){
						if('image' in data[i] && data[i].image )hasImage = true;
						data[i].trackUrl = "http://"+that.repoToken+".c.upcloo.com/"+that.getSiteKey()+"/"+b64.encode(data[i].url);
						data[i] = that.options.wrap(data[i]); 
					}
						renderer.setData(data);
						renderer.setSiteKey(that.getSiteKey());
						renderer.setVSiteKey(that.getVSiteKey());
						renderer.setOptions(that.options);
						renderer.setHasImage(that.options.showImage)
						upCloo.utils.cssInline(that.options.cssStyle);
						renderer.render();
					
				} else {
					if(!that.options.sendBeacon)return;
					var beacon = new Image();
					beacon.src = that.options.upClooBeaconBase + '/' + that.siteKey + '/' + b64.encode(that.pageId) ;
				}
			});
		
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
