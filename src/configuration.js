const config = {
  api: {
    // variabile d'ambiente (API_URL)
    uri: process.env.API_URL || "http://localhost:8000",
  },
  paginationNumber: 3,
};

export default config;
