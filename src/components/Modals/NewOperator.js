import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setBaseUrl } from "../../config";
import { LoaderContext } from "../../Context/LoaderContext";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import Document from "../viewer/Document";
import deleteDocument from "../../apis/files/deleteDocument";

function NewOperator() {
  const [loader, setLoader] = useContext(LoaderContext);
  const navigate = useNavigate();
  const [operatorData, setOperatorData] = useState({
    name: "",
    aadhar_no: "",
    joining_date: "",
    termination_date: "",
    net_inhand_salary: "",
    pf_account_no: "",
    phone_code: "+91",
    phone_no: "",
    ifsc_code: "",
    account_no: "",
  });
  const [phone_number_alert, setPhone_number_alert] = useState(null);
  const [validAdhaar, setValidAdhaar] = useState(null);
  
  //target the document input element by using useRef hook
  const documentInputRef = React.useRef(null);
  
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [showDocument, setShowDocument] = useState(null);
  const [alreadyUploadedDocuments, setAlreadyUploadedDocuments] = useState([]);

  // const mobile_input_ref = useRef(null);

  const handlePhoneNo = (e) => {
    setOperatorData({
      ...operatorData,
      phone_no: e.target.value,
    });
    let phoneDigitCount = e.target.value.length;
    if (phoneDigitCount === 10) {
      setPhone_number_alert(null);
    } else {
      setPhone_number_alert(
        "Phone number must be of 10 digits. you gave: " + phoneDigitCount
      );
    }
  };

  const handleAdhaarNo = (e) => {
    setOperatorData({
      ...operatorData,
      aadhar_no: e.target.value,
    });
    let aadhar_no_value = e.target.value;
    let aadhar_no_value_length = aadhar_no_value.length;
    var expr =
      /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
    if (expr.test(aadhar_no_value)) {
      setValidAdhaar(null);
    } else {
      setValidAdhaar(
        "Adhaar number must contain 12 digits. You gave>> " +
          aadhar_no_value_length
      );
    }
  };

  useEffect(() => {
    console.log(operatorData.phone_no);
  });

    //invoke the document upload input on button click
    const handleDocumentUploadInput = (e) => {
      documentInputRef.current.click();
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
    //upload document
    const upload_document = async (operator_id) => {
      const formData = new FormData();
      formData.append("operator_id", operator_id);
      formData.append("types", "operator");
      formData.append("serial_no", "9HUDU755");
      formData.append("doc_types", "document");
      formData.append("doc_expiry_date", "13/06/2024");
      if (uploadedDocument) {
        for (const key in uploadedDocument) {
          if (uploadedDocument.hasOwnProperty(key)) {
            formData.append("photo", uploadedDocument[key]);
          }
        }
      }
      try {
        // setLoader(true);
        const { data } = await axios.post(
          `${setBaseUrl}/operator/upload-file`,
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
      } finally {
        // setLoader(false);
      }
    };

  const handleSubmit = async () => {
    //checking if usse has filled correct phone number and adhaar number
    if (phone_number_alert !== null) {
      alert("Please enter a valid phone number");
      return;
    }
    if (validAdhaar === false) {
      alert("Please enter a valid 12 digit adhaar number");
      return;
    }
    // Ends --- checking if usse has filled correct phone number and adhaar number

    //Check if the user has filled in all the required fields
    let mandatoryFields = ["name", "joining_date", "account_no"];
    for (const key in operatorData) {
      if (mandatoryFields.includes(key) && operatorData[key].length === 0) {
        alert(key.toLocaleUpperCase() + " cannot be empty");
        return;
      }
    }
    //Ends --- Check if the user has filled in all the required fields

    try {
      setLoader(true);
      const { data } = await axios.post(
        `${setBaseUrl}/operator/create`,
        operatorData,
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      upload_document(data.id)
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    } finally {
      setLoader(false);
      navigate("/operators");
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
  if (loader) {
    return <Loader />;
  } else {
    return (
      <div id="new-operator">
        <div class="flex ">
          <button onClick={() => navigate("/operators")}>
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
            New Operator
          </p>
        </div>
        <div class="flex">
          <div class="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
            <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 class="font-medium text-base mr-auto">Basic Feilds</h2>
            </div>
            <div class="p-5 text-sm">
              <div class="mt-4">
                <label class="">Name</label>
                <input
                  onChange={(e) =>
                    setOperatorData({ ...operatorData, name: e.target.value })
                  }
                  type="text"
                  placeholder="Op Name(eg: Me X)"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div class="mt-4">
                <label class="">Pin</label>
                <input
                  disabled
                  type="text"
                  placeholder="Not required"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div class="mt-4">
                <label class="">Mobile No.</label>
                <input
                  onChange={handlePhoneNo}
                  type="number"
                  placeholder="Mobile No."
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              {phone_number_alert && (
                <p className="text-[#24a062] font-bold  mt-4">
                  {phone_number_alert}
                </p>
              )}
            </div>
          </div>
          <div class="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
            <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 class="text-transparent font-medium text-base mr-auto">
                Basic Feilds
              </h2>
            </div>
            <div class="p-5 text-sm">
              <div class="mt-0">
                <label>Aadhaar no.</label>
                <input
                  onChange={handleAdhaarNo}
                  type="text"
                  placeholder="Aadhaar no."
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              {validAdhaar !== null && (
                <p className="text-[#24a062] font-bold mt-4">{validAdhaar}</p>
              )}
              <div class="mt-4">
                <label class="">Bank account no.</label>
                <input
                  onChange={(e) =>
                    setOperatorData({
                      ...operatorData,
                      account_no: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Bank account no."
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div class="mt-4">
                <label class="">Bank IFSC Code</label>
                <input
                  onChange={(e) =>
                    setOperatorData({
                      ...operatorData,
                      ifsc_code: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Bank IFSC Code"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              {/* <div class="mt-4">
                <label class="">Driving Licence</label>
                <input
                  type="text"
                  placeholder="0"
                  class="input w-full border mt-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div> */}
            </div>
          </div>
          <div class="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
            <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 class="text-transparent font-medium text-base mr-auto">
                Basic Feilds
              </h2>
            </div>
            <div class="p-5 text-sm">
              <div class="mt-0">
                <label>Date of joining</label>
                <input
                  onChange={(e) =>
                    setOperatorData({
                      ...operatorData,
                      joining_date: e.target.value,
                    })
                  }
                  type="date"
                  placeholder="07-03-2021"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div class="mt-4">
                <label>Date of leaving</label>
                <input
                  onChange={(e) =>
                    setOperatorData({
                      ...operatorData,
                      termination_date: e.target.value,
                    })
                  }
                  type="date"
                  placeholder="07-03-2021"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div class="mt-4">
                <label class="">Net Inhand Salary Fixed</label>
                <input
                  onChange={(e) =>
                    setOperatorData({
                      ...operatorData,
                      net_inhand_salary: e.target.value,
                    })
                  }
                  type="number"
                  placeholder="Net Inhand Salary Fixed"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div class="mt-4">
                <label class="">PF Account No.</label>
                <input
                  onChange={(e) =>
                    setOperatorData({
                      ...operatorData,
                      pf_account_no: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="PF Account No."
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex animSlideup relative">
          <div class="basis-full bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl justify-between">
            <div class="flex p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 class="font-medium text-base mr-auto ">Operator Documents</h2>
              <button
                onClick={handleDocumentUploadInput}
                className="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex"
              >
                <input
                  ref={documentInputRef}
                  type="file"
                  multiple
                  accept=".doc,.png,.jpg,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  class="hidden"
                  wfd-id="id57"
                  onChange={handleDocumentChange}
                />
                + Add Documents
              </button>
            </div>

            <div class="p-5 text-sm">
              {uploadedDocument && (
                <div className="flex flex-col">
                  <span className="text-lg">Uploading....</span>
                  {showDocument.length > 0 &&
                    showDocument.map((doc) => <p>{doc.name}</p>)}
                </div>
              )}
            </div>
            {alreadyUploadedDocuments.length > 0 && (
              <div className="p-5 text-sm">
                <span className="text-lg">Existing</span>
                <div className="flex">
                  {alreadyUploadedDocuments.map((doc) => (
                    // <p>{doc.substring(doc.length - 17)}</p>
                    <Document pdfdocument={doc} handleDelete={deleteDocuments}/>
                  ))}
                </div>
              </div>
            )}
            {/* <div class="p-5 text-sm">
              <div class="flex flex-col text-transparent">Documents here</div>
            </div> */}
          </div>
        </div>
        <div class="flex mt-5">
          <button
            onclick="showDiv('main-operator','new-operator');"
            class="flex basis-1/2 align-middle justify-center py-3 border mx-4 rounded-lg border-gray-600 dark:border-gray-400 text-sm font-medium text-slate-800 dark:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
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
}

export default NewOperator;
