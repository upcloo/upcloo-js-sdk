<?php
$callback = $_GET['callback'];
$q = @$_GET['q'];
$list = array('ciao','ciao ping');
$json = json_encode($list);
header("Content-Type: application/javascript; charset=utf-8");
header("Age:0");
header("Cache-Control:max-age=15, must-revalidate");
echo "{$callback}({$json});";
?>