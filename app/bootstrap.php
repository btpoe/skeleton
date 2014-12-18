<?php

$views = dirname(dirname( __FILE__ )) . '/resources/views';

$page = $_GET['q'];
if ($page == '') $page .= 'home/';
if (substr($page, -1) == '/') $page .= 'index';

$bodyClass = 'page-' . explode('/', trim($page, '/'))[0] . ' page-' . str_replace('/', '-', trim($page, '/'));
$page = $views . '/' . $page . '.php';

include $views . '/layout/default.php';