(function(global){
var config = upCloo.bootStrap;
	upCloo.utils.ready(function(){
		upCloo.suggest.init(config.siteKey,config.pageId,config.opts);
	});
})(window === undefined ? this : window);