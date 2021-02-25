import React, { useRef } from "react";

export const FileUploader = ({ onLoad }) => {
  const inputFile = useRef(null);

  const handleInputFile = (e) => {
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader();
      const filename = file.name;
      reader.onloadend = (e) => {
        onLoad(filename, reader.result);
      };

      reader.readAsText(file);
    });
  };

  return (
    <div>
      <button onClick={(e) => inputFile.current && inputFile.current.click()}>
        Upload file to pod
      </button>
      <input
        type="file"
        id="file"
        accept=".ttl"
        multiple
        ref={inputFile}
        style={{ display: "none" }}
        onChange={handleInputFile}
      />
    </div>
  );
};
