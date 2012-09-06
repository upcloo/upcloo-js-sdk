#upcloo-js-sdk

UpCloo JavaScript library

## Snippet

```html
<script>
(function(g,opts) {
    g.upCloo = g.upCloo || {};
    g.upCloo.bootStrap = opts;
	var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
    s.src = 'http://cdn.repository.upcloo.com/a/u.js'
	var n = document.getElementsByTagName('script')[0];
    n.parentNode.insertBefore(s,n);
})(this,{
    "pageId": "http://walterdalmut.com/2012/07/29/pimple-dependency-injection-su-zendcache/",
    "siteKey": "xx00XXxxx"
});
</script>
```

## Developers

First of all you have to install a list of dependencies

```
$ npm install expresso uglifyjs jshint recess -g
```

After that you can compile the library

```
$ make
```

The make process dependes on library sourcecode. JSHint check the
library before compile the source and minimize the code.

### Clean the library

To clear the library compile use

```
$ make clean
```

Or to force the clean operation

```
$ make force-clean
```
