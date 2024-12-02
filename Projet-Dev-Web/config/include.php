<?php
include 'database.php'; // Démarrer la session
session_start(); // Démarrer la session

$isConnected = isset($_SESSION['email']);

// Ajouter ou supprimer la classe "is-connected" en fonction de l'état de connexion
$htmlClass = $isConnected ? 'is-connected' : '';
?>