/**
*	WebStoragePromise
*
*	@version 231227
*/

/**
*	constructor
*
*	@param ?string namespace
*   @param ?bool isPersisted
*/
var WebStoragePromise = (function(namespace, isPersisted) {
    namespace =  namespace == null?
            null:namespace;

    isPersisted =  isPersisted === undefined?
            true:isPersisted;

    /**
    *	get
    *
    *	@param string key
    *   @param ?bool isPersisted
    *	@return Promise(string)
    */
    let get = function(key, isPersisted) {
        return new Promise(function(resolve,reject){	
            isPersisted = isPersisted === undefined?
                isPersisted:isPersisted;

            key = buildKeyName(key);
            
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
    *   @param ?bool isPersisted
    *	@return Promise(void)
    */
    let set = function(key, value, isPersisted) {
        return new Promise(function(resolve,reject){	
            isPersisted = isPersisted === undefined?
                isPersisted:isPersisted;

            key = buildKeyName(key);

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
    *   @param ?bool isPersisted
    *	@return Promise(void)
    */
    let remove = function(key, isPersisted) {
        return new Promise(function(resolve,reject){	
            isPersisted = isPersisted === undefined?
                isPersisted:isPersisted;

            key = buildKeyName(key);

            isPersisted?
                localStorage.removeItem(key):
                sessionStorage.removeItem(key);
            
            resolve();
        });
    };

    /**
    *	clear
    *
    *   @param ?bool isPersisted
    *	@return Promise(void)
    */
    let clear = function(isPersisted) {
        return new Promise(function(resolve,reject){	
            isPersisted = isPersisted === undefined?
                isPersisted:isPersisted;

            if (namespace !== null) {
                const storage = isPersisted?
                    localStorage:sessionStorage;
                
                const re = new RegExp('^' +  namespace + '_');

                let key;

                for (let i = 0; i < storage.length; i++) {
                    key = storage.key(i);
                    
                    if (re.test(key)) {
                        storage.removeItem(key);
                    }
                }

            } else {
                isPersisted?
                    localStorage.clear():
                    sessionStorage.clear();
            }
            
            resolve();
        });
    };

    /**
    *	buildKeyName
    *
    *   @param string key
    *	@return string
    */
    let buildKeyName = function(key) {
        return namespace !== null?
            namespace + '_' + key:
            key;
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

const test1 = (function() {
    console.info("===名前空間なし タイプ指定なし");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new WebStoragePromise();
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---set then");
        return;
    }).then(function() {
        console.info("---get");
        
        return obj.get('abc')
            .then(function(data) {
                console.info("---get then");
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc');
            }).then(function(data) {
                console.info("---get then after remove");
                return obj.get('abc');
            }).catch(function(e) {
                console.info("---error inner");
                console.log(e);
            });
    }).catch(function(e) {
        console.info("---error outer");
        console.error(e);
    });

})();

*/


/*
const test2 = (function() {
    console.info("===名前空間なし タイプ指定=true");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new WebStoragePromise(null,true);
    
    obj.set('abc', "ABC", true)
    .then(function(data) {
        console.info("---set then");
        return;
    }).then(function() {
        console.info("---get");
        
        return obj.get('abc', true)
            .then(function(data) {
                console.info("---get then");
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc',true);
            }).then(function(data) {
                console.info("---get then after remove");
                return obj.get('abc',true);
            }).catch(function(e) {
                console.info("---error inner");
                console.log(e);
            });
    }).catch(function(e) {
        console.info("---error outer");
        console.error(e);
    });

})();

*/


/*

const test3 = (function() {
    console.info("===名前空間なし タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new WebStoragePromise(null,false);
    
    obj.set('abc', "ABC", false)
    .then(function(data) {
        console.info("---set then");
        return;
    }).then(function() {
        console.info("---get");
        
        return obj.get('abc', false)
            .then(function(data) {
                console.info("---get then");
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc',false);
            }).then(function(data) {
                console.info("---get then after remove");
                return obj.get('abc',false);
            }).catch(function(e) {
                console.info("---error inner");
                console.log(e);
            });
    }).catch(function(e) {
        console.info("---error outer");
        console.error(e);
    });

})();

*/

/*

const test4 = (function() {
    console.info("===名前空間あり タイプ指定=なし");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new WebStoragePromise('TABLE');
    
    obj.set('abc', "ABC", false)
    .then(function(data) {
        console.info("---set then");
        return;
    }).then(function() {
        console.info("---get");
        
        return obj.get('abc', false)
            .then(function(data) {
                console.info("---get then");
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc',false);
            }).then(function(data) {
                console.info("---get then after remove");
                return obj.get('abc',false);
            }).catch(function(e) {
                console.info("---error inner");
                console.log(e);
            });
    }).catch(function(e) {
        console.info("---error outer");
        console.error(e);
    });

})();

*/


/*

const test11 = (function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new WebStoragePromise('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---nothing isPersist=false");
        return obj.get('abc');
    }).then(function(data) {
        console.log(data);
    }).catch(function(e) {
        console.error(e);
    });

})();

*/


/*

const test12 = (function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new WebStoragePromise('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---nothing isPersist=true");
        return obj.get('abc', true);
    }).then(function(data) {
        console.error(data);
    }).catch(function(e) {
        console.info("---ok. not match isPersist");
        console.log(e);
    });

})();

*/

/*

const test21 = (function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new WebStoragePromise('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---clear isPersist=false");
        return obj.clear(false);
    }).then(function() {
        console.log(window.sessionStorage.length);
    }).catch(function(e) {
        console.log(e);
    });

})();

*/


/*

const test22 = (function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new WebStoragePromise('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---clear isPersist=none");
        return obj.clear();
    }).then(function() {
        console.log(window.sessionStorage.length);
    }).catch(function(e) {
        console.log(e);
    });

})();

*/


/*

const test23 = (function(resolve, reject) {
    console.info("===名前空間なし タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new WebStoragePromise(null, false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---clear isPersist=none");
        return obj.clear();
    }).then(function() {
        console.log(window.sessionStorage.length);
    }).catch(function(e) {
        console.log(e);
    });

})();

*/

