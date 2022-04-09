import create from 'zustand';

const useStore = create(() => {
  return {
    router: null,
    dom: null,
    debug: false,

    // indicate if the experience has been entered, so remove loading page component
    experienceStarted: false,

    // indicate if the selected experience has been loaded, so can dismiss the loading indicator
    experimentLoaded: false,
  };
});

export default useStore;
