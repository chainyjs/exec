"use strict";
module.exports.method = function(value, opts, next){
	// Execute the chain's data as the command, and apply the result back to the chain
	require('safeps').spawn(value, opts, function(err, stdout, stderr, code, signal){
		if (err)  return next(err)
		var result = (stdout || '').replace(/^\s+|\s+$/g, '')
		return next(null, result)
	})
}
module.exports.type = 'action'