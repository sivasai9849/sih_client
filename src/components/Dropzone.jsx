import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { FileUpload } from "./../config/utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Dropzone() {
  const [file, setFile] = useState(null);
  const [outputLanguage, setOutputLanguage] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  async function onFileChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const { type } = selectedFile;
    const fileToUpload =
      type === "image/jpeg" || type === "image/png"
        ? selectedFile
        : selectedFile;
    setFile(fileToUpload);
    console.log("File updated:", fileToUpload);
  }


  async function onSubmit() {
    const fileUrl = await FileUpload(file, `uploads/${file.name}${Date.now()}`);
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/translation/document_translation",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjk5YTg1MTEtYjY0MS00YWNmLTkwY2YtMDU4YTFiMzA1N2FkIiwidHlwZSI6ImFwaV90b2tlbiJ9.akHCbyo0pIC6DXwAvEI6Z2xq8jOkDMY0IoCK_0ItfVY",
      },
      data: {
        show_original_response: false,
        fallback_providers: "",
        providers: "google",
        source_language: "en",
        target_language: outputLanguage,
        file_url: fileUrl,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.google.document_resource_url);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    setIsSubmitEnabled(outputLanguage && file);
    console.log("Submit enabled:", outputLanguage && file);
  }, [outputLanguage, file]);

  console.log("Rendered with file:", file);
  console.log("Rendered with outputLanguage:", outputLanguage);

  return (
    <div className="flex-col items-center justify-center h-screen mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <div className="flex">
            <div className="w-full mb-4 ml-96">
              <FormControl
                variant="outlined"
                sx={{
                  minWidth: 180,
                }}
                className="w-full"
              >
                <InputLabel id="output-language-label">
                  Select Language
                </InputLabel>
                <Select
                  labelId="output-language-label"
                  id="output-language"
                  value={outputLanguage}
                  onChange={(e) => setOutputLanguage(e.target.value)}
                  label="Select Language"
                >
                  <MenuItem value="hi">Hindi</MenuItem>
                  <MenuItem value="te">Telugu</MenuItem>
                  <MenuItem value="ta">Tamil</MenuItem>
                  <MenuItem value="kn">Kannada</MenuItem>
                  <MenuItem value="ml">Malayalam</MenuItem>
                  <MenuItem value="gu">Gujarati</MenuItem>
                  <MenuItem value="mr">Marathi</MenuItem>
                  <MenuItem value="pa">Punjabi</MenuItem>
                  <MenuItem value="bn">Bengali</MenuItem>
                  <MenuItem value="ur">Urdu</MenuItem>
                  <MenuItem value="or">Odia</MenuItem>
                  <MenuItem value="as">Assamese</MenuItem>
                  <MenuItem value="ks">Kashmiri</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64  border-gray-900 border rounded-lg cursor-pointer bg-gradient-to-r from-white  hover:bg-gradient-to-r hover:bg-gray-200  backdrop-filter backdrop-blur-lg bg-opacity-30"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <p className="text-sm text-gray-900 dark:text-gray-900">
                Drag and drop a file or click to select a file
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="sr-only"
              accept=".pdf,.jpg,.png,.doc,.docx"
              onChange={onFileChange}
            />
          </label>
          {file && (
            <div className="mt-4">
              <p className="text-sm text-gray-900 dark:text-gray-900">
                {file.name}
              </p>
              <iframe
                src={URL.createObjectURL(file)}
                title={`PDF preview of ${file.name}`}
                className="w-full h-64 border-2 border-gray-300 border-dashed rounded-lg"
                toggle="modal"
              />
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