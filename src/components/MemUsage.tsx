import Gauge from "components/Gauge";
import React from "react";


export default class MemUsage extends React.Component {
  render() {
    return (
      <Gauge
        percentage={this.props.memUsed}
        label="Mem. Usage"
        valueLabel={`${Math.round(this.props.memUsed)}%`}
        width={100}
      />
    );
  }
}
