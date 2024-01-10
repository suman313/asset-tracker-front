import React, { useEffect, useState } from 'react'

function PdfViewer({onClose, pdfUrl}) {
    // const [viewUrl, setViewUrl] = useState("");
    
    // useEffect(() => {
    //   arrangePdfUrl();
    // },[pdfUrl])
    
  const [viewerUrl, setViewUrl] = useState("");
    
  const arrangePdfUrl = () => {
    // Encode the S3 PDF URL
    const s3PdfURL =
      "test-2023-durbin.s3.amazonaws.com/attachment/attachment1695035832Profile.pdf";
    const encodedS3PdfURL = encodeURIComponent(pdfUrl);

    // Generate the Google Drive PDF viewer URL
    const viewerURL = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodedS3PdfURL}`;
    // window.open(viewerURL, "_blank");
    setViewUrl(viewerURL);
  };

    useEffect(() => {
      arrangePdfUrl()
    }, [pdfUrl])
    

  return (
    <div className='fixed top-[5%] left-[25%] right-0 bottom-0 h-[80vh] w-[50vw] p-5 border-2 bg-[#d02929] rounded-md border-[#c65b09]'  >
      <span className='top-0 left-0 text-white font-bold cursor-pointer' onClick={onClose}>X &nbsp; Close</span>
        {/* <iframe src={pdfUrl} position="absolute" width="100%" height="100%"></iframe>
         */}
         <object data={viewerUrl} type='application/pdf' width="100%" height="100%"></object>
    </div>
  )
}

export default PdfViewer