import React, { useEffect, useRef, useState } from "react";
import ImageUploading from "react-images-uploading";
import BasicDetails from "./BasicDetails";
import ConfigDetails from "./ConfigDetails";
import CommercialDetails from "./CommercialDetails";
import { setBaseUrl } from "../../../config";
import axios from "axios";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";

function NewAssetTab({ setShowCurrentTab }) {
  // set loader state
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  //setting state for allowing option for commercial details
  const [commToggle, setCommToggle] = useState(false);
  
  //target the image input when clicked on the button
  //the button will have an handleInputImage function which will invoke the image input field by triggering the ref of that input
   const imageInputRef = useRef(null)
   //set image
   const [uploadedImage, setUploadedImage] = useState(null);
  //target the document input element by using useRef hook
  const documentInputRef = React.useRef(null);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [showDoc, setShowDoc] = useState(null);
  const [assetBasicDetails, setAssetBasicDetails] = useState({
    asset_no: "",
    make: "",
    model: "",
    yom : "",
    category: "",
    description: "",
    serial_no: 0,
    purchased_from: "",
    rfid: "",
    device_id: "",
    site_location: "",
    //company_id:
    doc_expiry_date: new Date(),
    doc_types: "doc",
  });

  const [assetConfigDetails, setAssetConfigDetails] = useState({
    used_or_new: "new",
    ansi_or_new: "ansi",
    machine_ownership_type: "rental",
    battery_type: "Diesel",
    engine_serial_no: "",
    two_or_four_wd: "2WD",
    accessories: "",
    tyres: "Airfilled",
    asset_id: "",
  });

  const [commercialDetails, setCommercialDetails] = useState({
    purchase_order_no: "",
    purchase_order_date: "",
    invoice_no: "",
    invoice_date: "",
    payment_terms: "",
    amount_rem_to_oem: "",
    date_of_rem_to_oem: "",
    exchange_rate_rem: "",
    custom_duty_payment: "",
    exworks_price: "",
    cif_charges: "",
    total_cost: "",
    boe_no: "",
    custom_duty_value: "",
    gst_amount: "",
    exrate_boe: "",
    clearing_charges: "",
    cha_charges: "",
    transportation_charges: "",
    port_of_dispatch: "",
    port_of_clearance: "",
    period_of_insurance: "",
    insurance_renewal: "",
    total_landed_cost: "",
    total_landed_cost_with_gst: "",
    asset_id: "",
  });

  const handleImageChange = () => {
    imageInputRef.current.click();
  }

  const handleImageUploadChange = (e) => {
    setUploadedImage(e.target.files);
    let photoFiles = e.target.files
    let photoArray = []
    for  (const key in photoFiles) {
        if (photoFiles.hasOwnProperty(key)) {
          photoArray.push(photoFiles[key]);
        }
    }
    setShowImage(photoArray);
  };
  //set the document to send to the server
  const handleDocumentChange = (e) => {
    console.log(e.target.files);
    setUploadedDocument(e.target.files);
    let docFiles = e.target.files
    let docArray = []
    for  (const key in docFiles) {
        if (docFiles.hasOwnProperty(key)) {
          docArray.push(docFiles[key]);
        }
    }
    setShowDoc(docArray);
  };

  //invoke the document upload input on button click
  const handleDocumentUploadInput = (e) => {
    documentInputRef.current.click();
  };
  //upload the image to the database
  async function handleMaro(asset_id) {
    // console.log(asset_id);
    console.log(uploadedImage);
    if (uploadedImage) {
      const formData = new FormData();
      for (const key in uploadedImage) {
        if(uploadedImage.hasOwnProperty(key)) 
        formData.append("photo", uploadedImage[key]);
      }
      formData.append("types", "asset");
      formData.append("asset_id", asset_id);
      //   for (var pair of formData.entries()) {
      //     console.log(pair[0]+ ', ' + pair[1]);
      // }
      await axios
        .post(`${setBaseUrl}/asset/upload_photo`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  // upload the document to the database
  async function handleDocument(asset_id) {
    console.log(asset_id);
    console.log(uploadedDocument);
    if (uploadedDocument) {
      const formData = new FormData();
      for (const key in uploadedDocument) {
        if(uploadedDocument.hasOwnProperty(key)) {

          formData.append("attachment", uploadedDocument[key]);
        }
      }
      formData.append("types_section", "asset");
      formData.append("asset_id", asset_id);
      formData.append("doc_types", "document");
      formData.append("doc_expiry_date", new Date());
      formData.append("serial_no", assetBasicDetails?.serial_no);
      //       types_section:asset
      // serial_no:assetBasicDetails.serial_no
      // doc_types:document
      // doc_expiry_date:13/06/2024
      // asset_id:7d9ec0a8-1aab-4ef0-afa6-c1392413f571
      //   for (var pair of formData.entries()) {
      //     console.log(pair[0]+ ', ' + pair[1]);
      // }
      await axios
        .post(`${setBaseUrl}/asset/upload_attachment`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const handleSubmit = async () => {
    if(assetBasicDetails.category === "") {
      alert("Please select a category")
      return;
    }
    try {
      setLoader(true);
      //first an asset will be created with basic details
      const data1 = await axios.post(
        `${setBaseUrl}/asset/create`,
        assetBasicDetails,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      console.log(data1);
      //get the id of newly created asset
      let getAssetId = data1.data.asset_id;
      
      await handleMaro(getAssetId);
      await handleDocument(getAssetId);
      let updatedConfigDetails = {
        ...assetConfigDetails,
        asset_id: getAssetId,
      };
      console.log(updatedConfigDetails);
      //send request to the create config details with the above id
      const data2 = await axios.post(
        `${setBaseUrl}/asset/create_config`,
        updatedConfigDetails,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      console.log(data2);
      //send request to the create commercial details with the above id only if commToggle is true
      let data3;
      if (commToggle) {
        let updatedCommercialDetails = {
          ...commercialDetails,
          asset_id: getAssetId,
        };
        data3 = await axios.post(
          `${setBaseUrl}/asset/create_details`,
          updatedCommercialDetails,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-tokens": sessionStorage.getItem("token"),
            },
          }
        );
      }
      console.log(data3);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      navigate("/assets");
    }
  };

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div id="new-asset" className="animfadein">
        <div class="flex ">
          <button onClick={() => navigate("/assets")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 mr-6 cursor-pointer feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <p class="inline py-5 pl-5 text-xl font-medium text-slate-700 dark:text-slate-200">
            {/* if showCurrentTab equals to 5 it means we have opened new Asset tab or it is Update asset tab */}
            New Asset
          </p>
        </div>
        <BasicDetails
          assetBasicDetails={assetBasicDetails}
          setAssetBasicDetails={setAssetBasicDetails}
        />
        <ConfigDetails
          assetConfigDetails={assetConfigDetails}
          setAssetConfigDetails={setAssetConfigDetails}
        />

        <CommercialDetails
          commToggle={commToggle}
          setCommToggle={setCommToggle}
          commercialDetails={commercialDetails}
          setCommercialDetails={setCommercialDetails}
        />

        <div class="flex animSlideup relative">
          <div class="basis-full bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl justify-between">
            <div class="flex p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 class="font-medium text-base mr-auto ">Asset Photos</h2>
              <button class="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex"
              onClick={() => handleImageChange()}
              >
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg, image/png"
                  multiple
                  onChange={handleImageUploadChange}
                  wfd-id="id57"
                  className="hidden"
                />
                +Add Photos
              </button>
            </div>
            {uploadedImage && <div class="p-5 text-sm">
              <div class="flex flex-col text-base">
                {showImage.length>0 && showImage.map(img => <p>{img.name}</p>)}
              </div>
            </div>}
          </div>
          <div className="basis-full bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl justify-between">
            <div class="flex p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 class="font-medium text-base mr-auto ">
                Maintenance Documents
              </h2>
              <button
                onClick={handleDocumentUploadInput}
                class="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex"
              >
                <input
                  ref={documentInputRef}
                  type="file"
                  multiple
                  accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  class="hidden"
                  wfd-id="id57"
                  onChange={handleDocumentChange}
                />
                +Add Documents
              </button>
            </div>
            <div class="p-5 text-sm">
              {uploadedDocument && (
                <div class="flex flex-col">{showDoc.length>0 && showDoc.map(doc=><p>{doc.name}</p>)}</div>
              )}
            </div>
          </div>
        </div>

        <div class="flex mt-5 animSlideup relative">
          <button
            onClick={() => navigate("/assets")}
            className="flex basis-1/2 align-middle justify-center py-3 border mx-4 rounded-lg border-gray-600 dark:border-gray-400 text-sm font-medium text-slate-800 dark:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex basis-1/2 justify-center py-4 mx-4 border rounded-lg bg-blue-800 text-sm font-medium text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4 mr-2 feather feather-thumbs-up"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

export default NewAssetTab;
