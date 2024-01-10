import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setBaseUrl } from "../../config";
import Installation from "./NewMaintenance/Installation";
import Removal from "./NewMaintenance/Removal";
import { LoaderContext } from "../../Context/LoaderContext";
import Image from "../viewer/Image";
import Document from "../viewer/Document";
import deleteDocument from "../../apis/files/deleteDocument";

function UpdateMaintenance({ tabOpen, setTabOpen }) {
  const [loader, setLoader] = useContext(LoaderContext);
  const navigate = useNavigate();
  //set an array of objects for collecting data from the installation component
  let [partInstallationDetails, setPartInstallationDetails] = useState([]);
  //set an array of objects for collecting data from the removal component
  let [partRemovalDetails, setPartRemovalDetails] = useState([]);
  //setting list of assets
  const [allAssets, setAllAssets] = useState([]);
  const { id } = useParams();
  //set an object for collecting data of other maintenance fields
  let [basicFields, setBasicFields] = useState({
    status: "",
    description: "",
    scheduled_date: "",
    types: "",
    asset_no: "",
    asset_name: "",
    asset_id: "",
    lease_id: "",
    parts: [],
  });

  //target the photos input element by using useRef hook
  const photoInputRef = React.useRef(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [showImage, setShowImage] = useState(null);

  //target the document input element by using useRef hook
  const documentInputRef = React.useRef(null);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [showDocument, setShowDocument] = useState(null);

  //set the list of existing photos
  const [alreadyUploadedImages, setAlreadyUploadedImages] = useState(null);
  const [alreadyUploadedDocuments, setAlreadyUploadedDocuments] =
    useState(null);

  //set the photo to send to the server and url to show the image
  const handlePhotoChange = (e) => {
    setUploadedPhoto(e.target.files);
    let photoFiles = e.target.files;
    let photoArray = [];
    for (const key in photoFiles) {
      if (photoFiles.hasOwnProperty(key)) {
        photoArray.push(photoFiles[key]);
      }
    }
    setShowImage(photoArray);
  };

  //invoke the image upload input on button click
  const handlePhotoInput = (e) => {
    photoInputRef.current.click();
  };

  //set the document to send to the server
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

  //invoke the document upload input on button click
  const handleDocumentUploadInput = (e) => {
    documentInputRef.current.click();
  };

  const getAllAssets = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/asset/get_all`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          "unassigned-asset": "false",
        },
      });
      console.log("fetching all assets", data);
      setAllAssets(data);
    } catch (error) {
      console.log(error);
    }
  };
  //get lease id for the selected asset
  const getLeaseId = async (asset_id) => {
    console.log(asset_id);
    try {
      const { data } = await axios.get(`${setBaseUrl}/lease/get_all`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          asset_id: asset_id,
        },
      });
      console.log(data);
      if (data.length === 0) {
        // alert("You must create lease first for this asset")
        // window.location.reload()
        return null;
      }
      return data[0].id;
    } catch (error) {
      console.log(error);
    }
  };

  //upload image
  const upload_image = async (maintenance_id) => {
    const formData = new FormData();
    formData.append("maintenance_id", maintenance_id);
    formData.append("types", "maintenance");
    if (uploadedPhoto) {
      console.log(uploadedPhoto);
      for (const key in uploadedPhoto) {
        if (uploadedPhoto.hasOwnProperty(key)) {
          formData.append("photo", uploadedPhoto[key]);
        }
      }
    }
    try {
      const { data } = await axios.post(
        `${setBaseUrl}/maintenance/upload_photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  //upload document
  const upload_document = async (maintenance_id) => {
    const formData = new FormData();
    formData.append("maintenance_id", maintenance_id);
    formData.append("types_section", "maintenance");
    formData.append("serial_no", "9HUDU755");
    formData.append("doc_types", "document");
    formData.append("doc_expiry_date", "13/06/2024");
    if (uploadedDocument) {
      for (const key in uploadedDocument) {
        if (uploadedDocument.hasOwnProperty(key)) {
          formData.append("attachment", uploadedDocument[key]);
        }
      }
    }
    try {
      const { data } = await axios.post(
        `${setBaseUrl}/maintenance/upload_attachment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get the maintenance details
  const getMaintById = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/maintenance/get_by_id`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          id: id,
        },
      });
      console.log(data);
      if (data.photos.length > 0) {
        let existingPhotoList = data.photos.map((item) => item.image_uri);
        setAlreadyUploadedImages(existingPhotoList);
        console.log(existingPhotoList);
      }
      if (data.attachments.length > 0) {
        let existingAttachmentList = data.attachments.map(
          (item) => item.doc_uri
        );
        console.log(existingAttachmentList);
        setAlreadyUploadedDocuments(data.attachments);
      }

      console.log(data, "ccc");
      setBasicFields({
        status: data.status,
        description: data.description,
        scheduled_date: data.scheduled_date,
        types: data.types,
        asset_no: data.asset_no,
        asset_name: data.asset_name,
        asset_id: data.asset_id,
        lease_id: data.lease_id,
      });
      let installationArray = [];
      let removalArray = [];
      data?.parts.forEach((element) => {
        if (element.installation) {
          installationArray.push(element);
        } else {
          removalArray.push(element);
        }
      });
      console.log(installationArray, removalArray);
      setPartInstallationDetails(installationArray);
      setPartRemovalDetails(removalArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAssets();
    getMaintById();
  }, []);

  const handleSaveMaintenance = async () => {
    console.log(basicFields);
    const allPartDetails = [...partInstallationDetails, ...partRemovalDetails];
    const lease_id = await getLeaseId(basicFields.asset_id);

    let updated_basic_fields = {
      ...basicFields,
      lease_id: lease_id,
      parts: allPartDetails,
      id: id,
    };
    try {
      setLoader(true);
      const { data } = await axios.put(
        `${setBaseUrl}/maintenance/update`,
        updated_basic_fields,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      // console.log(data);
      // get maintenance id and call upload_image and upload_document function
      upload_image(data.id);
      upload_document(data.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      navigate(`/maintenance/maintenaneDetails/${id}`);
    }
  };

  //function for document delete
  const deleteDocuments = async (id) => {
    const data = await deleteDocument(id, "maintenance");
    if (data != false) {
      let newDocList = alreadyUploadedDocuments.filter((doc) => doc.id !== id);
      setAlreadyUploadedDocuments(newDocList);
    } else {
      alert("Document not deleted");
    }
  };

  return (
    <div id="new-maintenance">
      <div class="flex ">
        <button onClick={() => navigate("/maintenance")} href="">
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
          Update Maintenance
        </p>
      </div>
      <div class="flex animSlideup relative">
        <div class="intro-y box basis-1/2 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
          <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
            <h2 class="font-medium text-base mr-auto">Basic Feilds</h2>
          </div>
          <div class="p-5 text-sm">
            <div class="flex flex-col">
              <div class="w-full">
                <label class="">Asset</label>
                <select
                  onChange={(e) => {
                    let tempAr = e.target.value.split("#");
                    setBasicFields({
                      ...basicFields,
                      asset_id: tempAr[0],
                      asset_no: tempAr[1],
                    });
                  }}
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm"
                  value={basicFields.asset_id + "#" + basicFields.asset_no}
                >
                  {allAssets.map((asset) => {
                    let tempArray = `${asset?.id}#${asset?.asset_no}`;
                    return <option value={tempArray}>{asset?.asset_no}</option>;
                  })}
                </select>
              </div>

              <div class="w-full mt-2">
                <label class="">Status</label>
                <select
                  onChange={(e) =>
                    setBasicFields({ ...basicFields, status: e.target.value })
                  }
                  value={basicFields.status}
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm"
                >
                  <option
                    value="scheduled"
                    selected={basicFields.status === "scheduled" ? true : false}
                  >
                    Scheduled
                  </option>
                  <option
                    value="in_progress"
                    selected={basicFields.status === "scheduled" ? true : false}
                  >
                    In Progress
                  </option>
                  <option
                    value="completed"
                    selected={basicFields.status === "scheduled" ? true : false}
                  >
                    Completed
                  </option>
                  <option
                    value="breakdown"
                    selected={basicFields.status === "scheduled" ? true : false}
                  >
                    Breakdown
                  </option>
                </select>
              </div>
              <div class="w-full mt-3">
                <label class="">Description</label>
                <textarea
                  onChange={(e) =>
                    setBasicFields({
                      ...basicFields,
                      description: e.target.value,
                    })
                  }
                  value={basicFields?.description}
                  rows="2"
                  placeholder="Say something that best describes the asset"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="intro-y box basis-1/2 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
          <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
            <h2 class="text-transparent font-medium text-base mr-auto">
              Basic Feilds
            </h2>
          </div>
          <div class="p-5 text-sm">
            <div class="flex flex-col">
              <div class="w-full">
                <label class="">Scheduled Date</label>
                <input
                  onChange={(e) =>
                    setBasicFields({
                      ...basicFields,
                      scheduled_date: e.target.value,
                    })
                  }
                  value={basicFields?.scheduled_date}
                  type="date"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div class="w-full mt-2">
                <label class="">Type</label>
                <select
                  onChange={(e) =>
                    setBasicFields({ ...basicFields, types: e.target.value })
                  }
                  value={basicFields?.types}
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm"
                >
                  <option value="regular">Regular</option>
                  <option value="in_progress">In Progress</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex animSlideup relative">
        <div class="basis-1/2 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl justify-between">
          <div class="flex p-5 border-b border-gray-200 dark:border-dark-5">
            <h2 class="font-medium text-base mr-auto ">Maintenance Photos</h2>
            <button
              onClick={handlePhotoInput}
              class="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex"
            >
              <input
                ref={photoInputRef}
                type="file"
                accept="image/jpeg, image/png"
                multiple
                className="hidden"
                wfd-id="id57"
                onChange={handlePhotoChange}
              />
              +Add Photos
            </button>
          </div>
          <div class="p-5 text-sm">
            {uploadedPhoto && (
              <div class="flex flex-col text-base">
                <span className="text-lg">Uploading....</span>
                {showImage.length > 0 &&
                  showImage.map((img) => <p>{img.name}</p>)}
              </div>
            )}
          </div>
          {alreadyUploadedImages != null && (
            <div className="p-5">
              <span className="text-lg">Existing</span>
              <div className="flex">
                {alreadyUploadedImages.map((img) => (
                  // <p>{img.substring(img.length - 17)}</p>
                  <Image image_uri={img} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="basis-1/2 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl justify-between">
          <div className="flex p-5 border-b border-gray-200 dark:border-dark-5">
            <h2 className="font-medium text-base mr-auto ">
              Maintenance Documents
            </h2>
            <button
              onClick={handleDocumentUploadInput}
              className="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex"
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
          <div className="p-5 text-sm">
            {uploadedDocument && (
              <div class="flex flex-col">
                {showDocument.length > 0 &&
                  showDocument.map((doc) => <p>{doc.name}</p>)}
              </div>
            )}
          </div>
          {alreadyUploadedDocuments != null && (
            <div className="p-5">
              <span className="text-lg">Existing</span>
              <div className="flex ">
                {alreadyUploadedDocuments.map((doc) => (
                  // <p>{doc.substring(doc.length - 17)}</p>
                  <Document pdfdocument={doc} handleDelete={deleteDocuments} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-5 animSlideup relative">
        <Installation
          text={"installation"}
          partArray={partInstallationDetails}
          setPartArray={setPartInstallationDetails}
        />
        <Removal
          text={"removal"}
          partArray={partRemovalDetails}
          setPartArray={setPartRemovalDetails}
        />
      </div>
      <div class="flex mt-5 animSlideup relative">
        <button
          onClick={() => navigate("/maintenance")}
          class="flex basis-1/2 align-middle justify-center py-3 border mx-4 rounded-lg border-gray-600 dark:border-gray-400 text-sm font-medium text-slate-800 dark:text-slate-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveMaintenance}
          class="flex basis-1/2 justify-center py-4 mx-4 border rounded-lg bg-blue-800 text-sm font-medium text-white"
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

export default UpdateMaintenance;
