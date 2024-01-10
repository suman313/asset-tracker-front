import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import { LoaderContext } from "../../../Context/LoaderContext";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import InvoiceTable from "./InvoiceTable";
import upload_document from "../../../utils/DocumentUploader";
import AddDocument from "../../uploads/AddDocument";

function NewLease({ tabNo, setTabNo }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isWetLeaseSelected, setIsWetLeaseSelected] = useState(false);
  const [allAssets, setAllAssets] = useState([]);
  const [allOperator, setAllOperator] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [operatorsLimit, setOperatorsLimit] = useState(0);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  let lease_id = "";
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
    asset_id: "",
    sale_person: "",
    odoo_order_id: "",
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
  const onInvoiceSubmit = () => {
    // console.log(invoiceInfo);
  };
  //target the photos input element by using useRef hook
  const photoInputRef = React.useRef(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [showImage, setShowImage] = useState(null);

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

  const handleOnSelect = (e) => {
    if (e.target.value === "wet_lease") {
      setIsWetLeaseSelected(true);
    } else {
      setIsWetLeaseSelected(false);
    }
    setLeaseInfo({ ...leaseInfo, lease_type: e.target.value });
  };

  const getAllAssets = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/asset/get_all`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          "unassigned-asset": "true",
        },
      });
      // console.log(data);
      setAllAssets(data);
      // setLeaseInfo({ ...leaseInfo, asset_id: data[0].id });
    } catch (error) {
      // console.log(error);
    }
  };
  const getAllOperator = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/operator/get_all`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      });
      let operatorOptions = data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setAllOperator(operatorOptions);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllAssets();
    getAllOperator();
  }, []);

  //upload image
  const upload_image = async (lease_id) => {
    const formData = new FormData();
    formData.append("lease_id", lease_id);
    formData.append("types", "lease");
    formData.append("photo", uploadedPhoto);
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

  //upload document

  //assign-operators

  const assignOperators = async (leaseId) => {
    if (selectedOptions.length == 0) return true;
    for (let i = 0; i < selectedOptions.length; i++) {
      try {
        const { data } = await axios.post(
          `${setBaseUrl}/lease/assign-operator`,
          {
            lease_id: leaseId,
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

  // create-invoices

  const createInvoices = async (leaseId) => {
    for (let i = 0; i < invoiceInfo.length; i++) {
      // console.log(leaseId);
      let formData = new FormData();
      formData.append("invoice_no", invoiceInfo[i].invoice_id);
      formData.append("invoice_name", invoiceInfo[i].invoice_name);
      formData.append("invoice_date", invoiceInfo[i].invoice_date);
      formData.append("operator_name", invoiceInfo[i].operator_name);
      formData.append("document", invoiceInfo[i].document);
      formData.append("lease_id", leaseId);

      try {
        const { data } = await axios.post(
          `${setBaseUrl}/lease/create-invoice`,
          formData,
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

  const compareDates = (d1, d2) => {
    // console.log("asche");
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    if (date1 > date2) {
      alert("Rental Start Date should be less than Rental End Date");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (leaseInfo.asset_id === "") {
      alert("Please choose an asset");
      return;
    } else if (leaseInfo.lease_type === "") {
      alert("Please choose a lease type");
      return;
    } else if (leaseInfo.lease_status === "") {
      alert("Please choose a lease status");
      return;
    } else if (leaseInfo.rental_start_date === "") {
      alert("Please choose a rental start date");
      return;
    } else if (leaseInfo.rental_end_date === "") {
      alert("Please choose rental end date");
      return;
    } else if (leaseInfo.lease_type === "") {
      alert("Please choose a lease type");
      return;
    } else if (
      leaseInfo.customer_po_no === "" ||
      leaseInfo.currency === "" ||
      leaseInfo.contract_value === "" ||
      leaseInfo.customer === "" ||
      leaseInfo.normal_amount === "" ||
      leaseInfo.overtime_amount === "" ||
      leaseInfo.reimbursements === ""
    ) {
      alert("All fields are necessarryly required");
      return;
    }
    let getComparison = compareDates(
      leaseInfo.rental_start_date,
      leaseInfo.rental_end_date
    );
    if (getComparison === false) {
      return;
    }
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${setBaseUrl}/lease/create`,
        leaseInfo,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );

      lease_id = data.lease_id;
      if (uploadedPhoto) await upload_image(lease_id);
      if (uploadedDocument) {
        let ifDocumentUploaded = await upload_document(
          lease_id,
          "lease",
          uploadedDocument
        );
        if (!ifDocumentUploaded) {
          return;
        }
      }
      //create invoice
      let assignInvoices = await createInvoices(lease_id);
      if (assignInvoices === false) {
        alert("Invoice not assigned successfully");
      }
      //assign operator endpoint
      let assignOperatorAssignSuccess = await assignOperators(lease_id);
      if (assignOperatorAssignSuccess === false) {
        alert("Operator mapping not Successful");
      }
      setLoader(false);
      // console.log(data);
      navigate(`/lease/leaseDetails/${lease_id}`);
    } catch (error) {
      // console.log(error);
      if (error.response) {
        if (error.response.data.error) {
          alert(error.response.data.error);
        }
        setLoader(false);
        navigate(`/lease/newLease`);
      }
    }
  };

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div id="new-lease" className="">
        <div className="flex ">
          <button onClick={() => navigate("/lease")}>
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
            New Lease
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
                  onChange={handleOnSelect}
                >
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
                  <option value="dry_lease">Dry Lease</option>
                  <option value="wet_lease">Wet Lease</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="">Asset</label>
                <select
                  // value={allAssets[0]?.id}
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  onClick={(e) => {
                    // console.log(e.target.value);
                    setLeaseInfo({ ...leaseInfo, asset_id: e.target.value });
                  }}
                >
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
                  {allAssets.map((item, index) => (
                    <option value={item?.id}>{item?.asset_no}</option>
                  ))}
                </select>
              </div>
              {/* <div className = "mt-4">
                <label className = "" for="Multiselect">
                  {" "}
                  Operator{" "}
                </label>
  
                <select
                  className = "input w-full border mt-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  id="select-option"
                  name="state[]"
                  placeholder="Option"
                  autocomplete="off"
                >
                  {allOperator.map((item) => (
                    <option value="">Sikandar</option>
                  ))}
                  
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
                  <option value="Raja Ghosh">Raja Ghosh</option>
                  <option value="Arjun Singh">Arjun Singh</option>
                  <option value="Prashant R">Prashant R</option>
                  <option value="Ajay K">Ajay K</option>
                  <option value="Amit Mishra">Amit Mishra</option>
                  <option value="Sunil K">Sunil K</option>
                  <option value="Nimit Mori">Nimit Mori</option>
                  <option value="Raja P">Raja P</option>
                  <option value="Krishna Patel">Krishna Patel</option>
                </select>
              </div>
              {isWetLeaseSelected && (
                <div className="mt-4">
                  <label className="">Select Operators</label>
                  <Select
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    onChange={(e) => setSelectedOptions(e)}
                    name="colors"
                    options={allOperator}
                    className="basic-multi-select"
                    isOptionDisabled={() => selectedOptions.length >= 3}
                    classNamePrefix="select"
                  />
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
                    onChange={(e) =>
                      setLeaseInfo({
                        ...leaseInfo,
                        lease_status: e.target.value,
                      })
                    }
                  >
                    <option value="" selected disabled hidden>
                      Choose here
                    </option>
                    <option value="active"> Active </option>
                    <option value="inactive"> Inactive </option>
                    <option value="completed"> Lease Completed </option>
                  </select>
                </div>
                <div className="flex-grow-[1]">
                  <label>RSO</label>
                  <input
                    type="text"
                    value={leaseInfo.odoo_order_id}
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
        <div>
          {isWetLeaseSelected && (
            <div className="basis-full bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
              <div className="mt-4 p-4">
                {invoiceInfo.map((item, index) => (
                  <InvoiceTable
                    index={index}
                    setInvoiceData={setInvoiceInfo}
                    allInvoiceData={invoiceInfo}
                  />
                ))}
                <div className="mt-4">
                  <button
                    className="p-2 m-2 bg-[#3b2dd0] rounded-[10px] text-white font-medium"
                    onClick={() => addInvoiceField()}
                  >
                    Add invoice
                  </button>
                  {/* <button
                    className = "p-2 m-2 bg-[#cc6b3d] rounded-[10px] text-white font-medium"
                    onClick={() => onInvoiceSubmit()}
                  >
                    Submit
                  </button> */}
                </div>
              </div>
            </div>
          )}
        </div>
        <AddDocument
          title="Lease Documents"
          uploadedDocument={uploadedDocument}
          setUploadedDocument={setUploadedDocument}
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
                  {showImage.length > 0 &&
                    showImage.map((img) => <p>{img.name}</p>)}
                </div>
              )}
            </div>
            <div className="p-5 text-sm">
              <div className="flex flex-col text-transparent">Photo here</div>
            </div>
          </div>
        </div>
        <div className="flex mt-5 animSlideup relative">
          <button
            onClick={() => navigate("/lease")}
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

export default NewLease;
