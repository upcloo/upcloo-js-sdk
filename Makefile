DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

build:
	@echo "\n${HR}"
	@echo "Building UpCloo JS SDK..."
	@echo "${HR}\n"
	@echo "Create \"build\" directory"
	@mkdir -p build/js
	@echo "Check the source code using \"jshint\""
	@jshint js/*.js --config js/.jshintrc
	@echo "Minify \"upcloo.js\" sourcecode"
	@cat js/base.js js/utils.js js/suggest.js js/autocomplete.js js/popover.js js/popover.js js/init.js > build/js/upcloo.all.js
	@cp  build/js/upcloo.all.js build/js/u.js 
	@uglifyjs -nc build/js/upcloo.all.js > build/js/upcloo.min.tmp.js	
	@echo "/**\n * upcloo.js by @egm0121 @gmittica @wdalmut.\n * Copyright 2012 Corley, S.r.l..\n * http://opensource.org/licenses/MIT\n */" > build/js/copyright.js
	@cat build/js/copyright.js build/js/upcloo.min.tmp.js > build/js/upcloo.min.js
	@echo "Clear the \"build\" folder"
	@rm build/js/copyright.js build/js/upcloo.min.tmp.js
	@echo "Compiling and minifying javascript...       ${CHECK} Done"
	@echo "\n\033[32m${HR}\033[39m"
	@echo "\033[32mUpCloo JS SDK successfully built at ${DATE}.\033[39m"
	@echo "\033[32m${HR}\033[39m\n"
	
no-hint:
	@echo "\n${HR}"
	@echo "Building UpCloo JS SDK...(skipping jshint)"
	@echo "${HR}\n"
	@echo "Create \"build\" directory"
	@mkdir -p build/js
	@echo "\n${HR}"
	@echo "\nSKIPPING JS HINT !!! O.o"
	@echo "\n${HR}"
	@echo "Minify \"upcloo.js\" sourcecode"
	@cat js/base.js js/utils.js js/suggest.js js/popover.js js/popover.js js/init.js > build/js/upcloo.all.js
	@cp  build/js/upcloo.all.js build/js/u.js 
	@uglifyjs -nc build/js/upcloo.all.js > build/js/upcloo.min.tmp.js	
	@echo "/**\n * upcloo.js by @egm0121 @gmittica @wdalmut.\n * Copyright 2012 Corley, S.r.l..\n * http://opensource.org/licenses/MIT\n */" > build/js/copyright.js
	@cat build/js/copyright.js build/js/upcloo.min.tmp.js > build/js/upcloo.min.js
	@echo "Clear the \"build\" folder"
	@rm build/js/copyright.js build/js/upcloo.min.tmp.js
	@echo "Compiling and minifying javascript...       ${CHECK} Done"
	@echo "\n\033[32m${HR}\033[39m"
	@echo "\033[32mUpCloo JS SDK successfully built at ${DATE}.\033[39m"
	@echo "\033[32m${HR}\033[39m\n"	
	
clean:
	@rm build/js/upcloo.min.js
	@rmdir build/js
	@rmdir build
	
force-clean:
	echo "Force clean! PLEASE USE WITH CARE!"
	rm -rf build
