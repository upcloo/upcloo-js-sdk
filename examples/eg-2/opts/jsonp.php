<?php

$callback = 'upcloo_1000';
$json = '{"sendBeacon":true, "headline":"Continua nella lettura","limit":3,"type":"inline","showImage": 1,"pos": "br","popIn": 200,"popOut": 100,"defaultImage": "http://walterdalmut.com/wp-content/plugins/wp-upcloo/assets/no-image.gif","ga": true}';
header("Content-Type: application/javascript; charset=utf-8");
header("Age:0");
header("Cache-Control:max-age=15, must-revalidate");
if($callback)echo "{$callback}(";
echo $json;
if($callback)echo ");";