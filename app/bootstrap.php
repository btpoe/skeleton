<?php

require dirname(dirname( __FILE__ )) . '/vendor/autoload.php';

use Philo\Blade\Blade;

class App {
    public function environment() {
        return 'local';
    }
}

function app() {
    return new App;
}

$root = dirname(dirname( __FILE__ ));
$views = $root . '/resources/views';
$cache = $root . '/app/tmp/cache';

$page = trim($_SERVER['REQUEST_URI'], '/');
if ($page == '') $page = 'home';
if (substr_count($page, '/') == 0) $page .= '/index';

//$bodyClass = 'page-' . explode('/', trim($page, '/'))[0] . ' page-' . str_replace('/', '-', trim($page, '/'));

$blade = new Blade($views, $cache);
echo $blade->view()->make($page);