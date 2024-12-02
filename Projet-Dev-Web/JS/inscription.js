$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault(); // Empêcher la soumission normale du formulaire

        var formData = $(this).serialize(); // Sérialiser les données du formulaire

        $.ajax({
            type: 'POST',
            url: 'config/inscription.php',
            data: formData,
            dataType: 'json', // Indiquer que la réponse est au format JSON
            success: function (response) {
                if (response.success) {
                    window.location.replace('index.php');
                     // Inscription réussie (vous pouvez ajuster cette logique)
                    // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
                } else if (response.error) {
                    alert(response.error); // Afficher le message d'erreur
                }
            },
            error: function () {
                alert('Erreur lors de la requête AJAX');
            }
        });
    });
});