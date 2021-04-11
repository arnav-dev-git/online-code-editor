import fs from "fs";
import { exec } from "child_process";

// import WaitQueue from "wait-queue";
// const wq = new WaitQueue();

const saveFile = (name, data) => {
  return new Promise((resolve, reject) => {
    // console.log("Saving Files ...");
    fs.writeFile(name, data, (err) => {
      if (err) {
        console.log(err);
        reject("Error", err);
      }
      resolve("saved");
      //   console.log("File saved ...");
    });
  });
};

export const deleteFile = (name) => {
  fs.unlinkSync(name);
};

//function for executing c code
export const cExecuter = (data, input) => {
  return new Promise((resolve, reject) => {
    const fileName = "code.c";
    saveFile(fileName, data).then(() => {
      fs.writeFile("input.txt", input, (err) => {
        if (err) {
          //   console.log("nternam server error... ", err);
          reject("internal server error ...");
        }
        // resolve();
      });
    });

    //file saved successfully

    //generate the output file
    // const outputFileName = "output.txt";

    //compile c code
    exec("gcc " + fileName, (err, stdout, stderr) => {
      if (err) {
        // console.error("Exec error => ", err);
        resolve({
          err: true,
          output: err,
          error: stderr,
        });
      }
      //successfully compiled
      exec("./a.out < " + "input.txt", (err, stdout, stderr) => {
        if (err) {
          //   console.error("runtime error => ", err);
          resolve({
            err: true,
            output: err,
            error: stderr,
          });
        }
        // console.log("std op => ", stdout);
        resolve({ err: false, output: stdout });
      });
    });
  });
};

//* function for executing C++ code
export const cppExecuter = (data, input) => {
  return new Promise((resolve, reject) => {
    const fileName = "code.cpp";
    saveFile(fileName, data).then(() => {
      fs.writeFile("cppinput.txt", input, (err) => {
        if (err) {
          //   console.log("nternam server error... ", err);
          reject("internal server error ...");
        }
        // resolve();
      });
    });

    //file saved successfully

    //generate the output file
    // const outputFileName = "output.txt";

    //compile c code
    exec("gcc " + fileName + " -lstdc++", (err, stdout, stderr) => {
      if (err) {
        // console.error("Exec error => ", err);
        resolve({
          err: true,
          output: err,
          error: stderr,
        });
      }
      //successfully compiled
      exec("./a.out < " + "cppinput.txt", (err, stdout, stderr) => {
        if (err) {
          //   console.error("runtime error => ", err);
          resolve({
            err: true,
            output: err,
            error: stderr,
          });
        }
        // console.log("std op => ", stdout);
        resolve({ err: false, output: stdout });
      });
    });
  });
};

//* function for executing python code
export const pythonExecuter = (data, input) => {
  return new Promise((resolve, reject) => {
    const fileName = "code.py";
    saveFile(fileName, data).then(() => {
      fs.writeFile("pinput.txt", input, (err) => {
        if (err) {
          // console.log("Internam server error... ", err);
          reject("internal server error ...");
        }
      });
    });

    //file saved successfully

    //generate the output file
    // const outputFileName = "output.txt";

    //compile python code
    exec(
      "python3 " + fileName + " < " + "pinput.txt",
      (err, stdout, stderr) => {
        if (err) {
          // console.error("Exec error => ", err);
          resolve({
            err: true,
            output: err,
            error: stderr,
          });
        }
        resolve({
          err: false,
          output: stdout,
        });
      }
    );
  });
};

//* function for executing Javascript code
export const javascriptExecuter = (data, input) => {
  return new Promise((resolve, reject) => {
    const fileName = "code.js";
    saveFile(fileName, data).then(() => {
      fs.writeFile("jsinput.txt", input, (err) => {
        if (err) {
          // console.log("Internam server error... ", err);
          reject("internal server error ...");
        }
      });
    });

    //file saved successfully

    //generate the output file
    // const outputFileName = "output.txt";

    //compile python code
    exec("node " + fileName + " < " + "jsinput.txt", (err, stdout, stderr) => {
      if (err) {
        // console.error("Exec error => ", err);
        resolve({
          err: true,
          output: err,
          error: stderr,
        });
      }
      resolve({
        err: false,
        output: stdout,
      });
    });
  });
};

//* function for executing Java code
export const javaExecuter = (data, input) => {
  return new Promise((resolve, reject) => {
    const fileName = "Main.java";
    saveFile(fileName, data).then(() => {
      fs.writeFile("javainput.txt", input, (err) => {
        if (err) {
          //   console.log("nternam server error... ", err);
          reject("internal server error ...");
        }
        // resolve();
      });
    });

    //file saved successfully

    //generate the output file
    // const outputFileName = "output.txt";

    //compile c code
    exec("javac " + fileName, (err, stdout, stderr) => {
      if (err) {
        // console.error("Exec error => ", err);
        resolve({
          err: true,
          output: err,
          error: stderr,
        });
      }
      //successfully compiled
      exec("java Main < " + "javainput.txt", (err, stdout, stderr) => {
        if (err) {
          //   console.error("runtime error => ", err);
          resolve({
            err: true,
            output: err,
            error: stderr,
          });
        }
        // console.log("std op => ", stdout);
        resolve({ err: false, output: stdout });
      });
    });
  });
};
