import React, { Component } from "react";
import AcmaCaptionForm from "../Configuration/acma/acmaConfigForm";
import ChannelConfig from "./channel/ChannelConfig";
import ChannelContractualForm from "./channel/ChannelContractualForm";
import "./Configuration.css";
export default function Configuration(props) {
  return (
    <div className="Configuration">
      <AcmaCaptionForm {...props} />

      <ChannelContractualForm {...props} />
      <ChannelConfig {...props} />
    </div>
  );
}
