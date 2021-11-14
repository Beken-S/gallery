export const importAll = (r) => {
  const sources = [];
  r.keys().forEach((key, i) => (sources[i] = r(key)));
  return sources;
};
