import React, { Component } from "react";
import AcmaCaptionForm from "../Configuration/acma/acmaConfigForm";
import ChannelConfig from "./channel/ChannelConfig";
import ChannelContractualForm from "./channel/ChannelContractualForm";
import "./Configuration.css";
export default function Configuration(props) {
  return (
    <div className="Configuration">
     
       <div className="cap-form">
          <AcmaCaptionForm {...props} />
          <ChannelContractualForm {...props} />
       </div>
       <div className="chan-form">
       <ChannelConfig {...props} />
       </div>
      
    </div>
  );
}
