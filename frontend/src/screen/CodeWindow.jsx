import React, { useEffect, useState } from "react";
import "./CodeWindow.css";
import CodeEditor from "../components/Editor";
import IOEditor from "../components/IOEditor";
import axios from "axios";
import { Link } from "react-router-dom";

const languages = [
  { id: 103, name: "C" },
  { id: 105, name: "C++" },
  { id: 71, name: "Python" },
  { id: 91, name: "Java(JDK 17.0.6)" },
  { id: 100, name: "Python (3.12.5)" },
  { id: 102, name: "JavaScript" },
  { id: 101, name: "TypeScript" },
];

function CodeWindow() {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [langId, setLangId] = useState(71);

  const [formData, setFormData] = useState({
    source_code: code,
    language_id: langId,
    stdin: input,
  });

  const handleLanguageChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const lang = languages.find((l) => l.id === selectedId);
    if (lang) {
      setLangId(lang.id);
      setSelectedLanguage(lang.name);
    }
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleRun = async () => {
    try {
      const payload = {
        source_code: code,
        language_id: langId,
        stdin: input,
      };

      setFormData(payload);
      const response = await axios.post(
        "http://localhost:4000/api/run",
        formData
      );
      const data = response.data;

      const formattedOutput = `Status: ${data.status?.description || "Unknown"}
Time: ${data.time || "0.000"}s

${
  data.stdout ||
  data.stderr ||
  data.compile_output ||
  data.message ||
  "No Output"
}`;

      setOutput(formattedOutput);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    setInput("");
  };
  useEffect(() => {}, [handleClear]);

  return (
    <div className="main-container">
      <ul className="controller gap-3">
        <li>
          <label>
            <select
              className="btn btn-secondary text-start"
              value={langId}
              onChange={handleLanguageChange}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name.charAt(0).toUpperCase() + lang.name.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </li>

        <li>
          <button className="btn btn-primary" onClick={handleRun}>
            Run
          </button>
        </li>

        <li>
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </li>

        <li>
          <label>
            <select
              className="btn btn-secondary text-start"
              value={selectedTheme}
              onChange={handleThemeChange}
            >
              <option value="vs-dark">Dark</option>
              <option value="vs">Light</option>
              <option value="hc-black">High Contrast</option>
              <option value="dracula">Dracula</option>
              <option value="GitHub">GitHub</option>
            </select>
          </label>
        </li>
      </ul>

      <div className="code-window">
        <div className="editor">
          <CodeEditor
            height={"100%"}
            selectedTheme={selectedTheme}
            selectedLanguage={selectedLanguage}
            setCode={setCode}
            code={code}
          />
        </div>
        <div className="right">
          <div className="input">
            <IOEditor
              height={"180px"}
              width={"356px"}
              title="Input"
              selectedTheme={selectedTheme}
              value={input}
              onChange={setInput}
            />
          </div>
          <div className="output">
            <IOEditor
              height={"297px"}
              width={"360px"}
              title="Output"
              selectedTheme={selectedTheme}
              value={output}
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeWindow;
