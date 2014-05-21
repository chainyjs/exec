(function(){
	// Import
	var expect = require('chai').expect,
		joe = require('joe')

	// Test
	joe.describe('exec plugin', function(describe,it){
		var Chainy = require('chainy-core').subclass().require('set').addExtension('exec', require('../'))

		it("should work without options", function(next){
			if ( process.env.TRAVIS ) {
				console.log('skipping for travis environment')
				return next()
			}

			Chainy.create()
				.set('echo -n hello world')
				.exec()
				.done(function(err, result){
					if (err)  return next(err)
					expect(result).to.equal('hello world')
					return next()
				})
		})

		it("should work with options", function(next){
			if ( process.env.TRAVIS ) {
				console.log('skipping for travis environment')
				return next()
			}

			Chainy.create()
				.set('cat package.json')
				.exec({cwd: __dirname+'/..'})
				.done(function(err, execResult){
					if (err)  return next(err)
					require('fs').readFile(__dirname+'/../package.json', function(err, fsResult){
						if (err)  return next(err)
						expect(execResult.toString()).to.equal(fsResult.toString())
						return next()
					})
				})
		})
	})
})()
