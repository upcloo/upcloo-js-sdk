<?php
$callback = @$_GET['callback'];
$json = '[{"banane":"topi e pesci e pinguini","title":"1800; 1900 - Contesto storico","url":"http://www.skuola.net/storia-contemporanea/contesto-storico-guerra.html","image":"http://www.skuola.net/plugins/opengraph/img/UpClooAppunti.png", "type": "content"},{"title":"1800; 1900 - Contesto storico","url":"http://www.skuola.net/storia-contemporanea/contesto-storico-guerra-2.html","image":"http://www.skuola.net/plugins/opengraph/img/UpClooAppunti.png", "type": "content"},{"title":"1800, 1900 - Tra vecchio e nuovo secolo","url":"http://www.skuola.net/storia-contemporanea/1800x-1900x-tra-vecchio-nuovo-secolo.html","image":"http://www.skuola.net/plugins/opengraph/img/UpClooAppunti.png", "type": "content"},{"title":"Italia - Storia dal 1870 al 1900","url":"http://www.skuola.net/storia-contemporanea/l-italia-dal-1870-al-1900x.html","image":"http://www.skuola.net/plugins/opengraph/img/UpClooAppunti.png", "type": "content"},{"title":"Progresso tra il 1800 e il 1900","url":"http://www.skuola.net/tesine-medie/tesina-progresso-ottocento-novecento.html","image":"http://www.skuola.net/plugins/opengraph/img/UpClooAppunti.png", "type": "content"}]'; 
header("Content-Type: application/javascript; charset=utf-8");
header("Age:0");
header("Cache-Control:max-age=15, must-revalidate");
if($callback)echo "{$callback}(";
echo $json;
if($callback)echo ");";