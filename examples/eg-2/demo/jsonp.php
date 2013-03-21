<?php
$callback = @$_GET['callback'];
$json = '[
    {
        "title": "CDN comparison: best content delivery network services",
        "image": "http://www.gabrielemittica.com/files/2012/09/immagini_contenuti/22/icona_t.png",
        "url": "http://www.gabrielemittica.com/cont/guide/cdn-comparison-best-content-delivery-network-services/22/1.html",
        "price": "100.84 $",
        "cane":false,
        "subtitle": "Prezzo incredibile su www.gabrielemittica.com",
        "type": "adv-content"
    },
    {
        "title": "Amazon SNS Ð Simple Notification Service",
        "image": false,
        "url": "http://walterdalmut.com/2011/11/13/amazon-sns-simple-notification-service/",
        "type": "content"
    },
    {
        "title": "Zend\\Di impressioni Ð ZF2",
        "image": false,
        "url": "http://walterdalmut.com/2012/01/08/zend-di-impressioni-zf2/",
        "type": "content"
    }
]';
header("Content-Type: application/javascript; charset=utf-8");
header("Age:0");
header("Cache-Control:max-age=15, must-revalidate");
if($callback)echo "{$callback}(";
echo $json;
if($callback)echo ");";