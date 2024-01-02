/**
*	StorageManagerPrimise
*
*	@version 231227
*/
var StorageManagerPrimise = (function(_settings, _storage) {
	storage = _storage === undefined?
		new StoragePromise():_storage;
		
	settings = _settings;

    tableListName = settings.tableListName === undefined?
        'tableList':settings.tableListName;

    expiry = settings.expiry === undefined?
        30:settings.expiry;

    tableList = {};

    initTableList();

    /**
    *	initTableList
    *
    *	@return Promise(void)
    */
    let initTableList = function() {
        return new Promise(function(resolve,reject){	
            storage.get(tableListName)
                .then(function(data) {
                    tableList = JSON.parse(data);

                    if (isExpired(tableListName)) {
                        storage.clear()
                            .then(function() {
                                return createTableList();
                            }).then(function() {
                                resolve();
                            }).catch(function(e){
                                reject(e);
                            });

                    } else {
                        resolve();
                    }
                }).catch(function(e){
                    createTableList()
                        .then(function() {
                            resolve();
                        }).catch(function(e){
                            reject(e);
                        });
                });
        });
    };

    /**
    *	createTableList
    *
    *	@return Promise(void)
    */
    let createTableList = function() {
        return new Promise(function(resolve,reject){	
            let tableList = {};
            tableList[tableListName] = {};
            tableList[tableListName]['create_at'] = new Date().toISOString();
            
            const strData = JSON.stringify(tableList);
            
            storage.set(tableListName, strData)
                .then(function(data) {
                    resolve();
                }).catch(function(e){
                    reject('error createTableList');
                });
        });
    };

    /**
    *	isExpired
    *
    *	@param string key
    *	@return bool
    */
    let isExpired = function(key) {
        const createAt = tableList[key] === undefined ||
            tableList[key]['create_at'] === undefined?
                new Date('1970-01-01'):
                new Date(tableList[key]['create_at']);

        return (new Date()) - createAt > expiry * 60 * 24 * 1000;
    };

    /**
    *	get
    *
    *	@param string key
    *	@return Promise(string)
    */
    let get = function(key) {
        return new Promise(function(resolve, reject){
            if (that.isExpired(key)) {
                storage.remove(key)
                    .then(function(data) {
                        delete tableList[key];
                        return storage.set(tableListName, tableList);
                    }).then(function() {
                        reject('timeout. key=' + key);
                    }).catch(function(e){
                        reject(e);
                    });
            } else {
                storage.get(key)
                    .then(function(data) {
                        resolve(data);
                    }).catch(function(e){
                        reject(e);
                    });
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
    StorageManagerPrimise.prototype.set = function(key, value) {
        return new Promise(function(resolve,reject){	
            storage.set(key, value)
                .then(function() {
                    resolve();
                }).catch(function(e) {
                    reject(e);
                });
        });	
    };

    /**
    *	remove
    *
    *	@param string key
    *	@return Promise(void)
    */
    let remove = function(key) {
        return new Promise(function(resolve,reject){	
            storage.remove(key)
                .then(function() {
                    resolve();
                }).catch(function(e) {
                    reject(e);
                });
        });	
    }


    /**
    *	clear
    *
    *	@return Promise(void)
    */
    let clear = function() {
        return new Promise(function(resolve,reject){	
            storage.clear()
                .then(function() {
                    resolve();
                }).catch(function(e) {
                    reject(e);
                });
        });	
    };

    return {
        get:get,
        set:set,
        remove:remove,
        clear:clear,
    };
};


const settings = {
    tableList:'table_list',
    expiry:1,
};

const client = new StorageManagerPrimise(settings);




console.log("END");



