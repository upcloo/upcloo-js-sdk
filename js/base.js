(function(global){
	var oldArr = global.upCloo || [];
	global.upCloo = {
			'name'		: 'upCloo Js SDK',
			'version'	: 1,
			'widgets'	: oldArr,
			'push'		: function(){this.widgets.push(arguments);},
			'instances'	: []
	};
})(window === undefined ? this : window);