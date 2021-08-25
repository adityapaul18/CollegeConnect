const express = require("express");
const router = express.Router();
const swaggerSpec = require("../utils/swagger.js");

router.get("/", (req, res) => {
  res.render("default", { title: "Swagger", layout: "default" });
});

router.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

module.exports = router;
