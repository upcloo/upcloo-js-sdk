
(function(global){
	var guid = 0,
	upCloo = global.upCloo,
	_defaults = {
			jsonpBaseUrl:'./demo/autocomplete.php',
			onSelectedItem:function(){}
	};
	var _autocomplete = function (selector,opts){
		guid++;
		return new _autocomplete.fn.init(selector,guid,opts);
	};
	_autocomplete.fn = _autocomplete.prototype = {
			'constructor': _autocomplete,
			'init':	function (el,guid,options){
				this.elem = el;
				this.guid = guid;
				this.isFocused = false;
				this.selectedItemIdx = false;
				this.currSelected = 0;
				this.options = {};
				for (var i in _defaults) {
					if(_defaults.hasOwnProperty(i))this.options[i] = i in options ? options[i] : _defaults[i] ;
				}
				this.createSuggestDiv();
				this.bindEvt();
				this.searchTimeout = false;
			},
			'handleChar':function(ch){
				this.delayedComplete();
				return true;
			},
			'setSelected':function(idx){
				var liItems = this.auto_elem.childNodes;
				return this.elem.value = (typeof idx == 'number' ?  liItems[idx] : idx ).innerHTML;
			},
			'handleNonChar':function(key){
				//up
				if(key == 38){
					this.currSelected--;
					this.markSelected();
					return false;
				}
				//down
				if(key == 40){
					this.currSelected++;
					this.markSelected();	
					return false;
				}
				//delete
				if(key == 8){
					this.delayedComplete();
					return true;
				}
				//enter 
				if(key == 13){
					if(this.currSelected !== false && this.isFocused === false){
						var selectedData = this.setSelected(this.currSelected);
						this.options.onSelectedItem.apply(this.elem,[this.currSelected,selectedData]);
						this.hideSuggest();

					}
					return false;
				}
				return true;
			},
			'bindEvt':function(){
				var that = this,
				nonChar = false,
				handleKey = function(evt) {
					var char;
					var ret;
					if (evt.type == "keydown") {
						char = evt.keyCode;
						if (char <16 || (char> 16 && char <32) || 
								(char> 32 && char <41) || char == 46) {
							ret = that.handleNonChar.apply(that,[char]);
							nonChar = true;
							return ret;
						} else { nonChar = false; }
						return true; 
					} else { 
						if (nonChar) return true;               
						char = (evt.charCode) ?
								evt.charCode : evt.keyCode;
						if (char> 31 && char <256)
							ret = that.handleChar.apply(that,[char]); 
						return ret;
					}   
				};

				upCloo.utils.bind(this.elem,'keydown',handleKey);
				upCloo.utils.bind(this.elem,'keypress',handleKey);
				upCloo.utils.bind(this.elem,'focus',function(){
					that.hasFocus = true;
				});
				upCloo.utils.bind(this.elem,'blur',function(){
					that.hasFocus = false;
					that.hideSuggest();
				});
				upCloo.utils.bind(this.auto_elem,'mousedown',function(e,target){
					if( upCloo.utils.hasClass(target,'autocomplete_item') ){
						var selectedData = that.setSelected(target);
						that.options.onSelectedItem.apply(that.elem,[that.currSelected,selectedData]);
					}
					return true;
				});
				upCloo.utils.bind(this.auto_elem,'mousemove',function(e,target){
					if( upCloo.utils.hasClass(target,'autocomplete_item') ){
						that.currSelected = upCloo.utils.index(target);
						that.markSelected();	
					}
					return true;
				});

			},
			'createSuggestDiv':function(){
				var temp = document.createElement('ul');
				upCloo.utils.addClass(temp,'upcloo_autocomplete');
				this.auto_elem = temp;
				document.body.appendChild(temp);
				return this;
			},
			'get2BorderAndPadding':function(el){
				var old = upCloo.utils.curStyle(el,'width');
				el.style.width = '0px';
				var acOffsetWidth = upCloo.utils.getOffset(el,document,document.documentElement).width;
                          
				el.style.width = upCloo.utils.curStyle(el,'width');
				return acOffsetWidth;
			},
			'setAutoElemOffset':function(){
				var temp = this.auto_elem,
				inputOffset =  upCloo.utils.getOffset(this.elem,document,document.documentElement),
				wpadding = this.get2BorderAndPadding(this.auto_elem);
				temp.style.position = 'absolute';
				temp.style.top = inputOffset.top + inputOffset.height + 'px';
				temp.style.left = inputOffset.left + 'px';
				temp.style.width = (inputOffset.width - wpadding  ) + 'px';
			},
			'createSuggestLi': function(arr){
				this.auto_elem.innerHTML = '';

				while(arr.length){
					var currSuggest = arr.pop();
					var tmpLi = document.createElement('li');
					upCloo.utils.addClass(tmpLi,'autocomplete_item');
					tmpLi.innerHTML = currSuggest;
					this.auto_elem.appendChild(tmpLi);
				}
			},
			'delayedComplete':function(){
				var that = this,
				delay = this.searchTimeout === false ? 0 :200;
				clearTimeout(this.searchTimeout);
				this.searchTimeout = setTimeout(function(){
					that.doAutocomplete();
				},delay);
			},
			'doAutocomplete':function(q){
				var that = this,
				currVal = this.elem.value;
				upCloo.utils.jsonp(_defaults.jsonpBaseUrl,'&q='+encodeURI(currVal),function(data){
					that.createSuggestLi(data);
					that.showSuggest();

				});
			},
			'showSuggest': function(){
				this.auto_elem.style.display = 'block';
				this.setAutoElemOffset();
			},
			'hideSuggest': function(){
				this.auto_elem.style.display = 'none';
			},
			'isHidden': function(){
				return this.auto_elem.style.display == 'none' ? 
						true : false; 
			},
			'markSelected':function(){
				var liItems = this.auto_elem.childNodes;
				for(var l in liItems)if(liItems.hasOwnProperty(l))upCloo.utils.removeClass(liItems[l],'active_item');
				if(this.currSelected < 0) this.currSelected = liItems.length - 1; 
				if(this.currSelected == liItems.length) this.currSelected = 0;

				upCloo.utils.addClass(liItems[this.currSelected],'active_item');
			}
	};

	_autocomplete.fn.init.prototype = _autocomplete.fn;

	if('upCloo' in global){
		global.upCloo.autocomplete = _autocomplete;
	}
})(window === undefined ? this : window);
