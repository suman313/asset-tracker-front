import { useEffect, useState } from "react";
import useLocalstorage from "./useLocalstorage";

export default function useAuthorities() {
  const [assetsTabPerm, setAssetTabPerm] = useState(false);
  const [maintenanceTabPerm, setMaintenanceTabPerm] = useState(false);
  const [leasesTabPerm, setLeasesTabPerm] = useState(false);
  const [operatorsTabPerm, setOperatorsTabPerm] = useState(false);
  // Button permissions
  const [createAssetPerm, setCreateAssetPerm] = useState(false);
  const [createMaintenancePerm, setCreateMaintenancePerm] = useState(false);
  const [createLeasePerm, setCreateLeasePerm] = useState(false);
  const [createOperatorPerm, setCreateOperatorPerm] = useState(false);
  const { getValues } = useLocalstorage();

  const perms = getValues();
  useEffect(() => {
    if (
      perms.indexOf("ASSETS.ALL") !== -1 ||
      perms.indexOf("ASSETS.VIEW") !== -1 ||
      perms.indexOf("ASSETS.CRU") !== -1 ||
      perms.indexOf("ADMIN.ALL") !== -1
    ) {
      setAssetTabPerm(true);
    }
    if (
      perms.indexOf("MAINT.ALL") !== -1 ||
      perms.indexOf("MAINT.VIEW") !== -1 ||
      perms.indexOf("MAINT.CRU") !== -1 ||
      perms.indexOf("ADMIN.ALL") !== -1
    ) {
      setMaintenanceTabPerm(true);
    }
    if (
      perms.indexOf("LEASE.ALL") !== -1 ||
      perms.indexOf("LEASE.VIEW") !== -1 ||
      perms.indexOf("LEASE.CRU") !== -1 ||
      perms.indexOf("ADMIN.ALL") !== -1
    ) {
      setLeasesTabPerm(true);
    }
    if (
      perms.indexOf("OPERATOR.ALL") !== -1 ||
      perms.indexOf("OPERATOR.VIEW") !== -1 ||
      perms.indexOf("OPERATOR.CRU") !== -1 ||
      perms.indexOf("ADMIN.ALL") !== -1
    ) {
      setOperatorsTabPerm(true);
    }
    // Button permissions

    if (
      perms.indexOf("ASSETS.ALL") !== -1 ||
      perms.indexOf("ASSETS.CRU") !== -1 ||
      perms.indexOf("ADMIN.ALL") !== -1
    ) {
      setCreateAssetPerm(true);
    }
    if (
      perms.indexOf("MAINT.ALL") !== -1 ||
      perms.indexOf("MAINT.CRU") !== -1 ||
      perms.indexOf("ADMIN.ALL") !== -1
    ) {
      setCreateMaintenancePerm(true);
    }
    if (
      perms.indexOf("LEASE.ALL") !== -1 ||
      perms.indexOf("LEASE.CRU") !== -1 ||
      perms.indexOf("ADMIN.ALL") !== -1
    ) {
      setCreateLeasePerm(true);
    }
    if (
      perms.indexOf("OPERATOR.ALL") !== -1 ||
      perms.indexOf("OPERATOR.CRU") !== -1 ||
      perms.indexOf("ADMIN.ALL") !== -1
    ) {
      setCreateOperatorPerm(true);
    }
  }, []);

  return {
    assetsTabPerm,
    maintenanceTabPerm,
    leasesTabPerm,
    operatorsTabPerm,
    createAssetPerm,
    createAssetPerm,
    createMaintenancePerm,
    createLeasePerm,
    createOperatorPerm,
  };
}
