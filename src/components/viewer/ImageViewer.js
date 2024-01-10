import React from "react";

function ImageViewer({ image_uri, onClose }) {
  return (
    <div className=" fixed flex flex-col top-[5%] left-[25%] right-0 bottom-0 h-[80vh] w-[50vw] p-5 border-2 bg-[#ffff] rounded-md border-[#c65b09] overflow-scroll">
      <span
        className="self-end p-5 text-[#574e4e] font-bold cursor-pointer"
        onClick={onClose}
      >
        X &nbsp; Close
      </span>
      {/* <iframe src={pdfUrl} position="absolute" width="100%" height="100%"></iframe>
       */}
      <img src={`https://${image_uri}`} width="100%" height="100%" />
    </div>
  );
}

export default ImageViewer;
