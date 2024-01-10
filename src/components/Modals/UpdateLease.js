import axios from "axios";
import React, { useEffect, useState } from "react";
import { setBaseUrl } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import InvoiceTable from "./NewLease/InvoiceTable";

import Select from "react-select";
import Document from "../viewer/Document";
import ImageViewer from "../viewer/ImageViewer";
import Image from "../viewer/Image";
import deleteDocument from "../../apis/files/deleteDocument";
import AddDocument from "../uploads/AddDocument";
import upload_document from "../../utils/DocumentUploader";

function UpdateLease({ tabNo, setTabNo, leaseId, setLeaseId }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [leasType, setLeaseType] = useState(false);
  const [allAssets, setAllAssets] = useState([]);
  const [allOperators, setAllOperators] = useState([]);
  const [operatorsById, setOperatorsById] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [leaseInfo, setLeaseInfo] = useState({
    lease_type: "",
    customer_po_no: "",
    currency: "",
    rental_start_date: "",
    rental_end_date: "",
    customer: "",
    lease_status: "",
    contract_value: "",
    transportation_charge: "",
    normal_amount: "",
    overtime_amount: "",
    reimbursements: "",
    total_claimable_amount: "",
    id: id,
    asset_id: "",
    sale_person: "",
  });
  //set invoice info
  //define the object schema
  const invoiceObjectSchema = {
    invoice_name: "",
    invoice_date: "",
    invoice_id: "",
    operator_name: "",
    document: "",
  };
  const [invoiceInfo, setInvoiceInfo] = useState([]);
  const addInvoiceField = () => {
    let modifiedInvoice = [...invoiceInfo, invoiceObjectSchema];
    setInvoiceInfo(modifiedInvoice);
  };

  //target the photos input element by using useRef hook
  const photoInputRef = React.useRef(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [showImage, setShowImage] = useState(null);

  //target the document input element by using useRef hook
  const documentInputRef = React.useRef(null);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [showDocument, setShowDocument] = useState(null);

  //show existing images
  const [alreadyUploadedImages, setAlreadyUploadedImages] = useState([]);
  //show existing documents
  const [alreadyUploadedDocuments, setAlreadyUploadedDocuments] = useState([]);

  //get lease details by Id
  const get_specific_details = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/lease/get_data_by_id`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          id: id,
        },
      });
      // console.log(data);
      if (data.lease_type === "wet_lease") {
        setLeaseType(true);
      }
      setLeaseInfo(data);
      if (data.attachments.length > 0) {
        let existingAttachments = data.attachments.map((item) => item.doc_uri);
        setAlreadyUploadedDocuments(data.attachments);
      }
      if (data.photos.length > 0) {
        let existingPhotos = data.photos.map((item) => item.image_uri);
        setAlreadyUploadedImages(existingPhotos);
      }
      // setLeaseInfo({...leaseInfo, asset_id: data[0]?.asset_id})
    } catch (error) {
      // console.log(error);
    }
  };

  const getAllAssets = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/asset/get_all`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      });
      setAllAssets(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const getInvoices = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/lease/get-invoice`, {
        headers: {
          "x-access-tokens": sessionStorage.getItem("token"),
          "lease-id": id,
        },
      });
      // console.log(data);
      setInvoiceInfo(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const getOperatorsById = async () => {
    try {
      const { data } = await axios.get(
        `${setBaseUrl}/lease/get-operator-by-lease-id`,
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
            "lease-id": id,
          },
        }
      );
      // console.log(data);
      let operatorOptions = data.map((item) => {
        return {
          value: item.id,
          label: item.operator_name,
        };
      });
      // console.log(operatorOptions);
      setOperatorsById(operatorOptions);
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  const getAllOperators = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/operator/get_all`, {
        headers: {
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      });
      // console.log(data);
      const idSpecificOperators = await getOperatorsById();
      // console.log(idSpecificOperators);
      let filteredOperatorList = data.filter((item) => {
        for (let i = 0; i < idSpecificOperators.length; i++) {
          // console.log(item.id);
          // console.log(idSpecificOperators[i].id);
          if (item.id === idSpecificOperators[i].operator_id) {
            // console.log("mile gache");
            return;
          }
        }
        // console.log("maleni");
        return item;
      });
      // console.log(filteredOperatorList);
      let operatorOptions = filteredOperatorList.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setAllOperators(operatorOptions);
    } catch (error) {
      // console.log(error);
    }
  };

  // - - - - - - - - - - - UseEffect Hook Starts- - - - - - - - - - - -

  useEffect(() => {
    get_specific_details();
    getAllAssets();
    getInvoices();
    getOperatorsById();
    getAllOperators();
  }, []);

  // - - - - - - - - - - - UseEffect Hook ends- - - - - - - - - - - -

  // - - - - - - - - - - - DOM event manupulation functions starts- - - - - - - - - - - -

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

  const handleLeaseTypeSelect = (e) => {
    setLeaseInfo({ ...leaseInfo, lease_type: e.target.value });
    if (e.target.value == "wet_lease") setLeaseType(true);
    else setLeaseType(false);
  };

  // - - - - - - - - - - - functtions for data updates starts- - - - - - - - - - - -

  //upload image
  const upload_image = async (lease_id) => {
    const formData = new FormData();
    formData.append("lease_id", lease_id);
    formData.append("types", "lease");
    if (uploadedPhoto) {
      for (const key in uploadedPhoto) {
        if (uploadedPhoto.hasOwnProperty(key))
          formData.append("photo", uploadedPhoto[key]);
      }
    }
    try {
      // setLoader(true)
      const { data } = await axios.post(
        `${setBaseUrl}/lease/upload_photo`,
        formData,
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      // console.log(error);
    } finally {
      // setLoader(false)
    }
  };

  //update invoice
  const updateInvoices = async () => {
    for (let i = 0; i < invoiceInfo.length; i++) {
      console.log(leaseId);
      // let formData = new FormData();
      // formData.append("invoice_no",invoiceInfo[i].invoice_id)
      // formData.append("invoice_name", invoiceInfo[i].invoice_name)
      // formData.append("invoice_date", invoiceInfo[i].invoice_date)
      // formData.append("operator_name", invoiceInfo[i].operator_name)
      // formData.append("document", invoiceInfo[i].document)
      // formData.append("lease_id", leaseId)

      try {
        const { data } = await axios.put(
          `${setBaseUrl}/lease/update-invoice`,
          invoiceInfo[i],
          {
            headers: {
              // "Content-Type": "application/json",
              "x-access-tokens": sessionStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        alert(error.message);
        return false;
      }
    }
    return true;
  };

  const assignOperators = async () => {
    if (selectedOptions.length == 0) return true;
    for (let i = 0; i < selectedOptions.length; i++) {
      try {
        const { data } = await axios.post(
          `${setBaseUrl}/lease/assign-operator`,
          {
            lease_id: id,
            operator_name: selectedOptions[i].label,
            operator_id: selectedOptions[i].value,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-tokens": sessionStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        alert(error.message);
        return false;
      }
    }
    return true;
  };

  const deleteOperators = async (mapping_id) => {
    try {
      const { data } = await axios.delete(
        `${setBaseUrl}/lease/delete-mapping-operator-by-id`,
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
            "mapping-id": mapping_id,
          },
        }
      );
      getOperatorsById();
    } catch (error) {
      // console.log(error.message);
    }
  };

  const handleUpdate = async () => {
    console.log(leaseInfo);
    try {
      setLoader(true);
      const { data } = await axios.put(
        `${setBaseUrl}/lease/update`,
        leaseInfo,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      if (uploadedDocument) {
        let ifDocumentUploaded = await upload_document(
          id,
          "lease",
          uploadedDocument
        );
        if (!ifDocumentUploaded) {
          return;
        }
      }
      if (uploadedPhoto) await upload_image(id);
      if (setLeaseType) {
        await updateInvoices();
        await assignOperators();
      }

      alert("Data updated successfully");
      navigate("/lease/leaseDetails/" + id);
    } catch (error) {
      // console.log(error);
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div id="update-lease" className="">
        <div className="flex ">
          <button onClick={() => navigate("/lease/leaseDetails/" + id)}>
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
              className="w-6 h-6 mr-6 cursor-pointer feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <p className="inline py-5 pl-5 text-xl font-medium text-slate-700 dark:text-slate-200">
            Update Lease
          </p>
        </div>
        <div className="flex animSlideup relative">
          <div className="intro-y box basis-1/2 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
            <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 className="font-medium text-base mr-auto">Basic Feilds</h2>
            </div>
            <div className="p-5 text-sm">
              <div className="mt-0">
                <label>Lease Type</label>
                <select
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  onClick={handleLeaseTypeSelect}
                  // defaultValue={leaseInfo.lease_type}
                >
                  <option
                    value="dry_lease"
                    selected={
                      leaseInfo.lease_type === "dry_lease" ? true : false
                    }
                  >
                    Dry Lease
                  </option>
                  <option
                    value="wet_lease"
                    selected={
                      leaseInfo.lease_type === "wet_lease" ? true : false
                    }
                  >
                    Wet Lease
                  </option>
                </select>
              </div>
              <div className="mt-4">
                <label className="">Asset</label>
                <select
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  onChange={(e) =>
                    setLeaseInfo({ ...leaseInfo, asset_id: e.target.value })
                  }
                >
                  {allAssets.map((item) => (
                    <option
                      value={item.id}
                      selected={item.id === leaseInfo.asset_id ? true : false}
                    >
                      {item?.asset_no}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className ="mt-4">
                <label className ="" for="Multiselect">
                  {" "}
                  Operator{" "}
                </label>
  
                <select
                  className ="input w-full border mt-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  id="select-option"
                  name="state[]"
                  placeholder="Option"
                  autocomplete="off"
                >
                  <option value="">Sikandar</option>
                  <option value="">Sarojit</option>
                  <option value="">Yogendra</option>
                  <option value="">Rupesh Yadav</option>
                </select>
              </div> */}
              <div className="mt-4">
                <label className="">Customer PO No</label>
                <input
                  value={leaseInfo.customer_po_no}
                  onChange={(e) =>
                    setLeaseInfo({
                      ...leaseInfo,
                      customer_po_no: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="eg: RE673212"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="mt-4">
                <label className="">Currency</label>
                <input
                  type="text"
                  value={leaseInfo.currency}
                  onChange={(e) =>
                    setLeaseInfo({ ...leaseInfo, currency: e.target.value })
                  }
                  placeholder="Currency (eg: $)"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="mt-4">
                <label className="">Rental Start Date</label>
                <input
                  value={leaseInfo.rental_start_date}
                  onChange={(e) =>
                    setLeaseInfo({
                      ...leaseInfo,
                      rental_start_date: e.target.value,
                    })
                  }
                  type="date"
                  placeholder="07-03-2021"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="mt-4">
                <label className="">Rental End Date</label>
                <input
                  value={leaseInfo.rental_end_date}
                  onChange={(e) =>
                    setLeaseInfo({
                      ...leaseInfo,
                      rental_end_date: e.target.value,
                    })
                  }
                  type="date"
                  placeholder="07-03-2021"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="">Sales Person</label>
                <select
                  className="p-2 border-2 rounded-[9px]"
                  onChange={(e) =>
                    setLeaseInfo({ ...leaseInfo, sale_person: e.target.value })
                  }
                >
                  <option value="" selected={leaseInfo.sale_person == ""}>
                    {""}
                  </option>
                  <option
                    value="Raja Ghosh"
                    selected={leaseInfo.sale_person == "Raja Ghosh"}
                  >
                    Raja Ghosh
                  </option>
                  <option
                    value="Arjun Singh"
                    selected={leaseInfo.sale_person == "Arjun Singh"}
                  >
                    Arjun Singh
                  </option>
                  <option
                    value="Prashant R"
                    selected={leaseInfo.sale_person == "Prashant R"}
                  >
                    Prashant R
                  </option>
                  <option
                    value="Ajay K"
                    selected={leaseInfo.sale_person == "Ajay K"}
                  >
                    Ajay K
                  </option>
                  <option
                    value="Amit Mishra"
                    selected={leaseInfo.sale_person == "Amit Mishra"}
                  >
                    Amit Mishra
                  </option>
                  <option
                    value="Sunil K"
                    selected={leaseInfo.sale_person == "Sunil K"}
                  >
                    Sunil K
                  </option>
                  <option
                    value="Nimit Mori"
                    selected={leaseInfo.sale_person == "Nimit Mori"}
                  >
                    Nimit Mori
                  </option>
                  <option
                    value="Raja P"
                    selected={leaseInfo.sale_person == "Raja P"}
                  >
                    Raja P
                  </option>
                  <option
                    value="Krishna Patel"
                    selected={leaseInfo.sale_person == "Krishna Patel"}
                  >
                    Krishna Patel
                  </option>
                </select>
              </div>
              {leasType && (
                <div>
                  {" "}
                  <div className="mt-4">
                    <label className="">Select Operators</label>
                    <Select
                      defaultValue={[...operatorsById]}
                      isMulti
                      onChange={(e) => setSelectedOptions(e)}
                      name="colors"
                      options={allOperators}
                      className="basic-multi-select"
                      isOptionDisabled={() => selectedOptions.length >= 3}
                      classNamePrefix="select"
                    />
                  </div>
                  <div className="p-2">
                    <div className="text-sm font-bold"> Assigned Operators</div>
                    {operatorsById.map((item) => (
                      <div className="w-full flex justify-between p-2">
                        <p className="font-[400]">{item.label}</p>
                        <p
                          className="p-2 bg-[#a6523a] text-white rounded-[9px]"
                          onClick={() => deleteOperators(item.value)}
                        >
                          delete
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="intro-y box basis-1/2 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
            <div className="p-5 text-sm">
              <div className="mt-0">
                <label>Customer</label>
                <input
                  value={leaseInfo.customer}
                  onChange={(e) =>
                    setLeaseInfo({ ...leaseInfo, customer: e.target.value })
                  }
                  type="text"
                  placeholder="eg: John Doe"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="flex gap-6 mt-4">
                <div className="flex-grow-[1]">
                  <label className="">Status</label>
                  <select
                    className="input w-full border mt-2 p-2 border-slate-300 text-gray-500 dark:bg-slate-900 font-medium rounded-md text-sm"
                    onClick={(e) =>
                      setLeaseInfo({
                        ...leaseInfo,
                        lease_status: e.target.value,
                      })
                    }
                    defaultValue={leaseInfo.lease_status}
                  >
                    <option
                      value="active"
                      selected={
                        leaseInfo.lease_status === "active" ? true : false
                      }
                    >
                      {" "}
                      Active{" "}
                    </option>
                    <option
                      value="inactive"
                      selected={
                        leaseInfo.lease_status === "inactive" ? true : false
                      }
                    >
                      {" "}
                      Inactive{" "}
                    </option>
                    <option
                      value="completed"
                      selected={
                        leaseInfo.lease_status === "completed" ? true : false
                      }
                    >
                      {" "}
                      Lease Completed{" "}
                    </option>
                  </select>
                </div>
                <div className="flex-grow-[1]">
                  <label for="rso">RSO</label>
                  <input
                    type="text"
                    name="rso"
                    onChange={(e) =>
                      setLeaseInfo({
                        ...leaseInfo,
                        odoo_order_id: e.target.value,
                      })
                    }
                    className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="">Contract Value</label>
                <input
                  value={leaseInfo.contract_value}
                  onChange={(e) =>
                    setLeaseInfo({
                      ...leaseInfo,
                      contract_value: e.target.value,
                    })
                  }
                  type="number"
                  placeholder="0"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="mt-4">
                <label className="">Transportation Charges</label>
                <input
                  value={leaseInfo.transportation_charge}
                  onChange={(e) =>
                    setLeaseInfo({
                      ...leaseInfo,
                      transportation_charge: e.target.value,
                    })
                  }
                  type="number"
                  placeholder="0"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="mt-4">
                <label className="">Normal Amount</label>
                <input
                  value={leaseInfo.normal_amount}
                  onChange={(e) =>
                    setLeaseInfo({
                      ...leaseInfo,
                      normal_amount: e.target.value,
                    })
                  }
                  type="number"
                  placeholder="0"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="mt-4">
                <label className="">Overtime Amount</label>
                <input
                  value={leaseInfo.overtime_amount}
                  onChange={(e) =>
                    setLeaseInfo({
                      ...leaseInfo,
                      overtime_amount: e.target.value,
                    })
                  }
                  type="number"
                  placeholder="0"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="mt-4">
                <label className="">Reimbursements</label>
                <input
                  value={leaseInfo.reimbursements}
                  onChange={(e) =>
                    setLeaseInfo({
                      ...leaseInfo,
                      reimbursements: e.target.value,
                    })
                  }
                  type="number"
                  placeholder="0"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div className="mt-4">
                <label className="">Total Claimable Amount</label>
                <input
                  value={leaseInfo.total_claimable_amount}
                  onChange={(e) =>
                    setLeaseInfo({
                      ...leaseInfo,
                      total_claimable_amount: e.target.value,
                    })
                  }
                  type="number"
                  placeholder="0"
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        {leasType && (
          <div className="basis-full bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
            <p className="p-4 font-medium text-lg">Invoice Details</p>
            <div className="mt-4 p-4">
              {invoiceInfo.map((item, index) => (
                <InvoiceTable
                  index={index}
                  setInvoiceData={setInvoiceInfo}
                  allInvoiceData={invoiceInfo}
                />
              ))}
              {/* Add invoice button */}
              {/* <div className ="mt-4">
                  <button
                    className ="p-2 m-2 bg-[#3b2dd0] rounded-[10px] text-white font-medium"
                    onClick={() => addInvoiceField()}
                  >
                    Add invoice
                  </button>
                  <button
                    className ="p-2 m-2 bg-[#cc6b3d] rounded-[10px] text-white font-medium"
                    onClick={() => onInvoiceSubmit()}
                  >
                    Submit
                  </button>
                </div> */}
            </div>
          </div>
        )}
        <AddDocument
          title="Lease Documents"
          uploadedDocument={uploadedDocument}
          setUploadedDocument={setUploadedDocument}
          alreadyUploadedDocuments={alreadyUploadedDocuments}
          setAlreadyUploadedDocuments={setAlreadyUploadedDocuments}
          forSection="lease"
        />
        <div className="flex animSlideup relative">
          <div className="basis-full bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl justify-between">
            <div className="flex p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 className="font-medium text-base mr-auto ">Lease Photo</h2>
              <button
                onClick={handlePhotoInput}
                className="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex"
              >
                <input
                  ref={photoInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg, image/png"
                  className="hidden"
                  wfd-id="id57"
                  onChange={handlePhotoChange}
                />
                +Add photo
              </button>
            </div>
            <div className="p-5 text-sm">
              {uploadedPhoto && (
                <div className="flex flex-col">
                  <span className="text-lg">Uploading....</span>
                  {showImage.length > 0 &&
                    showImage.map((img) => <p>{img.name}</p>)}
                </div>
              )}
            </div>
            {alreadyUploadedImages != null && (
              <div className="p-5 text-sm">
                <span className="text-lg">Existing</span>
                {alreadyUploadedImages.map((img) => (
                  // <p>{img.substring(img.length - 17)}</p>
                  <Image image_uri={img} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex mt-5 animSlideup relative">
          <button
            onClick={() => navigate("/lease/leaseDetails/" + id)}
            className="flex basis-1/2 align-middle justify-center py-3 border mx-4 rounded-lg border-gray-600 dark:border-gray-400 text-sm font-medium text-slate-800 dark:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
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
              className="w-4 h-4 mr-2 feather feather-thumbs-up"
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

export default UpdateLease;
