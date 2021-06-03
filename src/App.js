import { useEffect } from "react";
import "./App.css";

import Code from "./components/Code";
import { useMonaco } from "@monaco-editor/react";

import { nightOwl } from "./components/style";

function App() {
  const monaco = useMonaco();
  useEffect(() => {
    // console.log(monaco);
    if (monaco) {
      monaco.editor.defineTheme("my-theme", nightOwl);
      monaco.editor.setTheme("my-theme");
    }
  }, [monaco]);

  return (
    <div className="App">
      <Code />
    </div>
  );
}

export default App;
