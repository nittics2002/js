/**
*	RepositoryPrimise
*
*	@version 231227
*/

/**
*	constructor
*
*	@param StoragePromise storage
*	@param ClientPrimise client
*/
var RepositoryPrimise = function(_storage, _client) {
	storage = _storage;
	client = _client;

    /**
    *	find
    *
    *	@param string tableName
    *	@param string key
    *	@return Promise(array)
    */
    let find = function(tableName,key) {
        return new Promise(function(resolve, reject){
            const storageKey = buildStorageKey(tableName,key);
            let hasStorage = false;
            
            storage.get(storageKey)
                .then(function(data) {
                    
                    console.log("----storage");

                    hasStorage = true;
                    const parsed = JSON.parse(data);

                    resolve(parsed);
                    
                }).catch(function(e) {
                    return client.find(tableName,key);
                    
                }).then(function(data) {
                    
                    console.log("----client");

                    if (hasStorage) {
                        return;
                    }
                    
                    console.log("----client2");

                    
                    const strValue = JSON.stringify(data);
                    
                    storage.set(storageKey, strValue)
                        .then(function() {
                            resolve(data);
                        }).catch(function(e) {
                            reject(e);
                    });
                    
                }).catch(function(e) {
                    reject(e);
                    
                });
        });	
    }

    /**
    *	buildStorageKey
    *
    *	@param string tableName
    *	@param string tableName
    *	@return string
    */
    let buildStorageKey = function(tableName,key) {
        return tableName + '_' + key;
    };

    return {
        find:find,
    };
};


const settings = {
	//users:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/users.json?id={key}',
	//kobans:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/kobans.json?nendo={key}',
	users:'https://localhost:8000/users.json?id={key}',
	kobans:'https://localhost:8000/kobans.json?nendo={key}',
};

const client = new ClientPrimise(settings);

const storage = new StoragePromise();

const repository = new RepositoryPrimise(storage,client);


// window.localStorage.clear();


repository.find('users','')
	.then(function(req){
		console.log(req);
		
		
		
	}).catch(function(e){
		console.error(e);

	});
		


console.log("END");
	
	


