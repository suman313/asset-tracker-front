import React from "react";

function InvoiceTable({ index, setInvoiceData, allInvoiceData }) {
  const onNameChange = (e) => {
    let eventName = e.target.value;
    allInvoiceData[index] = {
      ...allInvoiceData[index],
      invoice_name: eventName,
    };
    setInvoiceData(allInvoiceData);
  };

  const onDateChange = (e) => {
    let eventName = e.target.value;
    allInvoiceData[index] = {
      ...allInvoiceData[index],
      invoice_date: eventName,
    };
    setInvoiceData(allInvoiceData);
  };

  const onIdChange = (e) => {
    let eventName = e.target.value;
    allInvoiceData[index] = { ...allInvoiceData[index], invoice_id: eventName };
    setInvoiceData(allInvoiceData);
  };

  const onOperatorChange = (e) => {
    let eventName = e.target.value;
    allInvoiceData[index] = {
      ...allInvoiceData[index],
      operator_name: eventName,
    };
    setInvoiceData(allInvoiceData);
  };

  const onFileUploade = (e) => {
    let file = e.target.files[0];
    allInvoiceData[index] = { ...allInvoiceData[index], document: file };
    setInvoiceData(allInvoiceData);
  }

  return (
    <div className="grid grid-cols-[_0.5fr_0.5fr_0.5fr_0.5fr_1fr] m-2  text-center">
      <div className="">
        <div className="p-1 text-[#817d7d] text-xl">Invoice Name</div>
        <input
          className="m-1 p-1 rounded-[10px] border-[2px] text-center "
          placeholder="invoice name"
          type="text"
          defaultValue={allInvoiceData[index].invoice_name}
          onChange={onNameChange}
        />
      </div>
      <div className="">
        <div className="p-1 text-[#817d7d] text-xl">Invoice Date</div>
        <input
          className="m-1 p-1 rounded-[10px] border-[2px] text-center"
          placeholder="invoice date"
          type="date"
          defaultValue={allInvoiceData[index].invoice_date}
          onChange={onDateChange}
        />
      </div>
      <div className="">
        <div className="p-1 text-[#817d7d] text-xl">Invoice ID</div>
        <input
          className="m-1 p-1 rounded-[10px] border-[2px] text-center"
          placeholder="invoice id"
          type="text"
          defaultValue={allInvoiceData[index].invoice_no}
          onChange={onIdChange}
        />
      </div>
      <div className="">
        <div className="p-1 text-[#817d7d] text-xl">Operator Name</div>
        <input
          className="m-1 p-1 rounded-[10px] border-[2px] text-center"
          placeholder="operator name"
          type="text"
          defaultValue={allInvoiceData[index].operator_name}
          onChange={onOperatorChange}
        />
      </div>
      <div>
        <div className="p-1 text-[#817d7d] text-xl">Upload document</div>
        <input
        className="m-1 p-1 rounded-[10px] border-[2px] text-center"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={onFileUploade}
        />
      </div>
    </div>
  );
}

export default InvoiceTable;
