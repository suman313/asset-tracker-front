import axios from "axios";
import { setBaseUrl } from "../config";

const upload_document = async (id, section, uploadedDocument) => {
  let sectionId = ""
  switch (section) {
    case "asset":
      sectionId = "asset_id"
      break;
    case "lease":
      sectionId = "lease_id"
      break;
    case "maintenance":
      sectionId = "maintenance_id"
      break;
    case "operator":
      sectionId = "operator_id"
      break;
    default:
      break;
  }
  const formData = new FormData();
  formData.append(sectionId, id);
  formData.append("types_section", section);
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
    // setLoader(true);
    const { data } = await axios.post(
      `${setBaseUrl}/lease/upload_attachment`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default upload_document;
