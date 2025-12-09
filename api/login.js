export default function handler(req, res) {
  const { username, password } = req.body;
  if(username === "admin" && password === "1234"){
    res.status(200).json({ token: "demo-token" });
  } else {
    res.status(401).json({ error: "Nieprawidłowe dane" });
  }
}
