import React, { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';

function Dropzone() {
  const [file, setFile] = useState(null);

  function onFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    // Upload file to Azure Blob Storage
    const blobServiceClient = new BlobServiceClient("BlobEndpoint=https://csg1003200288dd9cc6.blob.core.windows.net/;QueueEndpoint=https://csg1003200288dd9cc6.queue.core.windows.net/;FileEndpoint=https://csg1003200288dd9cc6.file.core.windows.net/;TableEndpoint=https://csg1003200288dd9cc6.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=b&srt=sco&sp=rwdlaciytfx&se=2023-09-22T11:58:00Z&st=2023-09-22T03:58:00Z&spr=https&sig=ODgSzVQxXLYBBFDVGDMrTBz5pZ6u6Q1U7tMMZJXcv64%3D");
    const containerClient = blobServiceClient.getContainerClient('inputdocs');
    const blobClient = containerClient.getBlockBlobClient(selectedFile.name);
    blobClient.uploadData(selectedFile);
  }

  return (
    <div className="flex-col items-center justify-center h-screen mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gradient-to-r from-white to-violet-300 hover:bg-gradient-to-r hover:from-white hover:to-violet-400 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 backdrop-filter backdrop-blur-lg bg-opacity-30"
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
              onChange={onFileChange}
              accept=".pdf,.jpg,.png,.doc,.docx"
            />
          </label>
          {file && (
            <div className="ml-4">
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
        </div>
      </div>
    </div>
  );
}

export default Dropzone;