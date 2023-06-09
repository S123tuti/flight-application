const express = require("express")
const route = express.Router()
const {flightData}= require("../controller/flight")


route.post("/flights", flightData)








module.exports = route