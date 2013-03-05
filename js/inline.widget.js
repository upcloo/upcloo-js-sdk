(function(global){
	
	var upCloo = global.upCloo,
		Inline = function (elem){
		return new Inline.prototype.init(elem);
		};
		upCloo.utils.inherit(Inline,upCloo.widgets.base);
	Inline.prototype.constructor =  Inline;
	Inline.prototype.render  = function(){
			var arr = this.data,
				tmpHeadline = document.createElement('li'),	
				tmpUl = document.createElement('ul'),
				count = 'limit' in this.options ? parseInt(this.options.limit,10) : 3 ;
			
			if(this.options.headline ){
				tmpHeadline.innerHTML = this.options.headline;
				upCloo.utils.addClass(tmpHeadline,'upcloo-header');
				tmpUl.appendChild(tmpHeadline);
			}
			for(var i=0; i < count; i++){
				if(arr[i] === undefined)break;
				tmpUl.appendChild(this._makeLink(arr[i]));
			}
			
			tmpUl.setAttribute('id',this.uid+'_ul');
			this.widgetElem.appendChild(tmpUl);
			if('footer' in this.options && this.options.footer !== false ){
				this.widgetElem.appendChild(this._makeFooter());
			}
			if(this.options.ga === true && '_gaq' in global && typeof global._gaq.push == 'function'){
				global._gaq.push(['_trackEvent', 'UpCloo-'+this.siteKey+(this.vSiteKey !== false ? '-'+this.vSiteKey : ''), 'show', 'inline-'+this.options.theme]);
			}
		};
	Inline.prototype.init.prototype = Inline.prototype;	
	
	if('upCloo' in global){
		'widgets' in global.upCloo ? false : global.upCloo.widgets = {};
		global.upCloo.widgets.inline = Inline;
	}
})(window === undefined ? this : window);
