require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();
app.get("/", (req,res)=>{
  res.status(200).send("Welcome!")
})
const UserRoutes = require("./Operations/User/User.route");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/user", UserRoutes);

app.listen(PORT, async () => {
  await connect();
  console.log(`Server running at http://localhost:${PORT}`);
});
