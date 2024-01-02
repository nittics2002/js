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
*	@param ?object client settings
*       {expiry(sec)}
*/
var RepositoryPrimise = function(_storage, _client, _settings) {
	const storage = _storage;
	const client = _client;

    const settings = _settings === undefined?
        {}:_settings;

    const expiry = settings.expiry === undefined?
        30 * 60 * 1000:settings.expiry * 1000;

    const dataset = {};

    /**
    *	find
    *
    *	@param string tableName
    *	@param ?object params
    *	@return Promise(array)
    */
    let find = function(tableName,params) {
        const storageKey = buildStorageKey(tableName, params);

        return new Promise(function(resolve, reject){
            if (dataset[storageKey] !== undefined) {
                resolve(dataset[storageKey]);
                return;
            }
            
            readStorage(storageKey)
                .then(function(data) {
                    resolve(data);
                    
                }).catch(function(e) {
                    fetch(tableName,params)
                        .then(function(data) {
                            resolve(data);
                        }).catch(function(e) {
                            throw e;
                        });

                });
        });
    };

    /**
    *	buildStorageKey
    *
    *	@param string tableName
    *	@param object params
    *	@return string
    */
    let buildStorageKey = function(tableName, params) {
        params = params === undefined?
            {}:params;

        return tableName + '_' +
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
        const storageKey = buildStorageKey(tableName,params);
        
        return client.find(tableName, params)
            .then(function(data) {
                dataset[storageKey] = data;
                
                storage.set(storageKey, JSON.stringify({
                    create_at:new Date().toISOString(),
                    'data':data,
                }));
                
                return data;
            }).then(function(data) {
                return data;
            }).catch(function(e) {
                throw e;
            });
    };

    /**
    *	readStorage
    *
    *	@param string storageKey
    *	@return object
    */
    let readStorage = function(storageKey) {
        return storage.get(storageKey)
            .then(function(dataStr) {
                const parsedData = JSON.parse(dataStr);

                if (parsedData.create_at === undefined ||
                    isExpired(parsedData.create_at)
                ) {
                    throw 'is expired';
                } else {
                    return parsedData.data;
                }
            }).catch(function(e) {
                throw e;
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
        const now = new Date();

        return now.getTime() >
            createAt.getTime() + expiry;
    };

    /**
    *	remove
    *
    *	@param string tableName
    *	@param object params
    *	@return Primise
    */
    let remove = function(tableName, params) {
        const storageKey = buildStorageKey(tableName,params);

        delete dataset[storageKey];
        
        return storage.remove(storageKey);
    };

    return {
        find:find,
        remove:remove,
        //以下テスト用
            dataset:dataset,
            isExpired:isExpired,
            fetch:fetch,
            readStorage:readStorage,
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

/*

const isExpiredTest = (function() {
    const repository = new RepositoryPrimise(storage,client,{
        expiry:60,
    });

    console.log(repository.isExpired(new Date()));

    console.log(repository.isExpired('2001-1-1 00:00:00'));

    const dt = new Date();
    const dt2 = dt.getTime() - 61 * 1000;
    const dt3 = dt.getTime() - 59 * 1000;


    console.log(dt);
    console.log(new Date(dt2));
    console.log(new Date(dt3));

    console.log(repository.isExpired(dt2));
    console.log(repository.isExpired(dt3));


})();

*/

/*

const fetchTest1 = (function() {
    window.localStorage.clear();

    const repository = new RepositoryPrimise(storage,client,{
        expiry:60 * 60,
    });

    repository.fetch('users')
        .then(function(data) {
            console.log(data);
            console.info('---localStorage');
            console.log(window.localStorage.getItem('users'));
            console.log(repository.dataset);
            return repository.fetch('users');;
        }).then(function(data) {
            console.info('---dataset');
            console.log(data);
        }).catch(function(e) {
            console.error(e);
        });
})();

*/

/*

const fetchTest2= (function() {
    window.localStorage.clear();

    const repository = new RepositoryPrimise(storage,client,{
        expiry:60 * 60,
    });

    repository.fetch('kobans',{yyyymm:'202307',nendo:'2023K',})
        .then(function(data) {
            console.log(data);
            console.info('---localStorage');
            console.log(window.localStorage.getItem('kobans_2023K_202307'));
            console.log(repository.dataset);
            return repository.fetch('users');;
        }).then(function(data) {
            console.info('---dataset');
            console.log(data);
        }).catch(function(e) {
            console.error(e);
        });
})();

*/

/*

const readStorageTest1 = (function() {
    window.localStorage.clear();

    const repository = new RepositoryPrimise(storage,client,{
        expiry:60 * 60,
    });

    repository.readStorage('users')
        .then(function(data) {
            console.error(data);
        }).catch(function(e) {
            console.info('nothing data OK');
            console.log(e);
        });
})();

*/

/*

const readStorageTest2 = (function() {
    window.localStorage.clear();

    const repository = new RepositoryPrimise(storage,client,{
        expiry:60 * 60,
    });

    repository.fetch('users')
        .then(function(data) {
            const dt = {
                'data':data
            };

            storage.set('users_', JSON.stringify(dt));
            
            repository.readStorage('users')
                .then(function(data) {
                    console.error(data);
                }).catch(function(e) {
                    console.info('nothing create_at OK');
                    console.log(e);
                });
        }).catch(function(e) {
            console.error(e);
        });
})();

*/

/*

const readStorageTest3 = (function() {
    window.localStorage.clear();

    const repository = new RepositoryPrimise(storage,client,{
        expiry:60 * 60,
    });

    repository.fetch('users')
        .then(function(data) {
            const dt = {
                create_at:new Date('2001-1-1'),
                'data':data
            };

            storage.set('users_', JSON.stringify(dt));
            
            repository.readStorage('users')
                .then(function(data) {
                    console.error(data);
                }).catch(function(e) {
                    console.info('create_at is expired ');
                    console.log(e);
                });
        }).catch(function(e) {
            console.error(e);
        });
})();

*/

/*

const readStorageTest4 = (function() {
    window.localStorage.clear();

    const repository = new RepositoryPrimise(storage,client,{
        expiry:60 * 60,
    });

    repository.fetch('users')
        .then(function(data) {
            const dt = {
                create_at:new Date(),
                'data':data
            };

            storage.set('users_', JSON.stringify(dt));
            
            repository.readStorage('users')
                .then(function(data) {
                    console.log(data);
                }).catch(function(e) {
                    console.error(e);
                });
        }).catch(function(e) {
            console.error(e);
        });
})();

*/

/*

const findTest1 = (function() {
    window.localStorage.clear();

    const repository = new RepositoryPrimise(storage,client,{
        expiry:60 * 60,
    });

    repository.find('users')
        .then(function(data) {
            console.log(data);
            return repository.find('users');
        }).then(function(data) {
            console.log(data);
        }).catch(function(data) {
            console.error(e);
        });
})();

*/

/*

const findTest2 = (function() {
    window.localStorage.clear();

    const repository = new RepositoryPrimise(storage,client,{
        expiry:60 * 60,
    });

    repository.fetch('users')
        .then(function(data) {
            const dt = {
                create_at:new Date(),
                'data':data
            };

            storage.set('users_', JSON.stringify(dt));
            
            repository.find('users')
                .then(function(data) {
                    console.log(data);
                }).catch(function(e) {
                    console.error(e);
                });
        }).catch(function(e) {
            console.error(e);
        });
})();

*/

/*

const removeTest1 = (function() {
    window.localStorage.clear();
    
    window.localStorage.setItem('users_','DUMMY');
    
    const repository = new RepositoryPrimise(storage,client,{
        expiry:60 * 60,
    });

    repository.remove('users')
        .then(function() {
            console.log(repository.dataset);
            console.log(window.localStorage.getItem('users_'));
        }).catch(function(e) {
            console.error(e);
        });
})();

*/

