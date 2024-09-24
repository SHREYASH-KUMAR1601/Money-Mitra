require('dotenv').config();
const express = require("express");
const app = express();
const routes = require("./routes/index");
const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:5173' // Or the actual origin of your frontend
}));

app.use(express.json());
app.use("/api/v1", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port no. ${process.env.PORT}`);
});
