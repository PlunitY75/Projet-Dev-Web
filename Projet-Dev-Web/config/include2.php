<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start(); // Démarrer la session si elle n'est pas déjà démarrée
}
?>