const map = L.map('map').setView([42.7339, 25.4858], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

   var marker = L.marker([42.6977, 23.3219]).addTo(map);
  const cities = [
    { name: "Sofia", coords: [42.6977, 23.3219], url: "sofia.html" }
  ];
