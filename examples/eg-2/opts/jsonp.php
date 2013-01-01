<?php
$callback = @$_GET['callback'];
$json = '{"sendBeacon":true,"cssStyle":"body {background-color:blue;}","headline":"Questi potrebbero PIACERTI","limit":5,"theme":"grey","type":"inline","ga":true,"showImage":1,"pos":"bl","defaultImage":"http://cdn5.staztic.com/cdn/logos/comcustomlwphotbabewithbigboobsswell-4.png"}';
header("Content-Type: application/javascript; charset=utf-8");
if($callback)echo "{$callback}(";
echo $json;
if($callback)echo ");";