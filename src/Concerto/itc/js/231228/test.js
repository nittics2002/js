/**
*	StorageManagerPrimise
*
*	@version 231227
*/

/**
*	constructor
*
*	@param object settings
*       {tableListName,expiry(min)}
*	@param StoragePrimise storage
*/
var StorageManagerPrimise = function(settings, storage) {
	this.storage = storage === undefined?
		new StoragePromise():storage;
		
	this.settings = settings;

    this.tableListName = this.settings.tableListName === undefined?
        'tableList':this.settings.tableListName;

    this.expiry = this.settings.expiry === undefined?
        30:this.settings.expiry;

    this.tableList = {};

    this.initTableList();
};

/**
*	initTableList
*
*	@return Promise(void)
*/
StorageManagerPrimise.prototype.initTableList = function() {
	const that = this;

	return new Promise(function(resolve,reject){	

        that.storage.get(that.tableListName)
            .then(function(data) {
                that.tableList = JSON.parse(data);

                if (that.isExpired(that.tableListName)) {
                    that.storage.clear()
                        .then(function() {
                            return that.createTableList();
                        }).then(function() {
                            resolve();
                        }).catch(function(e){
                            reject(e);
                        });

                } else {
                    resolve();
                }
            }).catch(function(e){
                that.createTableList()
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
StorageManagerPrimise.prototype.createTableList = function() {
	const that = this;

	return new Promise(function(resolve,reject){	
        let tableList = {};
        tableList[that.tableListName] = {};
        tableList[that.tableListName]['create_at'] = new Date().toISOString();
        
        const strData = JSON.stringify(tableList);
        
        that.storage.set(that.tableListName, strData)
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
StorageManagerPrimise.prototype.isExpired = function(key) {
    const createAt = this.tableList[key] === undefined ||
        this.tableList[key]['create_at'] === undefined?
            new Date('1970-01-01'):
            new Date(this.tableList[key]['create_at']);

    return (new Date()) - createAt > this.expiry * 60 * 24 * 1000;
};

/**
*	get
*
*	@param string key
*	@return Promise(string)
*/
StorageManagerPrimise.prototype.get = function(key) {
	const that = this;
	
	return new Promise(function(resolve, reject){
        if (that.isExpired(key)) {
            that.storage.remove(key)
                .then(function(data) {
                    delete that.tableList[key];
                    return that.storage.set(that.tableListName, that.tableList);
                }).then(function() {
                    reject('timeout. key=' + key);
                }).catch(function(e){
                    reject(e);
                });
        } else {
            that.storage.get(key)
                .then(function(data) {
                    resolve(data);
                }).catch(function(e){
                    reject(e);
                });
        }
	});	
}

/**
*	set
*
*	@param string key
*	@param string value
*	@return Promise(void)
*/
StorageManagerPrimise.prototype.set = function(key, value) {
	const that = this;

	return new Promise(function(resolve,reject){	
        that.storage.set(key, value)
            .then(function() {
                resolve();
            }).catch(function(e) {
                reject(e);
            });
	});	
}

/**
*	remove
*
*	@param string key
*	@return Promise(void)
*/
StorageManagerPrimise.prototype.remove = function(key) {
	const that = this;

	return new Promise(function(resolve,reject){	
        that.storage.remove(key)
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
StorageManagerPrimise.prototype.clear = function() {
	const that = this;

	return new Promise(function(resolve,reject){	
        that.storage.clear()
            .then(function() {
                resolve();
            }).catch(function(e) {
                reject(e);
            });
	});	
}


const settings = {
    tableList:'table_list',
    expiry:1,
};

const client = new StorageManagerPrimise(settings);




console.log("END");



