import express from "express";

// import WaitQueue from "wait-queue";
// const wq = new WaitQueue();

import {
  cExecuter,
  pythonExecuter,
  cppExecuter,
  javascriptExecuter,
  javaExecuter,
  deleteFile,
} from "./compiler/compiler.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "code" });
});

let op = "";

router.post("/", async (req, res) => {
  if (req.body.lang === "c") {
    cExecuter(req.body.code, req.body.input).then((data) => {
      // console.log(data);
      // deleteFile("code.c");
      res.json(data);
    });
  } else if (req.body.lang === "cpp") {
    cppExecuter(req.body.code, req.body.input).then((data) => {
      // console.log(data);
      // deleteFile("code.c");
      res.json(data);
    });
  } else if (req.body.lang === "python") {
    pythonExecuter(req.body.code, req.body.input).then((data) => {
      // console.log(data);
      // deleteFile("code.c");
      res.json(data);
    });
  } else if (req.body.lang === "javascript") {
    javascriptExecuter(req.body.code, req.body.input).then((data) => {
      // console.log(data);
      // deleteFile("code.c");
      res.json(data);
    });
  } else if (req.body.lang === "java") {
    javaExecuter(req.body.code, req.body.input).then((data) => {
      // console.log(data);
      // deleteFile("code.c");
      res.json(data);
    });
  } else {
    res.json({ error: "Invalid language" });
  }
});

export { router };
