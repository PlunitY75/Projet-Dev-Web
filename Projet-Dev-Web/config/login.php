<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
session_start(); // Démarrer la session
require_once 'include2.php';
include 'database.php';
if (isset($_SESSION['email'])) {
    header('Location: index.php');
    exit();
}
if (!empty($_POST)) {
    extract($_POST);
    $response = array();

    if (isset($email) && isset($password)) {
        // Validation des champs
        if (empty($email) || empty($password)) {
            $response['error'] = "Veuillez saisir l'email et le mot de passe.";
        } else {
            // Requête pour vérifier si l'utilisateur existe
            $stmt = $conn->prepare("SELECT * FROM Station WHERE email = ? AND mot_de_passe = ?");
            $stmt->bind_param("ss", $email, $password);
            $stmt->execute();
            $result = $stmt->get_result();

            // Vérifier si l'utilisateur existe
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $response['success'] = "Connexion réussie.";
                $response['email'] = $user['email'];
                $response['pseudo'] = $user['pseudo'];
                $response['mot_de_passe'] = $user['mot_de_passe'];
            } else {
                $response['error'] = "L'email ou le mot de passe est incorrect.";
            }

            $stmt->close();
        }
    } else {
        $response['error'] = "Une erreur s'est produite.";
    }

    // Renvoyer la réponse au format JSON
    echo json_encode($response);
}
?>