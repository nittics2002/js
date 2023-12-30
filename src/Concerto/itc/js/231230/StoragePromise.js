/**
*	StoragePromise
*
*	@version 231227
*/

var StoragePromise = (function(_isPersisted = true) {
    /**
    *	@var bool
    */
    const isPersisted = _isPersisted;

    /**
    *	get
    *
    *	@param string key
    *	@return Promise(string)
    */
    let get = function(key) {
        return new Promise(function(resolve,reject){	
            const value = isPersisted?
                localStorage.getItem(key):
                sessionStorage.getItem(key);
            
            if (value === null) {
                reject('not found. key=' + key);
            } else {
                resolve(lzbase62.decompress(value));
            }
        });
    };

    /**
    *	set
    *
    *	@param string key
    *	@param string value
    *	@return Promise(void)
    */
    let set = function(key, value) {
        return new Promise(function(resolve,reject){	
            const compressed = lzbase62.compress(value)

            isPersisted?
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
    let remove = function(key) {
        return new Promise(function(resolve,reject){	
            isPersisted?
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
    let clear = function() {
        return new Promise(function(resolve,reject){	
            isPersisted?
                localStorage.clear():
                sessionStorage.clear();
            
            resolve();
        });
    };

    return {
        get:get,
        set:set,
        remove:remove,
        clear:clear,
    };
});

////////////////////////////////////////////////////////////////////////////////

/*

window.localStorage.clear();

const obj = new StoragePromise();


obj.get('abc')
    .then(function(data) {
        console.info("---get then");
    }).catch(function(e) {
        console.info("---get catch");
    });
obj.set('abc', "ABCDEFG")
    .then(function(data) {
        console.info("---set then");
    }).catch(function(e) {
        console.info("---set catch");
    });

obj.set('opq', "OPQRST")
    .then(function(data) {
        console.info("---set then");
    }).catch(function(e) {
        console.info("---set catch");
    });

obj.get('abc')
    .then(function(data) {
        console.info("---get then");
        console.log(data);
    }).catch(function(e) {
        console.info("---get catch");
    });

obj.get('opq')
    .then(function(data) {
        console.info("---get then");
        console.log(data);
    }).catch(function(e) {
        console.info("---get catch");
    });


obj.remove('abc')
    .then(function(data) {
        return obj.get('abc', "ABCDEFG")
    }).then(function(data) {
        console.info("---get then");
        console.log(data);
    }).catch(function(e) {
        console.info("---get catch");
    });

obj.get('opq', "OPQRST")
    .then(function(data) {
        console.info("---get then");
        console.log(data);
    }).catch(function(e) {
        console.info("---get catch");
    });


console.log("END");


*/

