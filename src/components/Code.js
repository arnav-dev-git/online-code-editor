import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// import MonacoEditor from "react-monaco-editor";
import Editor, { useMonaco } from "@monaco-editor/react";

//^ @themes
import { nightOwl } from "./style";

import "./Code.css";
import { c, cpp, python, javascript, java } from "./defaultCode";

const Code = () => {
  const monaco = useMonaco();
  const monacoRef = useRef(null);
  const [lang, setLang] = useState("c");
  const [code, setCode] = useState(c);
  const [output, setOutput] = useState("Output");
  const [input, setInput] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);

  const [outputLoading, setOutputLoading] = useState(false);

  const submitHandler = async (e) => {
    setOutputLoading(true);
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:5000/code",
        // url: "https://code-editor-x.herokuapp.com/code",
        data: {
          code: code,
          input: input,
          lang: lang,
        },
      });
      // console.log(data, "<=data");

      if (data.error) {
        setOutput(data.error);
      } else {
        setOutput(
          typeof data.output === "object"
            ? data.output.killed === true
              ? "Infinite Loop Detected"
              : null
            : data.output
        );
      }

      setOutputLoading(false);
    } catch (err) {
      console.log(err);
      setOutputLoading(false);
    }
  };

  const updateCode = (newCode, e) => {
    setCode(newCode);
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  function handleEditorDidMount(editor, monaco) {
    // monacoRef.current = await editor;
    monacoRef.current = editor;
    console.log(monacoRef.current);
    setIsEditorReady(true, () => {
      monacoRef.current = editor;
    });
    monaco.editor.defineTheme("my-theme", nightOwl);
  }

  function handleLangSelector(d) {
    setLang(d.target.value);
    // console.log(lang);
    if (d.target.value === "c") {
      setCode(c);
    } else if (d.target.value === "cpp") {
      setCode(cpp);
    } else if (d.target.value === "python") {
      setCode(python);
    } else if (d.target.value === "javascript") {
      setCode(javascript);
    } else if (d.target.value === "java") {
      setCode(java);
    } else {
      setCode("// Language is not supported yet ...");
    }
  }

  // useEffect(() => {
  //   console.log(monaco);
  //   if(isEditorReady){
  //   monaco.editor.defineTheme("my-theme", nightOwl);
  //   }
  // }, [isEditorReady]);

  if (isEditorReady) {
    monaco.editor.defineTheme("my-theme", nightOwl);
  }

  return (
    <>
      {/* <div className="filter" /> */}
      <header>
        <div className="header_container">
          <h1>Code</h1>
          <div className="header_container_right">
            <label htmlFor="lang" className="lang_label">
              Language:{" "}
            </label>
            <select
              name="language"
              className="select"
              id="lang"
              onChange={handleLangSelector}
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python3</option>
              <option value="javascript">Javascript</option>
              <option value="typescript">Typescript</option>
            </select>
            <div className="arrow">&darr;</div>
            <button onClick={submitHandler} id="run">
              Run
            </button>
          </div>
        </div>
      </header>
      <div className="__code">
        <div className="left">
          {/* //^ monaco editor */}
          <Editor
            id="code"
            width="80vw"
            height="90vh"
            // theme="vs-dark"
            theme="my-theme"
            options={{
              minimap: {
                enabled: true,
              },
              fontSize: 16,
              cursorStyle: "line",
              cursorBlinking: "expand",
              cursorSmoothCaretAnimation: true,
              wordWrap: "on",
            }}
            value={code}
            onChange={updateCode}
            language={lang}
            editorDidMount={handleEditorDidMount}
          />
        </div>
        <div className="right">
          {outputLoading ? (
            <textarea
              name="outputLoad"
              id="output"
              cols="30"
              rows="7"
              data-gramm_editor="false"
              spellCheck="false"
              readOnly={true}
              value="Loading ..."
            ></textarea>
          ) : (
            <textarea
              name="output"
              id="output"
              cols="30"
              rows="7"
              data-gramm_editor="false"
              spellCheck="false"
              readOnly={true}
              value={output}
            ></textarea>
          )}
          <textarea
            name="input"
            id="input"
            cols="30"
            rows="7"
            data-gramm_editor="false"
            spellCheck="false"
            value={input}
            onChange={inputHandler}
            placeholder="Input"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Code;
