const map = L.map('map').setView([42.6977, 23.3219], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let fireIncidents = [];
let currentClickedLocation = null;

const modal = document.getElementById('fireForm');
const closeBtn = document.getElementsByClassName('close')[0];
const form = document.getElementById('reportForm');

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

map.on('click', function(e) {
    currentClickedLocation = e.latlng;
    modal.style.display = 'block';
    
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('fireDate').value = now.toISOString().slice(0, 16);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!currentClickedLocation) return;
    
    const fireType = document.getElementById('fireType').value;
    const fireDate = document.getElementById('fireDate').value;
    const description = document.getElementById('description').value;

    const fireIncident = {
        id: Date.now(),
        lat: currentClickedLocation.lat,
        lng: currentClickedLocation.lng,
        type: fireType,
        date: fireDate,
        description: description
    };

    fireIncidents.push(fireIncident);

    addFireMarker(fireIncident);

    modal.style.display = 'none';
    form.reset();
    currentClickedLocation = null;
});

function addFireMarker(incident) {
    const fireIcon = L.divIcon({
        html: '<div class="fire-marker" style="font-size: 24px;">🔥</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
        className: 'custom-fire-icon'
    });
    
    const popupContent = `
        <div style="min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: #ff4444;">🔥 Fire Incident</h3>
            <p><strong>Type:</strong> ${incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}</p>
            <p><strong>Date:</strong> ${new Date(incident.date).toLocaleString()}</p>
            ${incident.description ? `<p><strong>Details:</strong> ${incident.description}</p>` : ''}
            <p><strong>Location:</strong> ${incident.lat.toFixed(6)}, ${incident.lng.toFixed(6)}</p>
        </div>
    `;
    const marker = L.marker([incident.lat, incident.lng], { icon: fireIcon })
        .addTo(map)
        .bindPopup(popupContent);
    incident.marker = marker;
}

const sampleIncidents = [
    {
        id: 1,
        lat: 42.7045,
        lng: 23.3341,
        type: 'wildfire',
        date: '2024-01-15T14:30',
        description: 'Small wildfire near Vitosha mountain'
    },
    {
        id: 2,
        lat: 42.6885,
        lng: 23.3189,
        type: 'structure',
        date: '2024-01-14T09:15',
        description: 'Building fire in residential area'
    }
];

sampleIncidents.forEach(incident => {
    fireIncidents.push(incident);
    addFireMarker(incident);
});

const instructionsPopup = L.popup()
    .setLatLng([42.6977, 23.3219])
    .setContent(`
        <div style="text-align: center; padding: 10px;">
            <h3>🗺️ Fire Incident Map</h3>
            <p>Click anywhere on the map to report a fire incident!</p>
            <p>🔥 Fire markers show reported incidents</p>
        </div>
    `)  
    .openOn(map);

setTimeout(() => {
    map.closePopup(instructionsPopup);
}, 5000);
