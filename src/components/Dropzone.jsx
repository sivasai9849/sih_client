import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { convertToPdf } from "../config/pdfutil";
import { FileUpload } from "./../config/utils";
function Dropzone() {
  const [file, setFile] = useState(null);
  const [outputLanguage, setOutputLanguage] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [fileurl, setFileUrl] = useState("");
  const [transUrl, setTransUrl] = useState("");

  async function onFileChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    const { type } = selectedFile;

    if (type === "image/jpeg" || type === "image/png") {
      const objectUrl = URL.createObjectURL(selectedFile);
      const pdf = convertToPdf(objectUrl);
      setFile(pdf);
    } else {
      setFile(selectedFile);
    }
  }

  async function onSubmit() {
    const fileUrl = await FileUpload(file, `uploads/${file.name}${Date.now()}`);
    setFileUrl(fileUrl);
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/translation/document_translation",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjBjZWI0OGQtY2IyMC00NjNhLWFlYmYtOGJkMTE5ODNlMWQ2IiwidHlwZSI6ImFwaV90b2tlbiJ9.cWfYK-Xtis6BJ50jXV-_bGexKqhEbRvWvNJPJ2Np5tM",
      },
      data: {
        show_original_response: false,
        fallback_providers: "",
        providers: "google",
        source_language: "en",
        target_language: outputLanguage,
        file_url: fileurl,
      },
    };
    axios
      .request(options)
      .then((response) => {
        const a = document.createElement("a");
        a.href = response.data.google.document_resource_url;
        a.download = `${file.name}.pdf`;
        setTransUrl(response.data.google.document_resource_url);
        a.click();
      })
      .catch(() => {
        // console.error(error);
      });
  }

  useEffect(() => {
    setIsSubmitEnabled(outputLanguage && file);
  }, [outputLanguage, file]);

  return (
    <div className="flex-col items-center justify-center h-screen mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <FormControl
            variant="outlined"
            sx={{
              minWidth: 180,
              fontSize: 20,
              fontStyle: "bold",
            }}
            className="w-full"
          >
            <InputLabel id="output-language-label">Select Language</InputLabel>
            <Select
              labelId="output-language-label"
              id="output-language"
              value={outputLanguage}
              onChange={(e) => setOutputLanguage(e.target.value)}
              label="Select Language"
            >
              <MenuItem value="hi">Hindi</MenuItem>
              <MenuItem value="ta">Tamil</MenuItem>
              <MenuItem value="kn">Kannada</MenuItem>
              <MenuItem value="ml">Malayalam</MenuItem>
              <MenuItem value="gu">Gujarati</MenuItem>
              <MenuItem value="mr">Marathi</MenuItem>
              <MenuItem value="pa">Punjabi</MenuItem>
              <MenuItem value="bn">Bengali</MenuItem>
              <MenuItem value="te">Telugu</MenuItem>
              <MenuItem value="ur">Urdu</MenuItem>
              <MenuItem value="or">Odia</MenuItem>
              <MenuItem value="as">Assamese</MenuItem>
              <MenuItem value="ks">Kashmiri</MenuItem>
            </Select>
          </FormControl>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 mt-8 mb-6 border-black border-4 rounded-xl hover:border-dashed hover:border-gray-400 "
          >
            <div className="flex flex-col items-center justify-center pt-4 pb-5  ">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg> */}
              <p className="text-xl text-black dark:text-black font-semibold ">
                Drag and drop a file or click to select a file
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="sr-only"
              accept=".pdf,.jpg,.png"
              onChange={onFileChange}
            />
          </label>
          {file && (
            <div className="flex w-full">
              <div className="mt-4 mr-40">
                <p className="text-sm text-gray-900 dark:text-gray-900">
                  Uploaded File
                </p>
                <iframe
                  src={`${URL.createObjectURL(file)}#toolbar=0`}
                  title={"Uploaded File"}
                  className="w-full h-64 border-2 border-gray-300 border-none rounded-lg"
                />
              </div>
              {transUrl && (
                <div className="mt-4 mr-40">
                  <p className="text-sm text-gray-900 dark:text-gray-900">
                    Uploaded File
                  </p>
                  <iframe
                    src={transUrl}
                    title={"Uploaded File"}
                    className="w-full h-64 border-2 border-gray-300 border-none rounded-lg"
                  />
                </div>
              )}
            </div>
          )}
          <button
            className={`mt-4 px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-blue-600 ${
              isSubmitEnabled ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isSubmitEnabled}
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dropzone;
