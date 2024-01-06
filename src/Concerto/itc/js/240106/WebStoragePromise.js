/**
*	WebStoragePromise
*
*	@version 231227
*/

/**
*	constructor
*
*	@param ?string _namespace
*   @param ?bool _isPersisted
*/
var WebStoragePromise = (function(_namespace, _isPersisted) {
    /**
    *	@var ?string
    */
    const namespace =  _namespace == null?
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
                
                const re = new RegExp('^' +  namespace + '_');

                let key;

                for (let i = 0; i < storage.length; i++) {
                    key = storage.key(i);
                    
                    if (re.test(key)) {
                        storage.removeItem(key);
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

/*

const test1 = (new Promise(function(resolve, reject) {
    console.info("===名前空間なし タイプ指定なし 個別なし");

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
                window.localStorage.getItem('abc');
                window.sesstionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc');
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sesstionStorage.getItem('abc');
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
                window.localStorage.getItem('abc');
                window.sesstionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc',true);
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sesstionStorage.getItem('abc');
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
                window.localStorage.getItem('abc');
                window.sesstionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc',false);
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sesstionStorage.getItem('abc');
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
                window.localStorage.getItem('abc');
                window.sesstionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc',false);
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sesstionStorage.getItem('abc');
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

    const obj = new WebStoragePromise('TABLE');
    
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
                window.sesstionStorage.getItem('abc');
                console.log(data);
                return;
            }).then(function() {
                return obj.remove('abc');
            }).then(function(data) {
                console.info("---get then after remove");
                window.localStorage.getItem('abc');
                window.sesstionStorage.getItem('abc');
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

    const obj = new WebStoragePromise('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---nothing isPersist=false");
        window.localStorage.getItem('abc');
        window.sesstionStorage.getItem('abc');
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

    const obj = new WebStoragePromise('TABLE', false);
    
    obj.set('abc', "ABC")
    .then(function(data) {
        console.info("---nothing isPersist=true");
        window.localStorage.getItem('abc');
        window.sesstionStorage.getItem('abc');
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

}));

*/


/*

const test22 = (new Promise(function(resolve, reject) {
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

}));

*/


/*

const test23 = (new Promise(function(resolve, reject) {
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

}));

*/

