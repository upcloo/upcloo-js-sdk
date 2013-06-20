(function(global){
var conf = upCloo.widgets,test=false;
	upCloo.utils.ready(function(){
		var widgets = upCloo.utils.$byClass('upcloo-widget');
		for(var i=0; i < widgets.length; i++)
			(function(i){
				var id =widgets[i].getAttribute('id');
				upCloo.utils.jsonp( (test ? '//opts.repository.upcloo.com' : '//s.upcloo.com') +'/'+ conf[i].siteKey+'/'+id,'',function(options){
					upCloo.instances.push(new upCloo.suggest(conf[i].siteKey,
							conf[i].permalink,
							conf[i].vSiteKey,
							upCloo.utils.extend(options,conf[i].options),
							widgets[i]));
				},id);
			})(i);
	});
})(window === undefined ? this : window);
