function getRandomStatus() {
  const statuses = ["Oczekuje na odbiór", "W drodze", "Dostarczone", "Opóźnione"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function generateOrders() {
  const orders = {};
  for(let i=1; i<=10; i++){
    const orderNum = "ZAM" + String(i).padStart(3,"0");
    orders[orderNum] = getRandomStatus();
  }
  return orders;
}

export default function handler(req, res) {
  const auth = req.headers.authorization;
  if(auth !== "Bearer demo-token") {
    return res.status(401).json({ error: "Brak dostępu" });
  }

  const orders = generateOrders();
  res.status(200).json(orders);
}

