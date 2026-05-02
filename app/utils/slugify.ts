export const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")        // optional cleanup
    .replace(/[^\w\s-]/g, "")    // special char remove
    .replace(/\s+/g, "-");       // space to dash
};