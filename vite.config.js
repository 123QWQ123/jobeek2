export default {
  build: {
    outDir: "public/build",
    rollupOptions: {
      external: ["uuid"],
    },
  },
};
