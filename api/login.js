export default function handler(req, res) {
  const { username, password } = req.body;

  const accounts = [
    { username: "DAMIAN", password: "ZIEMNIAKIIBULKA" },
    { username: "MATEUSZ",  password: "SUPERHASLO123" },
    { username: "DOMINIKA",   password: "TEST1234" }
  ];

  const match = accounts.find(
    (acc) => acc.username === username && acc.password === password
  );

  if (match) {
    res.status(200).json({ token: "demo-token" });
  } else {
    res.status(401).json({ error: "Nieprawidłowe dane" });
  }
}


