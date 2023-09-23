import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { FileUpload } from "./../config/utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextToSpeech from "./Speech";
export default function TextTranslate() {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [outputLanguage, setOutputLanguage] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [render, setRender] = useState(false);
  const [extracted_data, setExtracted_data] = useState(null);
  const [playSummary, setPlaySummary] = useState(false); // State for controlling sound
  useEffect(() => {
    setIsSubmitEnabled(outputLanguage && file);
    console.log("Submit enabled:", outputLanguage && file);
  }, [outputLanguage, file]);

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
    console.log("Submitting file:");
    const fileUrl = await FileUpload(file, `uploads/${file.name}${Date.now()}`);
    setFileUrl(fileUrl);
    // Define the data to be sent in the request body
    console.log(
      "🚀 ~ file: TextTranslate.jsx:34 ~ onSubmit ~ fileUrl:",
      fileUrl
    );
    const data = {
      fileUrl: fileUrl, // Replace with the actual file URL
      targetLanguage: outputLanguage, // Replace with the actual target language
    };
    console.log("🚀 ~ file: TextTranslate.jsx:34 ~ onSubmit ~ data:", data);
    try {
      const extracted_data = await axios.post(
        "https://sih-server.adaptable.app/process",
        data
      );
      console.log("Response:", extracted_data.data);
      setExtracted_data(extracted_data.data);
      setRender(extracted_data.data.success);
      setPlaySummary(!playSummary)
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error:", error);
    }
  }

  console.log("Rendered with file:", file);
  console.log("Rendered with outputLanguage:", outputLanguage);

  return (
    <div className="flex-col  h-screen mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col  w-full mb-4">
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
            className="flex flex-col items-center justify-center w-full h-64  border-gray-900 border rounded-lg "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
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
          {render ? (
            <div className="mt-4">
              <p className="text-sm text-gray-900 dark:text-gray-900">
                {extracted_data.summary}
              </p>
              
            </div>
          ) : null}
        </div>
        {playSummary && (
          <TextToSpeech
            text={extracted_data.summary}
            lang={outputLanguage}
          />
        )}
      </div>
    </div>
  );
}
