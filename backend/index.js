const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors=require("cors");
const path = require("path");
const hbs = require("hbs");

const swaggerRoutes = require("./routes/swagger");
const userRoutes = require("./routes/user");

require('dotenv').config();

//app instance
const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI,
  {useNewUrlParser:true,
    useUnifiedTopology: true
}
)
.then(()=>console.log("DB Connected"));

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, 'public')));

  //routes middleware
  app.use("/api-docs", swaggerRoutes);
  app.use("/api", userRoutes);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

module.exports=app.listen(port, () => {
  console.log(
    `Server is running on port ${port}`
  );
});
