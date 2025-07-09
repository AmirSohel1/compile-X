require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const compileRoute = require("./routes/compile");
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", compileRoute);

// Import routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/folders", require("./routes/folders"));
app.use("/api/snippets", require("./routes/snippets"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
