import create from 'zustand';

const useStore = create((set) => ({
  router: null,
}));

export default useStore;
