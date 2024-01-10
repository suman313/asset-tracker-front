import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import Loader from "../../Loader";
import { TableLoader } from "../../TableLoader";
import { LoaderContext } from "../../../Context/LoaderContext";
import CurrentItems from "./CurrentItems";
import { Pagination } from "../Pagination";
import UpperTab from "./UpperTab";

function OperatorTable() {
  // set the item quantity to load page numbers
  const [items, setItems] = useState(1);
  // set items per page
  const itemsPerPage = 10;
  const [allOperators, setAllOperators] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loader, setLoader] = useContext(LoaderContext);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [fetchSearchData, setFetchSearchData] = useState(false);

  const getAllOperators = async (qry, value="") => {
    console.log(qry, value)
    let headers = {};
    if(qry !== null) {
      headers = {
        "Content-Type": "application/json",
        "x-access-tokens": sessionStorage.getItem("token"),
        offset: itemOffset,
        limit: itemsPerPage,
        [qry]: value
      }
    }
    else{
      headers = {
        "Content-Type": "application/json",
        "x-access-tokens": sessionStorage.getItem("token"),
        offset: itemOffset,
        limit: itemsPerPage,
      }
    }
    try {
      setLoader(true);
      const { data } = await axios.get(`${setBaseUrl}/operator/get_all`, {
        headers: headers,
      });
      console.log(data);
      setAllOperators(data);
      if (data.length) setItems(data[0].total_data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }; //eta thakbe

  useEffect(() => {
    getAllOperators();
  }, [deleted, itemOffset]); //eta thakbe

  return (
    <div id="main-operator" className="block">
      <UpperTab setItems={setItems} getAllOperators={getAllOperators} setFetchSearchData={setFetchSearchData}/>
      {loader ? (
        <Loader />
      ) : (
        <CurrentItems
          allOperators={allOperators}
          deleted={deleted}
          setDeleted={setDeleted}
        />
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        itemsLength={items}
        itemOffset={itemOffset}
        setItemOffset={setItemOffset}
      />
    </div>
  );
}

export default OperatorTable;
