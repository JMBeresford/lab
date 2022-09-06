import getData from "@/helpers/data";
import useStore from "@/helpers/store";
import React, { useMemo } from "react";

const ExperimentLoading = () => {
  const { experimentLoaded, currentExperiment } = useStore();

  const experiment = useMemo(() => {
    const data = getData();

    let ex = data.find((ex) => ex.page === currentExperiment);

    return ex ? ex.name.toUpperCase() : "";
  }, [currentExperiment]);

  return (
    <div
      className={`loadingIndicator ${
        experimentLoaded || currentExperiment === null ? "out" : ""
      }`}
    >
      <h3>loading experiment</h3>
      <h1>{experiment}</h1>
      <div className="bar" />
    </div>
  );
};

export default ExperimentLoading;
