let allStatuses = {};
let authToken = "";

const loginForm = document.getElementById('loginForm');
const statusPanel = document.getElementById('statusPanel');

loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/login', {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body:JSON.stringify({ username, password })
        });
        if(!res.ok) return alert('Nieprawidłowe dane');
        const data = await res.json();
        authToken = data.token;
        loginForm.style.display='none';
        statusPanel.style.display='flex';
        loadStatuses();
    } catch(err){ console.error(err); alert('Błąd logowania'); }
});

async function loadStatuses(){
    try{
        const res = await fetch('/api/statusy',{ headers:{ 'Authorization':'Bearer '+authToken } });
        if(!res.ok) return alert('Nie udało się pobrać statusów');
        const statuses = await res.json();
        allStatuses=statuses;
        updateTable(allStatuses);
    }catch(err){ console.error(err); }
}

function filterOrders(){
    const query=document.getElementById('searchInput').value.toLowerCase();
    const filtered=Object.fromEntries(Object.entries(allStatuses).filter(([key])=>key.toLowerCase().includes(query)));
    updateTable(filtered);
}

function updateTable(statuses){
    const tbody=document.getElementById("statusTable");
    tbody.innerHTML="";
    for(const order in statuses){
        const row=document.createElement("tr");
        const cellOrder=document.createElement("td"); cellOrder.innerText=order;
        const cellStatus=document.createElement("td");
        const span=document.createElement("span"); span.innerText=statuses[order];
        switch(statuses[order]){
            case "Oczekuje na odbiór": span.className="status Oczekuje"; break;
            case "W drodze": span.className="status Wdroze"; break;
            case "Dostarczone": span.className="status Dostarczone"; break;
            case "Opóźnione": span.className="status Opoznione"; break;
            default: span.className="status"; break;
        }
        cellStatus.appendChild(span);
        row.appendChild(cellOrder);
        row.appendChild(cellStatus);
        tbody.appendChild(row);
    }
}
setInterval(()=>{ if(authToken) loadStatuses(); },30000);
