// IOEditor.jsx
import Editor from "@monaco-editor/react";

const IOEditor = ({
  title,
  height,
  width,
  value,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className="io-box">
      <h3>{title}</h3>
      <Editor
        height={height}
        language="plaintext"
        width={width}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "Fira Code, monospace",
          readOnly: readOnly,
          minimap: { enabled: false },
          lineNumbers: "off",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default IOEditor;
