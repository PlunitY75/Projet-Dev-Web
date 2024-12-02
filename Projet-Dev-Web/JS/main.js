let coordinatesSet = new Set();
var markers;

function colorMarker(color) {
    const svgTemplate = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
          <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
          <path stroke="#fff" fill="${color}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>`;

    return L.divIcon({
        className: "marker",
        html: svgTemplate,
        iconSize: [40, 40],
        iconAnchor: [12, 24],
        popupAnchor: [7, -16],
    });
}
function updateMenuVisibility() {
    const loginBox = document.getElementById('loginBox');
    const htmlElement = document.documentElement;

    if (loginBox && htmlElement) {
        if (htmlElement.classList.contains('is-connected')) {
            loginBox.style.display = 'none';
        } else {
            loginBox.style.display = 'block';
        }
    } else {
        console.error('One or more elements not found.');
    }
}


function showProfile() {
    // Récupérer le nom d'utilisateur à partir de la session PHP
    $.ajax({
        type: 'GET',
        url: 'config/send.php',
        success: function (response) {
            if (response && response.pseudo) {
                const usernameElement = document.getElementById('username');
                usernameElement.textContent = response.pseudo;
                document.getElementById('profileSection').classList.toggle('active');
            } else {
                alert('Réponse invalide ou propriété "username" manquante.');
            }
        },
        error: function () {
            alert('Erreur lors de la récupération du nom d\'utilisateur');
        }
    });
}


function showMenu() {
    document.querySelector('.menu').classList.toggle('active');
    updateMenuVisibility(); // Mettez à jour la visibilité à chaque ouverture du menu
}

function logout() {
    $.ajax({
        type: 'GET',
        url: 'deconnexion.php',
        success: function () {
            // Rediriger vers la page d'accueil après déconnexion
            window.location.replace('index.html');
        },
        // error: function () {
        //     alert('Erreur lors de la déconnexion');
        // }
    });
}

$(document).ready(function () {
    updateMenuVisibility();
    var mymap = L.map('map').setView([46.603, 1.888], 6);
    let jsonData;

    markers = L.markerClusterGroup();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);

    document.getElementById('applyFiltersBtn').addEventListener('click', FilterMarkers);

    // Charger le fichier json
    $.get('./stations.json', function (data) {
        jsonData = data;
        let groupedStations = {};
        let services1 = new Set();
        let dictionary = new Map();
        let fuelTypes = new Set();

        // Récupérez tous les noms de départements uniques
        const uniqueDepartments = [...new Set(jsonData.map(record => record.fields.dep_name))];

        // Remplissez la liste déroulante avec les options
        const departmentSelect = document.getElementById('department');
        uniqueDepartments.forEach(department => {
            const option = document.createElement('option');
            option.value = department;
            option.text = department;
            departmentSelect.appendChild(option);
        });

        jsonData.forEach(function (record) {
            if (!record.fields || !record.fields.geom) {
                return; // Ignorer les enregistrements sans propriétés geom
            }

            let coordinates = record.fields.geom;
            let coordinatesKey = coordinates.join(',');

            if (!groupedStations[coordinatesKey]) {
                groupedStations[coordinatesKey] = {
                    coordinates: coordinates,
                    typesEssence: [],
                    services: []
                };
            }

            groupedStations[coordinatesKey].typesEssence.push({
                nom: record.fields.prix_nom,
                prix: record.fields.prix_valeur,
                ville: record.fields.ville,
            });

            fuelTypes.add(record.fields.prix_nom);

            if (record.fields && record.fields.services_service) {
                let services = record.fields.services_service.split('//');
                services.forEach(function (service) {
                    if (!dictionary.has(service) && !services1.has(service)) {
                        dictionary.set(service, []);
                        services1.add(service.trim());
                    }
                    if (!groupedStations[coordinatesKey].services.includes(service)) {
                        groupedStations[coordinatesKey].services.push(service);
                        dictionary.get(service).push(groupedStations[coordinatesKey]);
                    }
                });
            }
        });

        services1.forEach(function (value) {
            const select = document.getElementById("servicePackage");
            const option = document.createElement("option");
            option.value = value;
            option.text = value;

            select.appendChild(option);
        });

        fuelTypes.forEach(function (value) {
            const select = document.getElementById("fuelType");
            const option = document.createElement("option");
            option.value = value;
            option.text = value;

            select.appendChild(option);
        });

        const priceInput = document.getElementById('price');

        // Sélectionnez l'élément span pour afficher la valeur actuelle
        const priceValue = document.getElementById('priceValue');

        document.getElementById('price');
        document.getElementById('priceValue');

        if (priceInput) {
            priceInput.addEventListener('input', function () {
                priceValue.textContent = (priceInput.value / 10).toFixed(2) + ' €';
            });
        }

        for (const key in groupedStations) {
            const station = groupedStations[key];
            const coordinates = station.coordinates;
            const typesEssence = station.typesEssence;

            let popupContent = '<b>Types d\'essence:</b><br>';

            typesEssence.forEach(function (essence) {
                popupContent += `- ${essence.nom}: ${essence.prix} €<br>`;
            });

            let marker = L.marker([coordinates[0], coordinates[1]], {
                opacity: 1,
                icon: colorMarker('#6cb3d9')
            }).bindPopup(popupContent);

            markers.addLayer(marker);
        }

        mymap.addLayer(markers);
    });

    const priceInput = document.getElementById('price');
    const priceValue = document.getElementById('priceValue');
    const maxPriceValue = document.getElementById('maxPriceValue');

    priceInput.addEventListener('input', function () {
        const minPrice = (priceInput.value / 100).toFixed(2);
        const maxPrice = (maxPriceValue.textContent / 100).toFixed(2);
        priceValue.textContent = minPrice;
        maxPriceValue.textContent = maxPrice;
    });

    function FilterMarkers() {
        const minPrixEssence = parseFloat(document.getElementById("minPrice").value) || 0;
        const maxPrixEssence = parseFloat(document.getElementById("maxPrice").value) || Number.MAX_VALUE;
        const TypeEssence = document.getElementById("fuelType").value;
        const SelectedServices = Array.from(document.querySelectorAll("#servicePackage option:checked")).map(option => option.value);
        const selectedDepartment = document.getElementById('department').value;

        // Réinitialiser les données à partir de la copie non filtrée
        let filteredData = [...jsonData];

        if (selectedDepartment) {
            // Filtrer les enregistrements par département
            filteredData = filteredData.filter(record => record.fields.dep_name === selectedDepartment);
        }

        // Calculer le centre de la carte pour les données filtrées
        const center = calculateCenter(filteredData);

        // Effectuer le zoom sur les données filtrées
        mymap.setView(center, 10); // Ajustez le niveau de zoom selon vos besoins

        markers.clearLayers();

        filteredData.forEach(function (record) {
            // Vérifier les conditions de filtrage ici
            if (record.fields && record.fields.geom) {
                const prixValeur = parseFloat(record.fields.prix_valeur) || 0;
                const typeEssence = record.fields.prix_nom;
                const services = record.fields.services_service ? record.fields.services_service.split('//') : [];

                if (prixValeur >= minPrixEssence && prixValeur <= maxPrixEssence &&
                    (TypeEssence === "" || typeEssence === TypeEssence) &&
                    (SelectedServices.length === 0 || SelectedServices.some(service => services.includes(service)))
                ) {
                    const coordinates = record.fields.geom;
                    const coordinatesKey = coordinates.join(',');

                    const popupContent = '<b>Types d\'essence:</b><br>' +
                        `- ${record.fields.prix_nom}: ${record.fields.prix_valeur} €<br>`

                    const marker = L.marker([coordinates[0], coordinates[1]], {
                        opacity: 1,
                        icon: colorMarker('#6cb3d9')
                    }).bindPopup(popupContent);

                    markers.addLayer(marker);
                }
            }
        });

        mymap.addLayer(markers);
    }


});

function calculateCenter(data) {
    // Fonction pour calculer le centre des données
    // Vous pouvez personnaliser cela en fonction de vos besoins
    // Dans cet exemple, cela calcule simplement la moyenne des coordonnées
    const latitudes = data.map(record => record.fields.geom[0]);
    const longitudes = data.map(record => record.fields.geom[1]);

    const centerLat = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
    const centerLng = longitudes.reduce((sum, lng) => sum + lng, 0) / longitudes.length;

    return [centerLat, centerLng];
}
