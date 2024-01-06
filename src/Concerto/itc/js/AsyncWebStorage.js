/**
*	AsyncWebStorage
*
*	@version 231227
*/

/**
*	constructor
*
*	@param ?string namespace
*   @param ?bool isPersisted
*   @param ?object compresser
*/
var AsyncWebStorage = (function(namespace, isPersisted, compresser) {
    /**
    *	@var ?string
    */
    const _namespace =  namespace == null?
            null:namespace;

    /**
    *	@var bool
    */
    const _isPersisted =  isPersisted === undefined?
            true:isPersisted;

    /**
    *	@var object
    */
    const _compresser =  compresser === undefined?
            lzbase62:_compresser;

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
                _isPersisted:isPersisted;

            const keyName = buildKeyName(key);
            
            const value = isPersisted?
                localStorage.getItem(keyName):
                sessionStorage.getItem(keyName);
            
            if (value === null) {
                reject('not found. key=' + keyName);
            } else {
                resolve(_compresser.decompress(value));
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
                _isPersisted:isPersisted;

            const keyName = buildKeyName(key);

            const compressed = _compresser.compress(value)

            isPersisted?
                localStorage.setItem(keyName, compressed):
                sessionStorage.setItem(keyName, compressed);
            
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
                _isPersisted:isPersisted;

            const keyName = buildKeyName(key);

            isPersisted?
                localStorage.removeItem(keyName):
                sessionStorage.removeItem(keyName);
            
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
                _isPersisted:isPersisted;

            if (_namespace !== null) {
                const storage = isPersisted?
                    localStorage:sessionStorage;
                
                const re = new RegExp('^' +  _namespace + '_');

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
        return _namespace !== null?
            _namespace + '_' + key:
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

const test1 = (new Promise(function(resolve, reject) {
    console.info("===名前空間なし タイプ指定なし 個別なし");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage();
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---set then");
        return;
    }).then(function() {
        console.info("---get");
        
        return obj.get('abc')
            .then(function(data) {
                console.info("---get then");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc');
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
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

*/


/*
const test2 = (new Promise(function(resolve, reject) {
    console.info("===名前空間なし タイプ指定=true 個別=true");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage(null,true);
    
    obj.set('abc', "ABC", true)
    .then(function(data) {
        console.info("---set then");
        return;
    }).then(function() {
        console.info("---get");
        
        return obj.get('abc', true)
            .then(function(data) {
                console.info("---get then");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc',true);
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
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

*/


/*

const test3 = (new Promise(function(resolve, reject) {
    console.info("===名前空間なし タイプ指定=false 個別=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage(null,false);
    
    obj.set('abc', "ABC", false)
    .then(function(data) {
        console.info("---set then");
        return;
    }).then(function() {
        console.info("---get");
        
        return obj.get('abc', false)
            .then(function(data) {
                console.info("---get then");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc',false);
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
                return obj.get('abc',false);
            }).catch(function(e) {
                console.info("---error inner");
                console.log(e);
            });
    }).catch(function(e) {
        console.info("---error outer");
        console.error(e);
    });

}));

*/

/*

const test4 = (new Promise(function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=なし 個別=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage('TABLE');
    
    obj.set('abc', "ABC", false)
    .then(function(data) {
        console.info("---set then");
        return;
    }).then(function() {
        console.info("---get");
        
        return obj.get('abc', false)
            .then(function(data) {
                console.info("---get then");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc',false);
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
                return obj.get('abc',false);
            }).catch(function(e) {
                console.info("---error inner");
                console.log(e);
            });
    }).catch(function(e) {
        console.info("---error outer");
        console.error(e);
    });

}));

*/

/*

const test5 = (new Promise(function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=なし 個別=なし");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage('TABLE');
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---set then");
        return;
    }).then(function() {
        console.info("---get");
        
        return obj.get('abc')
            .then(function(data) {
                console.info("---get then");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc');
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sessionStorage.getItem('abc');
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

*/

/*

const test11 = (new Promise(function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---nothing isPersist=false");
        window.localStorage.getItem('abc');
        window.sessionStorage.getItem('abc');
        return obj.get('abc');
    }).then(function(data) {
        console.log(data);
    }).catch(function(e) {
        console.error(e);
    });

}));

*/


/*

const test12 = (new Promise(function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---nothing isPersist=true");
        window.localStorage.getItem('abc');
        window.sessionStorage.getItem('abc');
        return obj.get('abc', true);
    }).then(function(data) {
        console.error(data);
    }).catch(function(e) {
        console.info("---ok. not match isPersist");
        console.log(e);
    });

}));

*/

/*

const test21 = (new Promise(function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---clear isPersist=false");
        return obj.clear(false);
    }).then(function() {
        console.log(window.sessionStorage.length);
    }).catch(function(e) {
        console.log(e);
    });

}));

*/


/*

const test22 = (new Promise(function(resolve, reject) {
    console.info("===名前空間あり タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---clear isPersist=none");
        return obj.clear();
    }).then(function() {
        console.log(window.sessionStorage.length);
    }).catch(function(e) {
        console.log(e);
    });

}));

*/


/*

const test23 = (new Promise(function(resolve, reject) {
    console.info("===名前空間なし タイプ指定=false");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('DUMMY','LOCAL');
    window.sessionStorage.setItem('DUMMY','SESSION');

    const obj = new AsyncWebStorage(null, false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---clear isPersist=none");
        return obj.clear();
    }).then(function() {
        console.log(window.sessionStorage.length);
    }).catch(function(e) {
        console.log(e);
    });

}));

*/

