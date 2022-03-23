import create from 'zustand';

const useStore = create(() => {
  return {
    router: null,
    dom: null,
    loaded: false,
  };
});

export default useStore;
