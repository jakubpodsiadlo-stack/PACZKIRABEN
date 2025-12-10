let allStatuses = {};
let authToken = "";
let sortAsc = true; // kontrola kierunku sortowania

const loginForm = document.getElementById('loginForm');
const statusPanel = document.getElementById('statusPanel');
const clientPanel = document.getElementById('clientPanel');

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
        const data = await res.json();
        if(!res.ok) return alert('Nieprawidłowe dane');
        
        authToken = data.token;

        // Ukrywamy login i pokazujemy panele
        loginForm.style.display='none';
        statusPanel.style.display='flex';
        clientPanel.style.display='block';

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

function sortByStatus(){
    const entries = Object.entries(allStatuses);
    entries.sort((a,b)=>{
        if(a[1] < b[1]) return sortAsc ? -1 : 1;
        if(a[1] > b[1]) return sortAsc ? 1 : -1;
        return 0;
    });
    sortAsc = !sortAsc; // zmiana kierunku sortowania przy kolejnym kliknięciu
    const sortedStatuses = Object.fromEntries(entries);
    updateTable(sortedStatuses);
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
