import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PermissionContext } from "../../Context/PermissionsContext";
import { useContext } from "react";
import useAuthorities from "../../utils/useAuthorities";

function NewAssetBtn({ tabName }) {
  const [perms, setPerms] = useContext(PermissionContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const {
    createAssetPerm,
    createLeasePerm,
    createMaintenancePerm,
    createOperatorPerm,
  } = useAuthorities();
  useEffect(() => {
    // console.log(perms);
  });

  const getButtonText = () => {
    switch (tabName) {
      case "asset":
        setButtonText("New Asset");
        setButtonLink("/assets/newAsset");
        //if the button is a child of asset component only then we need to check
        if (createAssetPerm) {
          setIsDisabled(false);
        }
        break;
      case "maintenance":
        setButtonText("New Maintenance");
        setButtonLink("/maintenance/new-maintenance");
        if (createMaintenancePerm) {
          setIsDisabled(false);
        }
        break;
      case "lease":
        setButtonText("New Lease");
        setButtonLink("/lease/newLease");
        if (createLeasePerm) {
          setIsDisabled(false);
        }
        break;
      case "operator":
        setButtonText("New Operator");
        setButtonLink("/operators/newOperator");
        if (createOperatorPerm) {
          setIsDisabled(false);
        }
        break;
      default:
        setButtonText("New Asset");
        break;
    }
  };

  useEffect(() => {
    getButtonText();
  });

  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(buttonLink)}
      className={`button text-white bg-blue-800 py-2 px-2 rounded-md shadow-md mx-2 text-xs sm:text-sm cursor-pointer ${
        isDisabled ? "bg-gray-400" : ""
      }`}
      disabled={isDisabled}
    >
      + {buttonText}
    </button>
  );
}

export default NewAssetBtn;
