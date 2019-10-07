import React, { Component } from "react";
import AcmaCaptionForm from "../Configuration/acma/acmaConfigForm";
import ChannelConfig from "./channel/ChannelConfig";
import ChannelContractualForm from "./channel/ChannelContractualForm";
import "./Configuration.css";
class Configuration extends Component {
  render() {
    return (
      <div className="Configuration">
        <AcmaCaptionForm />
        <ChannelContractualForm />
        <ChannelConfig />
      </div>
    );
  }
}

export default Configuration;
