import { create } from "zustand";

const useStore = create(() => {
  return {
    router: null,
    dom: null,

    // shows FPS monitor
    debug: false,
    // hides UI elements in the experiment for recording/screenshots
    showcase: false,
    // hide/collapse config panel
    hideLeva: false,
    collapseLeva: true,

    // indicate if the experience has been entered, so remove loading page component
    experienceStarted: false,

    // indicate if the selected experience has been loaded, so can dismiss the loading indicator
    experimentLoaded: false,

    // state related to routing to/from experiments
    currentExperiment: null,

    // experiment uses orbit controls to orbit an object
    grabControls: false,
  };
});

export default useStore;
