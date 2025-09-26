<?php
// Bisa ditambahkan PHP nanti jika perlu logging atau analytics
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>uSpotly – Street Parking Finder NYC</title>
  <meta name="description" content="Find legal street parking in NYC quickly and easily with uSpotly. Clean white modern style, free and mobile-friendly.">
  <meta name="keywords" content="NYC parking, street parking NYC, parking rules NYC, find parking NYC, uSpotly, clean, modern">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#ffffff"/>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <header>
    <h1><a href="index.php">uSpotly</a></h1>
    <nav>
      <button class="btn" onclick="locateUser()">My Location</button>
      <button class="btn" onclick="showNearest()">Nearest Parking</button>
      <button class="btn" onclick="window.location.href='privacy.html'">Privacy</button>
      <button class="btn" onclick="window.location.href='features.html'">Features</button>
      <button class="btn" id="themeToggle">🌙 Dark</button>
    </nav>
  </header>

  <div id="map"></div>

  <footer>
    <div class="ad-banner" id="adBanner">
      <div class="ad-box">Ad 1</div>
      <div class="ad-box">Ad 2</div>
      <div class="ad-box">Ad 3</div>
      <div class="ad-box">Ad 4</div>
      <div class="ad-box">Ad 5</div>
      <button class="close-ad" onclick="hideAd()">×</button>
    </div>
    <button class="btn show-ad-btn" id="showAdBtn" onclick="showAd()">Show Ads</button>
    <div class="footer-text">&copy; 2025 Street Parking Finder NYC</div>
  </footer>

  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="app.js"></script>
</body>
</html>
