/**
*	WevStoragePromise
*
*	@version 231227
*/

/**
*	constructor
*
*	@param ?string _namespace
*   @param ?bool _isPersisted
*/
var WevStoragePromise = (function(_namespace, _isPersisted) {
    /**
    *	@var ?string
    */
    const namespace =  _namespace === undefined?
            null:_namespace;

    /**
    *	@var bool
    */
    const isPersisted =  _isPersisted === undefined?
            true:_isPersisted;

    /**
    *	get
    *
    *	@param string key
    *   @param ?bool _isPersisted
    *	@return Promise(string)
    */
    let get = function(_key, _isPersisted) {
        return new Promise(function(resolve,reject){	
            _isPersisted = _isPersisted === undefined?
                isPersisted:_isPersisted;

            const key = buildKeyName(_key);
            
            const value = _isPersisted?
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
    *   @param ?bool _isPersisted
    *	@return Promise(void)
    */
    let set = function(_key, _value, _isPersisted) {
        return new Promise(function(resolve,reject){	
            _isPersisted = _isPersisted === undefined?
                isPersisted:_isPersisted;

            const key = buildKeyName(_key);

            const compressed = lzbase62.compress(_value)

            _isPersisted?
                localStorage.setItem(key, compressed):
                sessionStorage.setItem(key, compressed);
            
            resolve();
        });
    } ;

    /**
    *	remove
    *
    *	@param string key
    *   @param ?bool _isPersisted
    *	@return Promise(void)
    */
    let remove = function(_key, _isPersisted) {
        return new Promise(function(resolve,reject){	
            _isPersisted = _isPersisted === undefined?
                isPersisted:_isPersisted;

            const key = buildKeyName(_key);

            _isPersisted?
                localStorage.removeItem(key):
                sessionStorage.removeItem(key);
            
            resolve();
        });
    };

    /**
    *	clear
    *
    *   @param ?bool _isPersisted
    *	@return Promise(void)
    */
    let clear = function(_isPersisted) {
        return new Promise(function(resolve,reject){	
            _isPersisted = _isPersisted === undefined?
                isPersisted:_isPersisted;

            if (namespace !== null) {
                const storage = _isPersisted?
                    localStorage:sessionStorage;

                const re = new Regexp('/^' +  namespace + '_');

                let key;

                for (let i = 0; i < storage.length; i++) {
                    key = storage.key(i);
                    
                    if (re.test(key)) {
                        storage.remove(key);
                    }
                }

            } else {
                _isPersisted?
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
    let buildKeyName = function(_key) {
        return namespace !== null?
            namespace + '_' + _key:
            _key;
    };

    return {
        get:get,
        set:set,
        remove:remove,
        clear:clear,
    };
});

////////////////////////////////////////////////////////////////////////////////

const test1 = (new Promise(function(resolve, reject) {
    console.info("===名前空間なし タイプ指定なし");

    window.localStorage.clear();
    const obj = new WevStoragePromise();
    
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

}));


const test2 = (new Promise(function(resolve, reject) {
    console.info("===名前空間なし タイプ指定=true");

    window.localStorage.clear();
    const obj = new WevStoragePromise(true);
    
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

}));


for (fn in [test1, test2]) {
    fn
    .then(function() {
    }).catch(function(e) {
        console.info("---error main");
        console.error(e);
    });
}

console.log('END');
        










/*



obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---set then");
    }).catch(function(e) {
        console.info("---set catch");
        console.error(e);
    });

obj.set('def', "DEF", true)
    .then(function(data) {
        console.info("---set then");
    }).catch(function(e) {
        console.info("---set catch");
        console.error(e);
    });

obj.set('ghi', "GHI", false)
    .then(function(data) {
        console.info("---set then");
    }).catch(function(e) {
        console.info("---set catch");
        console.error(e);
    });

*/

/*

obj.get('abc')
    .then(function(data) {
        console.info("---get then");
        console.log(data);
    }).catch(function(e) {
        console.info("---get catch");
        console.error(e);
    });

obj.get('def', true)
    .then(function(data) {
        console.info("---get then");
        console.log(data);
    }).catch(function(e) {
        console.info("---get catch");
        console.error(e);
    });

obj.get('ghi',false)
    .then(function(data) {
        console.info("---get then");
        console.log(data);
    }).catch(function(e) {
        console.info("---get catch");
        console.error(e);
    });

*/


/*



obj.remove('abc')
    .then(function(data) {
        return obj.get('abc', "ABCDEFG")
    }).then(function(data) {
        console.info("---get then");
        console.log(data);
    }).catch(function(e) {
        console.info("---get catch");
        console.error(e);
    });

obj.get('opq', "OPQRST")
    .then(function(data) {
        console.info("---get then");
        console.log(data);
    }).catch(function(e) {
        console.info("---get catch");
        console.error(e);
    });


console.log("END");


*/

