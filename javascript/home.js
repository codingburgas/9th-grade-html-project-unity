const map = L.map('map').setView([42.7339, 25.4858], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

   var marker = L.marker([42.6977, 23.3219]).addTo(map);
  const cities = [
    { name: "Sofia", coords: [42.6977, 23.3219], url: "sofia.html" }
  ];

   let darkmode = localStorage.getItem('darkmode')
  const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode != "active" ? enableDarkmode() : disableDarkmode()
})