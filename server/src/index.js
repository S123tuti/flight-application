const express = require('express');
const app = express();
const route = require("./router/route")
const cors = require("cors")


 app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use("/", route)


const PORT = process.env.PORT || 3500;

 
  app.listen(PORT, () => {
    console.log(`serving at http://localhost:${PORT}`);
  });
