var fs = require('fs')

var benchmarkResultFilename = './tmp/benchmark.json'

function benchmarkJSONReporter () {
  var benchmarkResult = {}

  this.onSpecComplete = function (_, result) {
    var fnName = result.benchmark.suite
    var libraryName = result.benchmark.name
    var operationsPerSecond = Math.floor(result.benchmark.hz)

    if (!benchmarkResult[fnName]) {
      benchmarkResult[fnName] = {}
    }

    benchmarkResult[fnName][libraryName] = operationsPerSecond
  }

  this.onRunComplete = function () {
    fs.writeFile(benchmarkResultFilename, JSON.stringify(benchmarkResult), 'utf-8', function (err) {
      if (err) {
        throw err
      }

      console.log('See results at ' + benchmarkResultFilename)
    })
  }
}

module.exports = benchmarkJSONReporter
