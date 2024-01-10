import React, { useState } from "react";
import deleteDocument from "../../apis/files/deleteDocument";
import Document from "../viewer/Document";

function AddDocument({
  title,
  uploadedDocument,
  setUploadedDocument,
  alreadyUploadedDocuments,
  setAlreadyUploadedDocuments,
  forSection
}) {
  //target the document input element by using useRef hook
  const documentInputRef = React.useRef(null);
  const [showDocument, setShowDocument] = useState([]);

  //invoke the document upload input on button click
  const handleDocumentUploadInput = (e) => {
    documentInputRef.current.click();
  };
  //set the document to send to the server
  const handleDocumentChange = (e) => {
    setUploadedDocument(e.target.files);
    let docFiles = e.target.files;
    let docArray = [];
    for (const key in docFiles) {
      if (docFiles.hasOwnProperty(key)) {
        docArray.push(docFiles[key]);
      }
    }
    setShowDocument(docArray);
  };
  //function for document delete
  const deleteDocuments = async (id) => {
    const data = await deleteDocument(id, forSection);
    if (data != false) {
      let newDocList = alreadyUploadedDocuments.filter((doc) => doc.id !== id);
      setAlreadyUploadedDocuments(newDocList);
    } else {
      alert("Document not deleted");
    }
  };
  return (
    <div className="flex animSlideup relative">
      <div className="basis-full bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl justify-between">
        <div className="flex p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 className="font-medium text-base mr-auto ">{title}</h2>
          <button
            onClick={handleDocumentUploadInput}
            className="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex"
          >
            <input
              ref={documentInputRef}
              type="file"
              multiple
              accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              wfd-id="id57"
              onChange={handleDocumentChange}
            />
            +Add Documents
          </button>
        </div>
        {/* <div class="p-5 text-sm">
              {uploadedDocument && (
                <div class="flex flex-col">
                  {showDocument.length > 0 &&
                    showDocument.map((doc) => <p>{doc.name}</p>)}
                </div>
              )}
            </div> */}
        <div className="p-5 text-sm">
          <div className="flex flex-col text-transparent">Documents here</div>
        </div>
        <div className="p-5 text-sm">
          {uploadedDocument && (
            <div className="flex flex-col">
              <span className="text-lg">Uploading....</span>
              {showDocument.length > 0 &&
                showDocument.map((doc) => <p>{doc.name}</p>)}
            </div>
          )}
        </div>
        {alreadyUploadedDocuments?.length > 0 && (
          <div className="p-5 text-sm">
            <span className="text-lg">Existing</span>
            <div className="flex">
              {alreadyUploadedDocuments.map((doc) => (
                // <p>{doc.substring(doc.length - 17)}</p>
                <Document
                 pdfdocument={doc} handleDelete={deleteDocuments} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddDocument;
