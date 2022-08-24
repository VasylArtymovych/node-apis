const express = require("express");
const router = require("./routes/route");
const morgan = require("morgan");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use("/api/contacts", router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
