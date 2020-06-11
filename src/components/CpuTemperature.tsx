import React from "react";
import Gauge from "components/Gauge";

export default function CpuTemperature({temperature}){
  const percentage = Math.min(100,temperature);
  return (
    <Gauge
      percentage={percentage}
      label="CPU Temperature"
      valueLabel={`${Math.round(temperature)} °C`}
      fontSize={50}
      width={100}
    />
  );
}
