import React, { useState, useEffect } from "react";
import axios from "axios";
import MyTabs from "../nav/tabs/MyTabs";
export default function DataHub() {
  const [number] = useState(1);
  let [refData, setRefData] = useState({});

  useEffect(() => {
    async function getReferenceData() {
      const response = await axios.get("http://localhost:3004/referenceData");
      console.log("useEffect is called", response.data);
      setRefData(response.data);
    }

    getReferenceData();
  }, [number]);

  return <MyTabs {...refData} />;
}
