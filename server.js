import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
import path from "path";
import { fileURLToPath } from "url";

// ЭТО для ES-модуля (type: "module" в package.json)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Даем доступ к статическим файлам из текущей папки
app.use(express.static(__dirname));

const WINNING_NUMBER = Math.floor(Math.random() * 999) + 1;
const usedUsers = new Set();

app.post("/api/check", (req, res) => {
  const { user, number } = req.body;
  const num = parseInt(number);
  if (!num || num < 1 || num > 999) {
    return res.json({ message: "Введите число от 1 до 999" });
  }
  if (usedUsers.has(user)) {
    return res.json({ message: "У тебя уже была попытка!" });
  }
  usedUsers.add(user);
  if (num === WINNING_NUMBER) {
    return res.json({ message: "🎉 Поздравляю, ты открыл сейф! Напиши админу для приза" });
  } else {
    return res.json({ message: "Не угадал! Попробуй при следующей покупке" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
