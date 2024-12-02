<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StationFinder</title>
    <!-- CSS -->
    <link rel="stylesheet" href="CSS/style.css">
    <?php include 'config/include.php'; ?>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js"></script> <!-- Pour récupérer les données-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
    <script src ="https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js"></script>

</head>
<body>
<header>
    <nav class="navbar">
        <a href="index.html" class="logo">StationFinder</a>
        <button class="login" onclick="showMenu()"><i class="fas fa-user"></i></button>
        <div class="menu">
            <ul>
                <li><a href="login.html" class="box" id="loginBox" >Se connecter</a></li>';
                <li><a href="inscription.html" class="box" id="SignUpBox" >S\'inscrire</a></li>';
            </ul>
        </div>
        <div id="profileSection" class="profile-section">
            <p id="username" class="animated-username"></p>
        </div>
    </nav>
</header>



<div class="container">
    <div class="filters">
        <label for="minPrice">Prix min:</label>
        <input type="number" id="minPrice" name="minPrice" min="0" max="2.80" step="0.01"> €

        <label for="maxPrice">Prix max:</label>
        <input type="number" id="maxPrice" name="maxPrice" min="0" max="2.8" step="0.01"> €

        <!--<label for="price">Prix:</label>
        <input type="range" id="price" name="price" min="0" max="30" step="0.1" value="0">
        <span id="priceValue">0</span> -->

        <label for="fuelType">Choix des carburants:</label>
        <select id="fuelType" name="fuelType">
            <option value="">--Select Fuel Type--</option>
            <!-- Add more fuel types as needed -->
        </select>

        <p>Choix du ou des services</p>
        <form>
            <select id="servicePackage" name="Sélectionner le ou les packages de services">


            </select>

        </form>
        <label for="department">Département :</label>
        <select id="department" name="department">
            <option value="">-- Sélectionnez un département --</option>
            <!-- Ajoutez les options pour tous les départements -->
        </select>
        <button id="applyFiltersBtn">Appliquer</button>
    </div>

</div>
<div id="maDiv"></div>
<div id="map" style="height: 100%;"></div>
<script src="JS/main.js"></script>

</body>
</html>
