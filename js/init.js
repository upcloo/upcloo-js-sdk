(function(global){
var conf = upCloo.widgets;
	upCloo.utils.ready(function(){
		var widgets = upCloo.utils.$byClass('upcloo-suggest-widget');
		for(var i=0; i < widgets.length; i++)
			(function(i){
				upCloo.utils.jsonp('//opts.repository.upcloo.com/'+widgets[i].getAttribute('id'),'',function(options){
					upCloo.instances.push(new upCloo.suggest(conf[i].siteKey,
							conf[i].permalink,
							conf[i].vSiteKey,
							options,
							widgets[i]));
					
				});
			})(i);
	});
})(window === undefined ? this : window);