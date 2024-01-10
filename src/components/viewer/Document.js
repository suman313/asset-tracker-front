import React, { useEffect, useState } from "react";
import pdfIcon from "../../assets/images/pdfIcon.png";
import downloader from "../../assets/images/icons8-download-96.png";
import deleteIcon from "../../assets/images/cancel.svg";
import { createPortal } from "react-dom";
import PdfViewer from "./PdfViewer";
import { useNavigate } from "react-router-dom";

function Document({ pdfdocument, handleDelete }) {
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    // arrangePdfUrl();
  }, []);
  return (
    <>
      <div class="flex gap-2 w-full border-r-2">
        <img
          src={pdfIcon}
          alt="Download"
          style={{
            width: "3.5rem",
            // height: "105px",
            marginBottom: "-0.30rem",
          }}
          onClick={() => setShowPdfViewer(true)}
          className="cursor-pointer"
        />
        <span className="self-end text-sm">
          {pdfdocument.doc_uri
            .split("test-2023-durbin.s3.amazonaws.com/attachment/")[1]
            .split("?")[0]
            .slice(-15)}
          {/* {pdfdocument_uri} */}
        </span>
        <a
          href={`${pdfdocument.doc_uri}`}
          target="_blank"
          className="self-end"
        >
          <img
            src={downloader}
            alt="Download"
            style={{
              width: "25px",
              height: "25px",
              // margin: "0.30rem",
            }}
            title="Download"
          />
        </a>
        <img
          src={deleteIcon}
          alt="delet"
          className="self-end cursor-pointer"
          onClick={() => handleDelete(pdfdocument.id)}
        />
      </div>
      {showPdfViewer &&
        createPortal(
          <PdfViewer
            onClose={() => setShowPdfViewer(false)}
            pdfUrl={pdfdocument.doc_uri}
          />,
          document.body
        )}
    </>
  );
}

export default Document;
