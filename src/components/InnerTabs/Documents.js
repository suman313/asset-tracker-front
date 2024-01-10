import React from "react";
import Document from "../viewer/Document";
import { useState } from "react";
import deleteDocument from "../../apis/files/deleteDocument";

function Documents({ documentUrl, section }) {
  //to re-render the component without directly manupulating the DOM
  const [allDocuments, setAllDocuments] = useState(documentUrl);
  const handleDelete = async (id) => {
    const data = await deleteDocument(id,section);
    if(data != false){
      let newDocList = allDocuments.filter(doc => doc.id !== id);
      setAllDocuments(newDocList);
    }
    else {
      alert("Document not deleted");
    }
  }
  return (
    <div id="assetD-photos" class="assetD-tabs  mt-4">
      <div class="grid grid-cols-12 gap-6">
        <div class="intro-y box col-span-12 bg-white dark:bg-slate-700 rounded-lg">
          <div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
            <h2 class="font-medium text-base mr-auto">Lease Documents</h2>
          </div>
          <div class="grid grid-cols-3 gap-5 p-5">
            {allDocuments.length > 0 ? (
              allDocuments.map((document) => <Document pdfdocument={document} handleDelete={handleDelete}/>)
            ) : (
              <div>No documents found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
