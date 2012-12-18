<?php
$callback = @$_GET['callback'];
$json = '[{"title":"Dependency Injection ZF1 ulteriore esempio","url":"http://localhost/wp/?p=1233","image":""},{"title":"Usare ZF1 e ZF2 insieme","url":"http://localhost/wp/?p=1222","image":""},{"title":"Zend_Di utilizzo con Zend_Cache","url":"http://localhost/wp/?p=1258","image":""},{"title":"Pimple, Dependency Injection su Zend\Cache","url":"http://localhost/wp/?p=1272","image":""},{"title":"Aggiungere Twig Template Engine ad un plugin WordPress","url":"http://localhost/wp/?p=1237","image":""}]'; 
header("Content-Type: application/javascript; charset=utf-8");
header("Age:0");
header("Cache-Control:max-age=15, must-revalidate");
if($callback)echo "{$callback}(";
echo $json;
if($callback)echo ");";