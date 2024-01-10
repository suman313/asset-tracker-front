import React from 'react'

import downloader from "../../assets/images/icons8-download-96.png";
import galleryIcon from "../../assets/images/galleryIcon.png";
import { createPortal } from 'react-dom';
import ImageViewer from './ImageViewer';
import { useState } from 'react';

function Image({image_uri}) {
    const [showImageModal, setShowImageModal] = useState(false);
  return (
    <div class="flex gap-2 w-full border-r-2 cursor-pointer">
    {/* <div>Image: &nbsp; {image.image_uri}</div> */}

    <img
      src={galleryIcon}
      alt="Download"
      style={{
        width: "3.5rem",
        // height: "105px",
        marginBottom: "-0.30rem",
      }}
      onClick={() => setShowImageModal(true)}
    />
    <span className="self-end text-sm">
      {image_uri
        .split(
          "test-2023-durbin.s3.amazonaws.com/photo/"
        )[1]
        .split("?")[0]
        .slice(-15)}
    </span>
    <a
      href={`https://${image_uri}`}
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
    {showImageModal && createPortal(<ImageViewer image_uri={image_uri} onClose={() => setShowImageModal(false)} />, document.body)}
  </div>
  )
}

export default Image