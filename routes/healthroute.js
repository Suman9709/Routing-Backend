const {Router} = require("express")
const {health} = require("../handlers/health")

const healthRoute= Router();
healthRoute.get("/", health)

module.exports ={
    healthRoute,
 
}