<?php
require_once 'include2.php';
include 'database.php';

if (!empty($_POST)) {
    extract($_POST);
    $valid = true;
    $response = array();

    if (isset($pseudo) && isset($email) && isset($password)) {
        // Validation des champs
        if (empty($pseudo) || empty($email) || empty($password)) {
            $response['error'] = "Veuillez remplir tous les champs.";
        } else {
            // Requête pour insérer l'utilisateur dans la base de données
            $stmt = $conn->prepare("INSERT INTO station (pseudo, email, mot_de_passe, date) VALUES (?, ?, ?, NOW())");
            $stmt->bind_param("sss", $pseudo, $email, $password);

            if ($stmt->execute()) {
                $response['success'] = "Inscription réussie.";
            } else {
                http_response_code(500); // Code HTTP pour erreur interne du serveur
                $response['error'] = "Une erreur s'est produite lors de l'inscription.";
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