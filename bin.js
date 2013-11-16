#!/usr/bin/env node

var args = process.argv.slice(2)
var modules = process.argv.slice(2)
var extend   = require('lodash.assign')

var Sheetsee = {}

module.exports = Sheetsee

makeBuildInstructions(modules, includeModules)

function makeBuildInstructions(modules, cb) {
  getWantedModules(modules, cb)
}

// write an err into this function
function getWantedModules(modules, cb) {
  var npmModules = []
  modules.forEach(function whichModules(module) {
      if (module === "-m" || module === "-maps") npmModules.push("sheetsee-maps") && console.log("I want maps!")
      if (module === "-t" || module === "-tables") npmModules.push("sheetsee-tables") &&  console.log("I want tables!")
      if (module === "-c" || module === "-charts")  npmModules.push("sheetsee-charts") && console.log("I want charts!")
  })
  cb(npmModules)
}

function includeModules(npmModules) {
  console.log("I ran include Modules", npmModules)
  var extendString = "extend(Sheetsee, "
  var counter = npmModules.length
  npmModules.forEach(function addModules(module) {
    console.log("counter is at", counter)
    counter--
    if (counter != 0) extendString = extendString + "require('" + module + "'), "
    if (counter === 0) extendString = extendString + "require('" + module + "'))"
    console.log("extend is", extendString)
  })
  console.log(extend)
}