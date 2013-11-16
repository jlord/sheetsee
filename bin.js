#!/usr/bin/env node

var args = process.argv.slice(2)
var modules = process.argv.slice(2)
var extend = require('lodash.assign')
var browserify = require('browserify')
var through = require('through')
var fs = require('fs')

makeBuildInstructions(modules, includeModules)

function makeBuildInstructions(modules, cb) {
  getWantedModules(modules, cb)
}

// write an err into this function
function getWantedModules(modules, cb) {
  var npmModules = []
  var writeFile = false
  if (modules === "") console.log("Please include modules -maps, -tables, -charts")
  modules.forEach(function whichModules(module) {
      if (module === "-m" || module === "-maps") return npmModules.push("sheetsee-maps") 
      if (module === "-t" || module === "-tables") return npmModules.push("sheetsee-tables") 
      if (module === "-c" || module === "-charts") return npmModules.push("sheetsee-charts")
      if (module === "--save") return writeFile = true
      console.error( module + " doesn't exist, please use -maps, -tables or -charts")
  })
  cb(npmModules, writeFile)
}

function includeModules(npmModules, writeFile) {
  if (npmModules.length === 0) return console.error("Aborted build, no modules required")
  var extendString = "if (typeof Sheetsee === 'undefined') window.Sheetsee = {};"
    + "var extend = require('lodash.assign'); extend(Sheetsee, "
  var counter = npmModules.length
  npmModules.forEach(function addModules(module) {
    counter--
    if (counter != 0) extendString = extendString + "require('" + module + "'), "
    if (counter === 0) extendString = extendString + "require('" + module + "'))"
  })
  runBuild(extendString, writeFile)
}

function runBuild(extendString, writeFile) {
  var dataStream = through()
  b = browserify()
  b.files.push(dataStream)
  if (writeFile) {
    b.bundle().pipe(fs.createWriteStream("sheetsee.js"))
  } else b.bundle().pipe(process.stdout)
  dataStream.queue(extendString)
  dataStream.queue(null)
  }