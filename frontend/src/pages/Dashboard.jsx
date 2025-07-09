import { useEffect, useState } from "react";
import axios from "axios";
import CodeEditor from "../components/Editor";
import IOEditor from "../components/IOEditor";
import FileManagerSidebar from "../components/FileManagerSidebar";
import "./Dashboard.css";

const languages = [
  { id: 103, name: "C" },
  { id: 105, name: "C++" },
  { id: 71, name: "Python" },
  { id: 91, name: "Java(JDK 17.0.6)" },
  { id: 100, name: "Python (3.12.5)" },
  { id: 102, name: "JavaScript" },
  { id: 101, name: "TypeScript" },
];

const Dashboard = () => {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [langId, setLangId] = useState(71);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [folderID, setFolderID] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const config = { headers: { Authorization: token } };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/folders/${userId}`, config)
      .then((res) => setFolders(res.data))
      .catch((err) => console.error("Failed to fetch folders", err));
  }, []);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    try {
      const formD = {
        name: folderName,
        userId: localStorage.getItem("userId"),
      };
      const res = await axios.post(
        "http://localhost:4000/api/folders",
        formD,
        config
      );
      setFolders([...folders, res.data]);
      setFolderName("");
    } catch (err) {
      console.error("Folder creation failed", err);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/folders/${folderId}`,
        config
      );
      setFolders(folders.filter((f) => f._id !== folderId));
      setSelectedFolder(null);
      setSnippets([]);
    } catch (err) {
      console.error("Folder deletion failed", err);
    }
  };

  const handleSelectFolder = async (folderId) => {
    setSelectedFolder(folderId);

    try {
      const res = await axios.get(
        `http://localhost:4000/api/snippets/folder/${folderId}`,
        config
      );
      setSnippets(res.data);
    } catch (err) {
      console.error("Fetching snippets failed", err);
    }
  };

  const handleSaveSnippet = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/snippets/folder/${folderID}`,
        {
          title,
          code,
          input,
          output,
        },
        config
      );
      console.log(res.data);
      setSnippets([...snippets, res.data]);
      setTitle("");
    } catch (err) {
      console.error("Saving snippet failed", err);
    }
  };

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

      const response = await axios.post(
        "http://localhost:4000/api/run",
        payload,
        config
      );

      const result = response.data;

      const formattedOutput = `Status: ${
        result.status?.description || "Unknown"
      }\nTime: ${result.time || "0.000"}s\n\n${
        result.stdout ||
        result.stderr ||
        result.compile_output ||
        result.message ||
        "No Output"
      }`;

      setOutput(formattedOutput);
    } catch (err) {
      console.error("Code execution failed", err);
      setOutput("Error: Unable to run code.");
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    setInput("");
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/snippets/${fileId}`,
        config
      );
      setSnippets((prevSnippets) =>
        prevSnippets.filter((file) => file._id !== fileId)
      );
    } catch (err) {
      console.error("Failed to delete snippet:", err);
    }
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file._id);
    setCode(file.code);
    setInput(file.input || "");
    setOutput(file.output || "");
    setTitle(file.title);
  };

  return (
    <div className="main_BOX">
      <div className="row">
        <FileManagerSidebar
          folders={folders}
          setFolderID={setFolderID}
          folderID={folderID}
          selectedFolder={selectedFolder}
          selectedFile={selectedFile}
          onCreateFolder={handleCreateFolder}
          onDeleteFolder={handleDeleteFolder}
          onDeleteFile={handleDeleteFile}
          onSelectFolder={handleSelectFolder}
          onSelectFile={handleSelectFile}
          folderName={folderName}
          setFolderName={setFolderName}
        />

        <div style={{ height: "88vh" }} className="col-md-9 p-1">
          <h5>Create snippet</h5>
          <div style={{ height: "40px" }} className="d-flex mb-1 gap-1">
            <input
              type="text"
              className="form-control"
              placeholder="Snippet Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleSaveSnippet}>
              Save
            </button>
          </div>

          <ul className="controller d-flex gap-2 mb-1 list-unstyled">
            <li>
              <select
                className="form-select"
                value={langId}
                onChange={handleLanguageChange}
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
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
              <select
                className="form-select"
                value={selectedTheme}
                onChange={handleThemeChange}
              >
                <option value="vs-dark">Dark</option>
                <option value="vs">Light</option>
                <option value="hc-black">High Contrast</option>
                <option value="dracula">Dracula</option>
                <option value="GitHub">GitHub</option>
              </select>
            </li>
          </ul>

          <div className="code-box d-flex">
            <div className="left w-75">
              <CodeEditor
                height={"100%"}
                selectedTheme={selectedTheme}
                selectedLanguage={selectedLanguage}
                setCode={setCode}
                code={code}
              />
            </div>
            <div className="right">
              <div className="up mb-2">
                <IOEditor
                  height={"150px"}
                  width={"100%"}
                  title="Input"
                  selectedTheme={selectedTheme}
                  value={input}
                  onChange={setInput}
                />
              </div>
              <div className="down">
                <IOEditor
                  height={"250px"}
                  width={"100%"}
                  title="Output"
                  selectedTheme={selectedTheme}
                  value={output}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
