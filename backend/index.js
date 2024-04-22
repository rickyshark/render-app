import express from "express";
import cors from "cors";
import pg from "pg";
import {
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  FRONTEND_URL,
  PORT,
} from "./config.js";

const app = express();
const pool = new pg.Pool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  /*     idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0, */
});
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log(result.rows);
  });
});

app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");

  res.send({
    fecha: [
      {
        fecha: result.rows[0].now,
        Nombre: "Ricky",
        Apellido: "Montero",
        Edad: 23,
      },
      {
        fecha: result.rows[0].now,
        Nombre: "Thalia",
        Apellido: "Terrero",
        Edad: 19,
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
