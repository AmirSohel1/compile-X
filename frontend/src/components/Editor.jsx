// Editor.jsx
import Editor from "@monaco-editor/react";
import { FaBorderNone } from "react-icons/fa";

const CodeEditor = ({
  height,
  selectedTheme,
  selectedLanguage,
  setCode,
  code,
}) => {
  return (
    <Editor
      height={height}
      defaultLanguage={selectedLanguage}
      value={code}
      onChange={(value) => {
        setCode(value);
      }}
      theme={selectedTheme}
      options={{
        fontSize: 17,
        placeholder: " // Write your code here",
      }}
    />
  );
};

export default CodeEditor;
