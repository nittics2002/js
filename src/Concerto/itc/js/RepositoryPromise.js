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
	const storage = _storage;
	const client = _client;

    /**
    *	find
    *
    *	@param string tableName
    *	@param ?object params
    *	@return Promise(array)
    */
    let find = function(tableName,params) {
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
    *	@param object params
    *	@return string
    */
    let buildStorageKey = function(tableName, params) {
        return tableName +
            Object.keys(params).sort().map(function(key,index,ar) {
                return params[key];
            }).join('_');
    };

    /**
    *	fetch
    *
    *	@param string tableName
    *	@param object params
    *	@return object
    */
    let fetch = function(tableName, params) {
        return client.fetch(tableName, params)
            .then(function(data) {
                const storageKey = buildStorageKey(tableName, params);
                
                storage.set(storageKey, JSON.Stringify({
                    create_at:new Date().toISOString(),
                    'data':data,
                });
                
                return data;
            }).then(function(data) {
                return data;
            }).catch(function(e) {
                return e;
            });
    };

    /**
    *	fromStorage
    *
    *	@param string tableName
    *	@param object params
    *	@return object
    */
    let fromStorage = function(tableName, params) {
        const storageKey = buildStorageKey(tableName,key);
        
        return storage.get(storageKey)
            .then(function(dataStr) {
                const dataset = JSON.parse(dataStr);

                if (dataset.create_at !== undefined ||
                    isExpired(dataset.create_at)
                ) {
                    return fetch(tableName, params);
                } else {
                    return dataset.data;
                }
            }).catch(function(e) {
                return e;
            });
    };

    /**
    *	isExpired
    *
    *	@param string dateString
    *	@return bool
    */
    let isExpired = function(dateString) {
        const createAt = new Date(dateString);

        return new Date() >
            createAt.setSeconds(createAt.getSeconds() + expiry;
    };

    /**
    *	remove
    *
    *	@param string tableName
    *	@param object params
    *	@return Primise
    */
    let remove = function(tableName, params) {
        const storageKey = buildStorageKey(tableName,key);
        return storage.remove(storageKey);
    };

    return {
        find:find,
        remove:remove,
    };
};


const settings = {
	//users:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/users.json?id={key}',
	//kobans:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/kobans.json?nendo={key}',
	users:'https://localhost:8000/users.json',
	kobans:'https://localhost:8000/kobans.json',
};

const client = new ClientPrimise(settings);

const storage = new WebStoragePromise();

const repository = new RepositoryPrimise(storage,client);


// window.localStorage.clear();


repository.find('users')
	.then(function(req){
		console.log(req);
		
		
		
	}).catch(function(e){
		console.error(e);

	});
		


console.log("END");
	
	


