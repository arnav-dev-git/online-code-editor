import express from "express";
import cors from "cors";
import { router } from "./router.js";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use("/code", router);

app.get("/", (req, res) => {
  res.send("hello api");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running ...");
});
