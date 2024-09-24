const express = require("express");
const app = express();
const routes = require("./routes/index")
const cors = require('cors');
app.use(cors());

app.use(express.json());   // json body parser
app.use("/api/v1" , routes);






app.listen(process.env.PORT,()=>{
    console.log(`Server listening at port no. ${process.env.PORT}`);
})