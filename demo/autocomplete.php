<?php
$callback = $_GET['callback'];
$q = @$_GET['q'];
$list = array('ciao','ciao ping');
$json = json_encode($list);
echo "{$callback}({$json})";
?>