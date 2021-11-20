import express from "express";
import mysql from "mysql";
import cors from "cors";
import { encrypt, decrypt } from "./encryption";

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "PasswordManager",
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  const hashedPassword = encrypt(password);

  db.query(
    "INSERT INTO passwords (password, title, iv) VALUES (?,?,?)",
    [hashedPassword.password, title, hashedPassword.iv],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("SUCCESS");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("server is running");
});
