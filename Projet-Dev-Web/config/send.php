<?php
include 'database.php';

// Fonction pour vérifier la validité de l'e-mail
function isEmailValid($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['pseudo'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $pseudo = $_POST['pseudo'];

    if (!empty($email) && !empty($password) && !empty($pseudo)) {
        $stmt = $conn->prepare("INSERT INTO Station (email, mot_de_passe, pseudo, date) VALUES (?, ?, ?, NOW())");

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Liaison des paramètres
        $stmt->bind_param("ss", $email, $hashedPassword, $pseudo);

//        $stmt->bind_param("sss", $email, $password, $pseudo);

        if ($stmt->execute()) {
            header('Location: ../index.html');
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    }
}
?>