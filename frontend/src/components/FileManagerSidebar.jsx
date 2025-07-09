import React, { useState, useEffect } from "react";
import {
  FaFolder,
  FaFileAlt,
  FaTrash,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

import "./FileMan.css";

const FileManagerSidebar = ({
  folders,
  setFolderID,
  folderID,
  selectedFolder,
  selectedFile,
  onCreateFolder,
  onDeleteFolder,
  onDeleteFile,
  onSelectFolder,
  onSelectFile,
  folderName,
  setFolderName,
}) => {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [snippets, setSnippets] = useState({});

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: token } };

  const toggleFolder = async (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));

    if (!snippets[folderId]) {
      try {
        const res = await fetch(
          `https://compilex-backend-l61z.onrender.com/api/snippets/folder/${folderId}`,
          config
        );
        const data = await res.json();
        setSnippets((prev) => ({ ...prev, [folderId]: data }));
      } catch (err) {
        console.error("Error fetching snippets:", err);
      }
    }
  };

  return (
    <div className="sidebar1 col-md-3 border-end p-3 overflow-auto">
      <h4>Folders</h4>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={onCreateFolder}>
          +
        </button>
      </div>

      <ul className="list-group">
        {folders.map((folder) => (
          <li key={folder._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  toggleFolder(folder._id);

                  setFolderID(folder._id);
                }}
              >
                {expandedFolders[folder._id] ? (
                  <FaChevronDown className="me-2" />
                ) : (
                  <FaChevronRight className="me-2" />
                )}
                <FaFolder className="me-2" />
                {folder.name}
              </div>
              <FaTrash
                onClick={() => onDeleteFolder(folder._id)}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>

            {expandedFolders[folder._id] && snippets[folder._id] && (
              <ul className="list-group mt-2 ms-3">
                {snippets[folder._id].map((file) => (
                  <li
                    key={file._id}
                    className={`list-group-item py-1 px-2 ${
                      selectedFile === file._id
                        ? "active bg-primary text-white"
                        : ""
                    }`}
                    style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => onSelectFile(file)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        <FaFileAlt className="me-1" />
                        {file.title}
                      </span>
                      <FaTrash
                        style={{ color: "red" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteFile(file._id);
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileManagerSidebar;
