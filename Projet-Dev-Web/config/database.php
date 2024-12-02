<?php
if (!defined('HOST')) {
    define('HOST', 'localhost');
}

if (!defined('DB_NAME')) {
    define('DB_NAME', 'Station');
}

if (!defined('DB_USER')) {
    define('DB_USER', 'root');
}

if (!defined('DB_PASSWORD')) {
    define('DB_PASSWORD', 'root');
}

$conn = new mysqli(HOST, DB_USER, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
