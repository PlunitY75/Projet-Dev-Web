var logoutBox = $('#logoutBox');
$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault(); // Empêcher la soumission normale du formulaire

        var formData = $(this).serialize(); // Sérialiser les données du formulaire

        $.ajax({
            type: 'POST',
            url: 'config/login.php',
            data: formData,
            dataType: 'json', // Indiquer que la réponse est au format JSON
            success: function (response) {
                if (response.success) {
                    // alert(response.pseudo);
                    // logoutBox.text("Déconnexion");
                    // Connexion réussie, rediriger vers index.html
                    window.location.replace('index.php');
                } else if (response.error) {
                    $('#error-message').text(response.error); // Afficher le message d'erreur en rouge
                }
            },
            error: function () {
                alert('Erreur lors de la requête AJAX');
            }
        });
    });
});