<?
header('Content-Modified: 204');
header('HTTP/1.0 204 No Content');
header('Content-Length: 0', true);
header('Last-Modified: '.gmdate('D, d M Y H:i:s') . ' GMT'); 
?>
