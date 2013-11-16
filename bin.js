#!/usr/bin/env node

var args = process.argv.slice(2)
var modules = process.argv.slice(2)
var extend = require('lodash.assign')
var browserify = require('browserify')
var through = require('through')

makeBuildInstructions(modules, includeModules)

function makeBuildInstructions(modules, cb) {
  getWantedModules(modules, cb)
}

// write an err into this function
function getWantedModules(modules, cb) {
  var npmModules = []
  if (modules === "") console.log("Please include modules -maps, -tables, -charts")
  modules.forEach(function whichModules(module) {
      if (module === "-m" || module === "-maps") return npmModules.push("sheetsee-maps") 
      if (module === "-t" || module === "-tables") return npmModules.push("sheetsee-tables") 
      if (module === "-c" || module === "-charts") return npmModules.push("sheetsee-charts")
      console.error( module + " doesn't exist, please use -maps, -tables or -charts")
  })
  cb(npmModules)
}

function includeModules(npmModules) {
  if (npmModules.length === 0) return console.error("Aborted build, no modules required")
  var extendString = "if (typeof Sheetsee === 'undefined') window.Sheetsee = {};"
    + "var extend = require('lodash.assign'); extend(Sheetsee, "
  var counter = npmModules.length
  npmModules.forEach(function addModules(module) {
    counter--
    if (counter != 0) extendString = extendString + "require('" + module + "'), "
    if (counter === 0) extendString = extendString + "require('" + module + "'))"
  })
  // run the build
  runBuild(extendString)
}

function runBuild(extendString) {
  var dataStream = through()
  b = browserify()
  b.files.push(dataStream)
  b.bundle().pipe(process.stdout)
  dataStream.queue(extendString)
  dataStream.queue(null)
  }