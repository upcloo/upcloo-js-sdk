(function(global){
var conf = upCloo.widgets;
	upCloo.utils.ready(function(){
		var widgets = upCloo.utils.$byClass('upcloo-suggest-widget');
		for(var i=0; i < widgets.length; i++)
			(function(i){
				var id =widgets[i].getAttribute('id');
				upCloo.utils.jsonp('//s.upcloo.com/'+conf[i].siteKey+'/'+id,'',function(options){
					upCloo.instances.push(new upCloo.suggest(conf[i].siteKey,
							conf[i].permalink,
							conf[i].vSiteKey,
							options,
							widgets[i]));
					
				},id);
			})(i);
	});
})(window === undefined ? this : window);