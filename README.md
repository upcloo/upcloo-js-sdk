#upcloo-js-sdk

UpCloo JavaScript library

## Snippet

```html
<!-- UPCLOO JS SDK START -->
<div class='upcloo-suggest-widget'></div>
<script>
(function(g,d,id){
  upCloo = g.upCloo || [];
  upCloo.push(
    {
      "pageId" : "http://walterdalmut.com/2012/07/29/pimple-dependency-injection-su-zendcache/",
      "siteKey" : "xx00XXxxx","vSiteKey":"ss00SSsss",
      "opts": {
        "pos":"br",
        "type":"popOver",
        "headline":"Your powerful headline!",
        "limit":5,
        "theme": "light"
      }
    }
  );
  var s = d.createElement('script') , n = d.getElementsByTagName('script')[0];
  s.type = 'text/javascript';
  s.async = true;s.id = id;
  s.src = '../../build/js/u.js';
  !d.getElementById(id) ? n.parentNode.insertBefore(s,n) :false;
})(this,document,'upcloo_js_sdk')
</script>
<!-- UPCLOO JS SDK END -->
```

## Options

 * SDK Options
   * `pos`
     * Position of the popover
       * [br,bl,tl,tr]
       * Bottom right, bottom left, top left, top right
   * `type`
     * Type of widget
       * [popOver, inline]
       * Show widget as popover or inline in the page
   * `sendBeacon`
     * Mark this page status
       * [true, false]
       * Send beacons to UpCloo (Notifies new contents)
   * `headline`
     * Write a new headline (Maybe you're also interesetd in')
      * [string]
   * `theme`
     * Select a theme
      * [light, basic, strip]
   * `showImage`
     * Show images and titles
      * [true, false]
   * `defaultImage`
     * In case of missing image use this as default
      * [URL]
   * `popIn`
     * Distance in px from the corner to show upcloo popover
      * [int]
   * `popOut`
     * Distance in px from the corner to hide upcloo popover
      * [int]

## Developers

First of all you have to install a list of dependencies

```
$ npm install expresso uglify-js jshint recess -g
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
