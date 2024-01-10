import React, { useEffect, useState } from "react";
import battery from "../../../assets/images/telematics/battery.svg";
import voltage from "../../../assets/images/telematics/voltage.svg";
import NoDataIco from "../../../assets/images/telematics/no_data.svg";
import gps from "../../../assets/images/telematics/gps.svg";
import onOff from "../../../assets/images/telematics/switch.svg";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import io from "socket.io-client";
import { lastEventData } from "../../../apis/Telematics/last_event_data";
import LocationMarker from "./LocationMarker";
function DeviceEvents({ devId }) {
  const [internalBattery, setInternalBattery] = useState(null);
  const [vehicleBatteryVol, setVehicleBatteryVol] = useState(null);
  const [mapPosition, setMapPosition] = useState([22.539999, 88.354111]);
  const [gpsGroundSpeed, setGpsGroundSpeed] = useState(0);
  const [gpsAltitude, setGpsAltitude] = useState("OFF");
  const [turnSwitch, setTurnSwitch] = useState(false);
  const [DeviceOnOff, setDeviceOnOff] = useState("OFF");

  useEffect(() => {
    // console.log(devId);
    const socket = io("https://websocket.durbinservices.com/");
    socket.on(`genie/maco-storm/device-internal-battery/${devId}`, (data) => {
      let splitByHyphen = data.split(" - ");
      let trimmedString = splitByHyphen[1].trim();
      let stringWithoutPercent = trimmedString.replace("%", "");
      let floatValue = parseFloat(stringWithoutPercent);
      // console.log(floatValue)
      if (floatValue > 100) setInternalBattery(100);
      else setInternalBattery(floatValue);
    });

    socket.on(`genie/maco-storm/vehicle-battery-voltage/${devId}`, (data) => {
      let splitByHyphen = data.split(" - ");
      let trimmedString = splitByHyphen[1].trim();
      let floatValue = parseFloat(trimmedString);
      if (floatValue > 13.5) {
        setDeviceOnOff("ON");
      } else {
        setDeviceOnOff("OFF");
      }
      setVehicleBatteryVol(splitByHyphen[1]);
    });
    socket.on(`genie/maco-storm/gps-push/${devId}`, (data) => {
      let parse_data = "";
      console.log(data);

      parse_data = data.split("\n")[1];
      let gpsData = JSON.parse(parse_data);
      let lat = gpsData.lat / 1000000;
      let lng = gpsData.lng / 1000000;
      console.log(lat, lng);
      setMapPosition([lat, lng]);
      setGpsGroundSpeed(gpsData.speed);
    });
    socket.on(`genie/maco-storm/remote-start-stop/${devId}`, (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [mapPosition, vehicleBatteryVol, internalBattery, DeviceOnOff]);

  const deviceOnOffEvent = (triggeredEvent) => {
    const socket = io("https://websocket.durbinservices.com/");
    if (turnSwitch == false) {
      socket.emit(
        "client-message",
        `genie/maco-storm/remote-start-stop/${devId}#TURN_OFF`
      );
    } else {
      socket.emit(
        "client-message",
        `genie/maco-storm/remote-start-stop/${devId}#TURN_ON`
      );
    }
    setTurnSwitch((prev) => !prev);
  };

  const getAllEventData = async () => {
    let getData = await lastEventData(devId);
    console.log(getData);
    let splitByHyphen = getData.device_internal_battery.split(" - ");
    let trimmedString = splitByHyphen[1].trim();
    let stringWithoutPercent = trimmedString.replace("%", "");
    let floatValue = parseFloat(stringWithoutPercent);
    if (floatValue > 100) setInternalBattery(100);
    else setInternalBattery(floatValue);

    let splitVolTageByHyphen = getData.vehicle_battery_voltage.split(" - ");
    let trimmedStringForVoltage = splitVolTageByHyphen[1].trim();
    let floatValueForVoltage = parseFloat(trimmedStringForVoltage);
    console.log(floatValueForVoltage);
    if (floatValueForVoltage > 13.5) {
      setDeviceOnOff("ON");
    } else {
      setDeviceOnOff("OFF");
    }
    setVehicleBatteryVol(splitVolTageByHyphen[1]);
    let parse_data = "";

    parse_data = "{" + getData.gps_push.split("\n{")[1];
    parse_data = JSON.parse(parse_data);
    let lat = parse_data.lat / 1000000;
    let lng = parse_data.lng / 1000000;
    setMapPosition([lat, lng]);
    setGpsGroundSpeed(parse_data.speed);
    setGpsAltitude(parse_data.altitude);
  };

  useEffect(() => {
    console.log(devId);
    getAllEventData();
  }, []);
  return (
    // <!--Device Events Begins-->
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center p-5">
        <p className="text-[#383434] font-medium text-[1.45rem]  ">
          Device Events
        </p>
        <button
          onClick={() => deviceOnOffEvent("turnOff")}
          className="bg-[#ae4545] pt-2 pb-2 pl-4 pr-4 text-[#fff] font-medium rounded-md"
        >
          {turnSwitch ? "Turn On" : "Turn Off"}
        </button>
      </div>
      <div id="device-events" className="grid grid-cols-4 gap-5">
        {/* <div className="flex gap-5"> */}
        <div className="grid grid-cols-2 gap-5 col-span-2 p-5">
          <div className="flex flex-col rounded-md gap-10 bg-[#636468] p-5 ">
            <p className="text-[#eaebee] text-sm font-semibold">
              Asset Tracker internal battery
            </p>
            <div className="flex justify-between w-full">
              <img src={battery} alt="internal battery power" />
              <div className="flex justify-center items-center text-[#eaebee] text-[2rem]">
                {internalBattery == null ? (
                  <img src={NoDataIco} alt="no data available" />
                ) : (
                  internalBattery + "%"
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-md gap-10 bg-[#636468] p-5 ">
            <p className="text-[#eaebee] text-lg font-semibold">
              Vehicle Battery Voltage
            </p>
            <div className="flex justify-between w-full">
              <img src={voltage} alt="internal battery power" />
              <div className="flex justify-center items-center text-[#eaebee] text-[2rem]">
                {vehicleBatteryVol == null ? (
                  <img src={NoDataIco} alt="no data available" />
                ) : (
                  vehicleBatteryVol
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-md gap-10 bg-[#636468] p-5 ">
            <p className="text-[#eaebee] text-lg font-semibold">
              GPS Ground Speed
            </p>
            <div className="flex justify-between w-full">
              <img src={gps} alt="internal battery power" />
              <div className="flex justify-center items-center text-[#eaebee] text-[2rem]">
                {gpsGroundSpeed}
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-md gap-10 bg-[#636468] p-5">
            <p className="text-[#eaebee] text-lg font-semibold">
              Vehicle Status
            </p>
            <div className="flex justify-between w-full">
              <img src={onOff} alt="internal battery power" />
              <div className="flex justify-center items-center text-[#eaebee] text-[2rem]">
                {DeviceOnOff}
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col rounded-md gap-10 bg-[#3743e9] p-5">
            <p className="text-[#eaebee] text-lg font-semibold">
              Vehicle on/off status
            </p>
            <div className="flex justify-between w-full">
              <img src={battery} alt="internal battery power" />
              <div className="flex justify-center items-center text-[#eaebee] text-[1rem]">
                cominng soon...
              </div>
            </div>
          </div> */}
          {/* <div className="flex flex-col rounded-md gap-10 bg-[#3743e9] p-5">
            <p className="text-[#eaebee] text-lg font-semibold">
              Device internal battery
            </p>
            <div className="flex justify-between w-full">
              <img src={battery} alt="internal battery power" />
              <div className="flex justify-center items-center text-[#eaebee] text-[2rem]">
                56%
              </div>
            </div>
          </div> */}
        </div>
        {/* </div> */}
        <MapContainer
          center={mapPosition}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "400px", width: "100%", gridColumn: "span 2" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker position={mapPosition} setPosition={setMapPosition} />
        </MapContainer>
      </div>
    </div>
    //   <!--Device Events Ends-->
  );
}

export default DeviceEvents;

// TOPIC
// client-message

// MESSAGE DATA
// genie/maco-storm/remote-start-stop/ca3b612b-dc7e-4508-933d-a41aceab6e7b#TURN_ON
// genie/maco-storm/remote-start-stop/ca3b612b-dc7e-4508-933d-a41aceab6e7b#TURN_OFF
