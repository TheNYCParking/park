// app.js

// Initialize map
const map = L.map('map').setView([39.8283, -98.5795], 4); // USA center
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom:19,
  attribution:'© OpenStreetMap'
}).addTo(map);

let userMarker, nearestMarker;

// Locate user
function locateUser(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      const {latitude, longitude} = pos.coords;
      if(userMarker) map.removeLayer(userMarker);
      userMarker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup("📍 You are here").openPopup();
      map.setView([latitude, longitude], 13);
    }, err=>{ alert("❌ Failed: "+err.message); });
  } else alert("❌ Geolocation not supported.");
}

// Show nearest parking (example: NYC dataset)
async function showNearest(){
  if(!userMarker){ alert("📍 Enable My Location first."); return; }
  const userLatLng = userMarker.getLatLng();
  try{
    const res = await fetch("https://data.cityofnewyork.us/resource/dv6r-f4he.json?$limit=200");
    const data = await res.json();
    let nearest = null, minDist = Infinity;
    data.forEach(item=>{
      if(item.latitude && item.longitude){
        const lat = parseFloat(item.latitude), lng = parseFloat(item.longitude);
        const dist = userLatLng.distanceTo([lat, lng]);
        if(dist<minDist){ nearest={lat,lng,rule:item.sign_description}; minDist = dist; }
      }
    });
    if(nearest){
      if(nearestMarker) map.removeLayer(nearestMarker);
      nearestMarker = L.circleMarker([nearest.lat, nearest.lng],{
        radius:10,
        color:'#0f0',
        fillColor:'#0f0',
        fillOpacity:0.8
      }).addTo(map)
        .bindPopup(`🚗 ${nearest.rule}`).openPopup();
      map.setView([nearest.lat, nearest.lng],15);
    } else alert("❌ No parking data nearby.");
  } catch(e){ alert("⚠️ Error fetching data."); }
}

// Banner hide/show
const adBanner = document.getElementById("adBanner");
const showAdBtn = document.getElementById("showAdBtn");
function hideAd(){ adBanner.style.display="none"; showAdBtn.style.display="inline-block"; }
function showAd(){ adBanner.style.display="flex"; showAdBtn.style.display="none"; }

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
});
if(localStorage.getItem("darkMode")==="1") document.body.classList.add("dark");

// Optional: register service worker
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("/sw.js")
    .then(()=>console.log("✅ SW Registered"))
    .catch(err=>console.error("SW fail:",err));
}
