/**
*	WebStoragePromise
*
*	@version 231227
*/

/**
*	constructor
*
*	@param bool isPersisted
*		true:localStorage false:sessionStorage
*/
var WebStoragePromise = function(isPersisted = true) {
	this.isPersisted = isPersisted;
	
};

/**
*	get
*
*	@param string key
*	@return Promise(string)
*/
WebStoragePromise.protostorageType.get = function(key, isPersisted) {
	const that = this;

	return new Promise(function(resolve,reject){	
        const storageType = isPersisted === undefined ?
            that.isPersisted:isPersisted;

        const value = storageType?
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
WebStoragePromise.protostorageType.set = function(key, value, isPersisted) {
	const that = this;

	return new Promise(function(resolve,reject){	
        const storageType = isPersisted === undefined ?
            that.isPersisted:isPersisted;

		const compressed = lzbase62.compress(value)

		storageType?
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
WebStoragePromise.protostorageType.remove = function(key, isPersisted) {
	const that = this;

	return new Promise(function(resolve,reject){	
        const storageType = isPersisted === undefined ?
            that.isPersisted:isPersisted;
		
		storageType?
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
WebStoragePromise.protostorageType.clear = function(isPersisted) {
	const that = this;

	return new Promise(function(resolve,reject){	
        const storageType = isPersisted === undefined ?
            that.isPersisted:isPersisted;

		storageType?
			localStorage.clear():
			sessionStorage.clear();
		
		resolve();
	});
};
