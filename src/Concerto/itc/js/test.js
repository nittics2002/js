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

    this.getOrCreateTableList();
};

/**
*	getOrCreateTableList
*
*	@param string key
*	@return Promise(void)
*/
StorageManagerPrimise.prototype.getOrCreateTableList = function(key) {
	const that = this;

	return new Promise(function(resolve,reject){	

        that.get(that.tableListName)
            .then(function(data)) {
                that.tableList = JSON.parse(data);
                resolve();
            }).catch(function(e)) {
                const strData = JSON.stringify({});
                
                this.set(that.tableListName, strData)
                    then(function(data)) {
                        resolve();
                    }).catch(function(e)) {
                        reject('error getOrCreateTableList');
                    });
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
                then(function(data)) {
                    reject('timeout. key=' + key);
                }).catch(function(e)) {
                    reject(e);
                });
        } else {
            that.storage.get(key)
                then(function(data)) {
                    resolve(data);
                }).catch(function(e)) {
                    reject(e);
                });
        }
	});	
}






/*
const settings = {
	users:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/users.json?id={key}',
	kobans:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/kobans.json?nendo={key}',
};

const client = new StorageManagerPrimise(settings);

client.find('users','')
	.then(function(req){
		console.log(req);
		
		
		
	}).catch(function(e){
		console.error(e);

	});
		


console.log("END");
	
*/



