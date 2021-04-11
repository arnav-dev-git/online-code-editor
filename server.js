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

app.listen(5000, () => {
  console.log("server is running ...");
});
