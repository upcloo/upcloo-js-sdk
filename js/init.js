(function(global){
var conf = upCloo.widgets;
	upCloo.utils.ready(function(){
		console.log('sdk loaded once');
		var widgets = upCloo.utils.$byClass('upcloo-suggest-widget');
		for(var i=0; i < widgets.length; i++){
			upCloo.instances.push(new upCloo.suggest(conf[i].siteKey,conf[i].pageId,conf[i].vSiteKey,conf[i].opts,widgets[i]));
		}	
	});
})(window === undefined ? this : window);