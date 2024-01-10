import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { setBaseUrl } from "../../config";
import BasicDetails from "./NewAsset/BasicDetails";
import ConfigDetails from "./NewAsset/ConfigDetails";
import CommercialDetails from "./NewAsset/CommercialDetails";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../viewer/Image";
import Document from "../viewer/Document";
import deleteDocument from "../../apis/files/deleteDocument";

function UpdateAssets({ showCurrentTab }) {
  const { id } = useParams();
  const navigate = useNavigate();
  // set loader state
  const [loader, setLoader] = useState(false);
  //setting state for allowing option for commercial details
  const [commToggle, setCommToggle] = useState(false);
  const [assetBasicDetails, setAssetBasicDetails] = useState({});
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
  const [ifCommercialDetailsExists, setIfCommercialDetailsExists] =
    useState(true);

  const documentInputRef = useRef(null);
  const imageInputRef = useRef(null);
  //set document
  const [uploadedDocument, setUploadedDocument] = useState(null);
  //set image
  const [uploadedImage, setUploadedImage] = useState();
  //for showing the list of uploaded images
  const [showImage, setShowImage] = useState(null);
  //while updating, set existing images if already uploaded
  const [alreadyUploadedImage, setAlreadyUploadedImage] = useState(null);

  //for showing the list of documents
  const [showDoc, setShowDoc] = useState(null);
  // while updating, set existing documents if already uploaded
  const [alreadyUploadedDoc, setAlreadyUploadedDoc] = useState(null);

  const getAllAssetData = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/asset/get_data_by_id`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          id: id,
        },
      });
      console.log(data);
      if (Object.keys(data.commercial_detail).length == 0) {
        setIfCommercialDetailsExists(false);
      }

      setAssetBasicDetails({
        asset_no: data.asset_no,
        make: data.make,
        model: data.model,
        category: data.category,
        yom: data.yom,
        description: data.description,
        serial_no: data.serial_no,
        purchased_from: data.purchased_from,
        rfid: data.rfid,
        device_id: data.device_id,
        site_location: data.site_location,
        //company_id:
        doc_expiry_date: new Date(),
        doc_types: "doc",
      });
      if (data.photo_data.length > 0) {
        let getOnlyImageUris = data.photo_data.map((item) => item.image_uri);
        setAlreadyUploadedImage(getOnlyImageUris);
      }
      if (data.attachment_data.length > 0) {
        let getOnlyAttachmentUris = data.attachment_data.map(
          (item) => item.doc_uri
        );
        setAlreadyUploadedDoc(data.attachment_data);
      }
      if (
        Object.keys(data.config_data).length !== 0 &&
        data.config_data.constructor === Object
      ) {
        setAssetConfigDetails({
          used_or_new:
            data.config_data.used_or_new !== ""
              ? data.config_data.used_or_new
              : "",
          ansi_or_new:
            data.config_data?.ansi_or_new !== ""
              ? data.config_data?.ansi_or_new
              : "",
          machine_ownership_type:
            data.config_data?.machine_ownership_type !== ""
              ? data.config_data?.machine_ownership_type
              : "",
          battery_type:
            data.config_data?.battery_type !== ""
              ? data.config_data?.battery_type
              : "",
          engine_serial_no:
            data.config_data?.engine_serial_no !== ""
              ? data.config_data?.engine_serial_no
              : "",
          two_or_four_wd:
            data.config_data?.two_or_four_wd !== ""
              ? data.config_data?.two_or_four_wd
              : "",
          accessories:
            data.config_data?.accessories !== ""
              ? data.config_data?.accessories
              : "",
          tyres: data.config_data?.tyres !== "" ? data.config_data?.tyres : "",
          asset_id: id,
        });
      }
      setCommercialDetails({ ...data.commercial_detail });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAssetData();
  }, [showCurrentTab]);

  //invoke the image input tag on button click
  const handleDocumentUploadInput = () => {
    documentInputRef.current.click();
  };

  //invoke the image input tag on button click
  const handleImageUploadInput = () => {
    imageInputRef.current.click();
  };

  const handleDocumentChange = (e) => {
    setUploadedDocument(e.target.files);
    let docFiles = e.target.files;
    let docArray = [];
    for (const key in docFiles) {
      if (docFiles.hasOwnProperty(key)) {
        docArray.push(docFiles[key]);
      }
    }
    setShowDoc(docArray);
  };

  const handleImageUploadChange = (e) => {
    setUploadedImage(e.target.files);
    let photoFiles = e.target.files;
    let photoArray = [];
    for (const key in photoFiles) {
      if (photoFiles.hasOwnProperty(key)) {
        photoArray.push(photoFiles[key]);
      }
    }
    setShowImage(photoArray);
  };
  //upload the image to the database
  async function handleMaro(asset_id) {
    // console.log(asset_id);
    console.log(uploadedImage);
    if (uploadedImage) {
      const formData = new FormData();
      for (const key in uploadedImage) {
        if (uploadedImage.hasOwnProperty(key))
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
        if (uploadedDocument.hasOwnProperty(key)) {
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
    try {
      setLoader(true);
      const data1 = await axios.put(
        `${setBaseUrl}/asset/update`,
        {
          id: id,
          ...assetBasicDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      await handleMaro(id);
      await handleDocument(id);

      console.log(ConfigDetails);

      //send request to the create config details with the above id
      const data2 = await axios.put(
        `${setBaseUrl}/asset/update_config`,
        {
          // id: id,
          ...assetConfigDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      //send request to the create commercial details with the above id only if commToggle is true
      if (commToggle) {
        console.log("Update assets");
        let updatedCommercialDetails = {
          ...commercialDetails,
          asset_id: id,
        };

        const data3 = await axios.put(
          `${setBaseUrl}/asset/update_details`,
          {
            ...updatedCommercialDetails,
            // asset_id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-tokens": sessionStorage.getItem("token"),
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      navigate("/assets/");
    }
  };
    //function for document delete
    const deleteDocuments = async (id) => {
      const data = await deleteDocument(id, "maintenance");
      if (data != false) {
        let newDocList = alreadyUploadedDoc.filter((doc) => doc.id !== id);
        setAlreadyUploadedDoc(newDocList);
      } else {
        alert("Document not deleted");
      }
    };

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div id="new-asset" className="animfadein">
        <div class="flex ">
          <button onClick={() => navigate(-1)}>
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
            Update Asset
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
              <button
                class="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex"
                onClick={handleImageUploadInput}
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

            {uploadedImage && (
              <div className="p-5 text-sm">
                <span className="text-lg">Uploading....</span>
                <div className="flex flex-col text-base">
                  {showImage.length > 0 &&
                    showImage.map((img) => <p>{img.name}</p>)}
                </div>
              </div>
            )}
            {alreadyUploadedImage != null && (
              <div className="p-5 text-sm">
                <span className="text-lg">Existing</span>
                <div className="flex  text-base">
                  {alreadyUploadedImage.map((item) => (
                    // <p>{item.substring(item.length - 17)}</p>
                    <Image image_uri={item} />
                  ))}
                </div>
              </div>
            )}
            {/* <div class="p-5 text-sm">
              <div class="flex flex-col text-transparent">Photos here</div>
            </div> */}
          </div>
        </div>
        <div className="basis-full bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl justify-between">
          <div class="flex p-5 border-b border-gray-200 dark:border-dark-5">
            <h2 class="font-medium text-base mr-auto ">
              Assets Documents
            </h2>
            <button
              onClick={handleDocumentUploadInput}
              class="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex"
            >
              <input
                ref={documentInputRef}
                type="file"
                accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                multiple
                className="hidden"
                wfd-id="id57"
                onChange={handleDocumentChange}
              />
              +Add Documents
            </button>
          </div>
          <div class="p-5 text-sm">
            {uploadedDocument && (
              <div class="flex flex-col">
                <span className="text-lg">Uploading...</span>
                {showDoc.length > 0 && showDoc.map((doc) => <p>{doc.name}</p>)}
              </div>
            )}
          </div>
          {alreadyUploadedDoc != null && (
            <div class="p-5 text-sm">
              <span className="text-lg">Existing</span>
              <div class="flex ">
                {alreadyUploadedDoc.map((item) => (
                  // <p>{item.substring(item.length - 17)}</p>
                  <Document pdfdocument={item} handleDelete={deleteDocuments}/>
                ))}
              </div>
            </div>
          )}
        </div>

        <div class="flex mt-5 animSlideup relative">
          <button
            onClick={() => navigate("/assets/")}
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

export default UpdateAssets;
