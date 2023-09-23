import React, { useState, useEffect } from "react";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { FileUpload } from "./../config/utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
function Dropzone() {
  const [file, setFile] = useState(null);
  const [outputLanguage, setOutputLanguage] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [fileType, setFileType] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [transUrl, setTransUrl] = useState("");

  async function onFileChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const { type } = selectedFile;
    if (
      type !== "image/jpeg" &&
      type !== "image/png" &&
      type !== "application/pdf" &&
      type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      type !== "application/msword"
    )
      return;

    const reader = new FileReader();
    reader.onload = async () => {
      let pdfDoc;
      if (type === "application/pdf") {
        const pdfData = new Uint8Array(reader.result);
        pdfDoc = await PDFDocument.load(pdfData);
      } else {
        const imgData = reader.result;
        pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        if (type === "image/jpeg") {
          const img = await pdfDoc.embedJpg(imgData);
          page.drawImage(img, {
            x: 0,
            y: 0,
            width: width,
            height: height,
          });
        } else if (type === "image/png") {
          const img = await pdfDoc.embedPng(imgData);
          page.drawImage(img, {
            x: 0,
            y: 0,
            width: width,
            height: height,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const pdfFile = new File([pdfBytes], `${selectedFile.name}.pdf`, {
        type: "application/pdf",
      });
      setFile(pdfFile);
    };

    if (
      type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      type === "application/msword"
    ) {
      setFile(selectedFile);
    } else if (type === "application/pdf") {
      reader.readAsArrayBuffer(selectedFile);
    } else if (type === "image/jpeg" || type === "image/png") {
      reader.readAsDataURL(selectedFile);
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
        file_url: fileUrl,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.google.document_resource_url);
        // download file
        const a = document.createElement("a");
        a.href = response.data.google.document_resource_url;
        a.download = `${file.name}.pdf`;
        a.click();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    setIsSubmitEnabled(outputLanguage && file && fileType);
    console.log("Submit enabled:", outputLanguage && file && fileType);
  }, [outputLanguage, file, fileType]);

  

  console.log("Rendered with file:", file);
  console.log("Rendered with outputLanguage:", outputLanguage);

  return (
    <div className="flex-col items-center justify-center h-screen mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <div className="flex">
            <div className="w-full mb-4">
              <FormControl
                variant="outlined"
                sx={{
                  minWidth: 180,
                }}
              >
                <InputLabel id="file-type-label">File Type</InputLabel>
                <Select
                  labelId="file-type-label"
                  id="file-type-select"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  label="File Type"
                >
                  <MenuItem value="image">JPG/PNG</MenuItem>
                  <MenuItem value="document">PDF/DOC</MenuItem>
                </Select>
              </FormControl>
            </div>
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
            </div>
          </div>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64  border-gray-900 border rounded-lg"
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
            <div className="flex w-full">
              <div className="mt-4 mr-40">
                <p className="text-sm text-gray-900 dark:text-gray-900">
                  Uploaded File
                </p>
                <iframe
                  src={`${URL.createObjectURL(file)}#toolbar=0`}
                  title={"Uploaded File"}
                  className="w-full h-64 border-2 border-gray-300 border-none rounded-lg"
                  toggle="modal"
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
                    toggle="modal"
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
