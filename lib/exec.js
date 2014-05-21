module.exports = function(opts, next){
	var chain = this;

	// Execute the chain's data as the command, and apply the result back to the chain
	require('safeps').spawn(this.data, opts, function(err, result){
		if (err)  return next(err)
		chain.data = result
		return next()
	})
}