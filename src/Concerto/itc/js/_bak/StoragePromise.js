/**
*	StoragePromise
*
*	@version 231227
*/

/**
*	constructor
*
*	@param bool isPersisted
*		true:localStorage false:sessionStorage
*/
var StoragePromise = function(isPersisted = true) {
	this.isPersisted = isPersisted;
	
};

/**
*	get
*
*	@param string key
*	@return Promise(string)
*/
StoragePromise.prototype.get = function(key) {
	const that = this;

	return new Promise(function(resolve,reject){	
		const value = that.isPersisted?
			localStorage.getItem(key):
			sessionStorage.getItem(key);
		
		if (value === null) {
			reject('not found. key=' + key);
		} else {
			resolve(lzbase62.decompress(value));
		}
	});
} ;

/**
*	set
*
*	@param string key
*	@param string value
*	@return Promise(void)
*/
StoragePromise.prototype.set = function(key, value) {
	const that = this;

	return new Promise(function(resolve,reject){	
		const compressed = lzbase62.compress(value)

		that.isPersisted?
			localStorage.setItem(key, compressed):
			sessionStorage.setItem(key, compressed);
		
		resolve();
	});
} ;

/**
*	remove
*
*	@param string key
*	@return Promise(void)
*/
StoragePromise.prototype.remove = function(key) {
	const that = this;

	return new Promise(function(resolve,reject){	
		
		that.isPersisted?
			localStorage.removeItem(key):
			sessionStorage.removeItem(key);
		
		resolve();
	});
};

/**
*	clear
*
*	@return Promise(void)
*/
StoragePromise.prototype.clear = function() {
	const that = this;

	return new Promise(function(resolve,reject){	
		
		that.isPersisted?
			localStorage.clear():
			sessionStorage.clear();
		
		resolve();
	});
};
