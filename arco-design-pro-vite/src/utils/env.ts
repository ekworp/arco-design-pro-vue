const debug =
  import.meta.env.MODE !== 'production' ||
  import.meta.env.VITE_ENABLE_MOCK === 'true';

export default debug;
