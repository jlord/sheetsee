#!/usr/bin/env node

var modules = process.argv.slice(2)
var browserify = require('browserify')
var through = require('through')
var fs = require('fs')
var path = require('path')

makeBuildInstructions(modules, includeModules)

function makeBuildInstructions (modules, cb) {
  getWantedModules(modules, cb)
}

function getWantedModules (modules, cb) {
  var npmModules = []
  var writeFile = false
  if (modules === '') console.log('Please include modules -maps/-m or -tables/-t')
  modules.forEach(function whichModules (module) {
    if (module === '-m' || module === '-maps') return npmModules.push('sheetsee-maps')
    if (module === '-t' || module === '-tables') return npmModules.push('sheetsee-tables')
    if (module === '--save') {
      writeFile = true
      return
    }
    console.error(module + ' does not exist, please use -maps/-m or -tables/-t')
  })
  cb(npmModules, writeFile)
}

function includeModules (npmModules, writeFile) {
  if (npmModules.length === 0) return console.error('Aborted build, no modules required')
  var extendString = "if (typeof window.Sheetsee === 'undefined') window.Sheetsee = {};" +
    " window.Sheetsee = require('sheetsee-core'); var extend = require('lodash.assign'); extend(window.Sheetsee, "
  var counter = npmModules.length
  npmModules.forEach(function addModules (module) {
    counter--
    if (counter !== 0) extendString = extendString + "require('' + module + ''), "
    if (counter === 0) extendString = extendString + "require('' + module + '')); module.exports = Sheetsee;"
  })
  runBuild(extendString, writeFile)
}

function runBuild (extendString, writeFile) {
  var dataStream = through()
  var origDir = process.cwd()
  process.chdir(__dirname)
  var b = browserify()
  b.files.push(dataStream)
  if (writeFile) {
    var output = path.join(origDir, 'sheetsee.js')
    b.bundle().pipe(fs.createWriteStream(output))
  } else b.bundle().pipe(process.stdout)
  dataStream.queue(extendString)
  dataStream.queue(null)
  process.chdir(origDir)
}
