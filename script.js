// ELEMENTY
const loginForm = document.getElementById("loginForm");
const statusPanel = document.getElementById("statusPanel");
const clientPanel = document.getElementById("clientPanel");

// PRÓBY LOGOWANIA
let failedAttempts = 0;

// ELEMENTY PYTANIA POMOCNICZEGO
let helperBox;
let helperInput;
let helperButton;
let helperVisible = false;

// FUNKCJA WYŚWIETLENIA PYTANIA POMOCNICZEGO
function showHelperQuestion() {
    if (helperVisible) return;

    helperVisible = true;

    helperBox = document.createElement("div");
    helperBox.style.marginTop = "15px";
    helperBox.style.padding = "10px";
    helperBox.style.border = "1px solid #c0392b";
    helperBox.style.background = "#fdecea";
    helperBox.style.borderRadius = "8px";
    helperBox.style.textAlign = "center";

    const question = "Co się robi w operze?";
    const correctAnswer = "śpiewa";

    helperBox.innerHTML = `
        <p><b>Niepoprawne dane logowania!</b><br>
        Pytanie pomocnicze:<br><i>${question}</i></p>
    `;

    helperInput = document.createElement("input");
    helperInput.placeholder = "Odpowiedź...";
    helperInput.style.padding = "8px";
    helperInput.style.width = "80%";
    helperInput.style.borderRadius = "6px";
    helperInput.style.border = "1px solid #ccc";
    helperInput.style.marginTop = "8px";

    helperButton = document.createElement("button");
    helperButton.innerText = "Sprawdź";
    helperButton.style.padding = "8px";
    helperButton.style.width = "50%";
    helperButton.style.marginTop = "10px";
    helperButton.style.background = "#2980b9";
    helperButton.style.color = "#fff";
    helperButton.style.border = "none";
    helperButton.style.borderRadius = "8px";
    helperButton.style.cursor = "pointer";

    helperButton.onclick = () => {
        if (helperInput.value.trim().toLowerCase() === correctAnswer) {
            alert("Dobrze! Logowanie odblokowane.");
            loginOK();
        } else {
            alert("Zła odpowiedź! Spróbuj ponownie.");
        }
    };

    helperBox.appendChild(helperInput);
    helperBox.appendChild(helperButton);
    loginForm.appendChild(helperBox);
}

// FUNKCJA LOGOWANIA OK
function loginOK() {
    loginForm.style.display = "none";
    clientPanel.style.display = "block";
    statusPanel.style.display = "block";
}

// OBSŁUGA LOGOWANIA
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
        loginOK();
    } else {
        failedAttempts++;
        showHelperQuestion();
    }
});

// STATUSY — GENEROWANIE & SORTOWANIE
let orderData = [];

// Pobieranie przykładowych statusów
async function loadStatuses() {
    const res = await fetch("/api/statusy");
    orderData = await res.json();
    renderTable(orderData);
}

function renderTable(data) {
    const table = document.getElementById("statusTable");
    table.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.order}</td>
            <td><span class="status ${item.status}">${item.status}</span></td>
        `;

        table.appendChild(row);
    });
}

// SORTOWANIE PO STATUSIE
let sortDirection = 1;

function sortByStatus() {
    orderData.sort((a, b) => {
        if (a.status < b.status) return -1 * sortDirection;
        if (a.status > b.status) return 1 * sortDirection;
        return 0;
    });
    sortDirection *= -1;
    renderTable(orderData);
}

// WYSZUKIWANIE
function filterOrders() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    const filtered = orderData.filter(o => o.order.toLowerCase().includes(q));
    renderTable(filtered);
}

// START
loadStatuses();
