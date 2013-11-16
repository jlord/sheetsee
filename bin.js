#!/usr/bin/env node

var args = process.argv.slice(2)
var modules = process.argv.slice(2)

//var Sheetsee = {}
//var extend   = require('lodash.assign')
//
//// consider this a "build file!" you can add/remove dependencies here, and the file will be created at dist/sheetsee.full.js.
//// creating these components are easy, just export an object, and things inside it will be extended to the main Sheetsee here.
//extend(Sheetsee, require('sheetsee-core'), require('sheetsee-tables'), require('sheetsee-maps'), require('sheetsee-charts'))
//
//module.exports = Sheetsee

// if (modules.match("-m" || "-maps")) console.log("I want maps!")
makeBuildInstructions(modules, includeModules)

function makeBuildInstructions(modules, cb) {
  getWantedModules(modules, cb)
}

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
  var extend = "extend(Sheetsee, "
  var counter = npmModules.length
  npmModules.forEach(function addModules(module) {
    console.log("counter is at", counter)
    counter--
    if (counter != 0) extend = extend + "require('" + module + "'), "
    if (counter === 0) extend = extend + "require('" + module + "'))"
    console.log("extend is", extend)
  })
  console.log(extend)
}