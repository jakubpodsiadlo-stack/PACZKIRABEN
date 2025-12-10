<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<title>PANEL LOGISTYKA RABEN</title>
<link rel="stylesheet" href="style.css">
<!-- Dodajemy Google Font: Poppins -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">
</head>
<body>

<!-- Panel klienta (ukryty na start) -->
<div id="clientPanel" style="display:none;">
    <h1>Panel Klienta</h1>
    <p>Witaj, tu możesz śledzić swoje paczki i statusy zamówień.</p>
</div>

<h2 id="mainHeader">PANEL LOGISTYKA RABEN</h2>

<form id="loginForm">
<input type="text" id="username" placeholder="Login" required>
<input type="password" id="password" placeholder="Hasło" required>
<button type="submit">Zaloguj</button>
</form>

<div id="statusPanel">
<input type="text" id="searchInput" placeholder="Wyszukaj numer zamówienia..." oninput="filterOrders()">
<table>
<thead>
<tr>
    <th>Numer zamówienia</th>
    <th onclick="sortByStatus()" style="cursor:pointer;">Stan &#x25B2;&#x25BC;</th>
</tr>
</thead>
<tbody id="statusTable"></tbody>
</table>
</div>

<script src="script.js" defer></script>
</body>
</html>

