const express = require("express");
const apiRoutes = require("./routes/index");

const PORT = process.env.PORT || 8080;

const app = express();

app.use("/api", apiRoutes);

const conectedServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

conectedServer.on("error", (e) => {
  console.log(e.message);
});
