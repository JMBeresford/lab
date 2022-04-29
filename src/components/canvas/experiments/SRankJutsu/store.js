import create from 'zustand';

const useStore = create(() => {
  return {
    target1: null,
    target2: null,
    size: null,
    scene: null,
    cam: null,
  };
});

export default useStore;
