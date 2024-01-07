/**
*	AsyncRepository
*
*	@version 231227
*/

/**
*	constructor
*
*	@param StoragePromise storage
*	@param ClientPrimise client
*	@param ?object settings
*       {
*           expiry:[int time msec],
*           tables:{
*               [table name]:{
*                   expiry:[int time msec],
*                   persisted:[bool localStorage=true]
*           }
*       }
*/
var AsyncRepository = function(storage, client, settings) {
	const _storage = storage;
	const _client = client;

    const _settings = settings === undefined?
        {}:settings;

    const _expiry = _settings.expiry === undefined?
        30 * 60 * 1000:_settings.expiry;

    const _tables = _settings.tables === undefined?
        {}:_settings.tables;

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
            readStorage(tableName, storageKey)
                .then(function(data) {
                    resolve(data);
                    
                }).catch(function(e) {
                    fetch(tableName,　params)
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
        const persisted = tablePersisted(tableName);
        
        return _client.find(tableName, params)
            .then(function(data) {
                _storage.set(storageKey, JSON.stringify({
                    create_at:new Date().toISOString(),
                    'contents':data,
                }),persisted);
                
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
    *	@param string tableName
    *	@param string storageKey
    *	@return object
    */
    let readStorage = function(tableName, storageKey) {
        const persisted = tablePersisted(tableName);
        
        return _storage.get(storageKey, persisted)
            .then(function(dataStr) {
                const parsedData = JSON.parse(dataStr);

                if (parsedData.create_at === undefined ||
                    isExpired(tableName, parsedData.create_at)
                ) {
                    throw 'is expired';
                } else {
                    return parsedData.contents;
                }
            }).catch(function(e) {
                throw e;
            });
    };

    /**
    *	isExpired
    *
    *	@param string tableName
    *	@param string dateString
    *	@return bool
    */
    let isExpired = function(tableName, dateString) {
        const createAt = new Date(dateString);
        const now = new Date();
            
        return now.getTime() >
            createAt.getTime() + tableExpiry(tableName);
    };

    /**
    *	tablePersisted
    *
    *	@param string tableName
    *	@return int
    */
    let tablePersisted = function(tableName) {
        return _tables[tableName] === undefined?
            false:(
                _tables[tableName]['persisted'] === undefined?
                false:_tables[tableName]['persisted']
            );
    };

    /**
    *	tableExpiry
    *
    *	@param string tableName
    *	@return int
    */
    let tableExpiry = function(tableName) {
        return _tables[tableName] === undefined?
            _expiry:(
                _tables[tableName]['expiry'] === undefined?
                _expiry:_tables[tableName]['expiry']
            );
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
        return _storage.remove(storageKey);
    };

    return {
        find:find,
        remove:remove,
        //以下テスト用
            isExpired:isExpired,
            fetch:fetch,
            readStorage:readStorage,
            tablePersisted:tablePersisted,
            tableExpiry:tableExpiry,
    };
};

/*

const _client = new AsyncClient({
	//users:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/users.json?id={key}',
	//kobans:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/kobans.json?nendo={key}',
	users:'https://localhost:8000/users.json',
	kobans:'https://localhost:8000/kobans.json',

});

const _storage = new AsyncWebStorage(null,null,lzbase62);

const _settings = {
    expiry:2 * 60 * 1000,
    tables:{
        users:{
            expiry:1 * 60 * 1000,
            persisted:true,
        },
    },
};

*/

/*

const tablePersistedTest = (function() {
    let repository, persisted;

    repository = new AsyncRepository(_storage,_client,{});
    persisted = repository.tablePersisted('users');
    console.log('non settings=' + persisted);

    repository = new AsyncRepository(_storage,_client,{
        tables:{users:{
            persisted:true,
        }}
    });
    persisted = repository.tablePersisted('users');
    console.log('persisted true=' + persisted);

    repository = new AsyncRepository(_storage,_client,{
        tables:{users:{
            persisted:false,
        }}
    });
    persisted = repository.tablePersisted('users');
    console.log('persisted false=' + persisted);
    
})();

*/

/*

const tableExpiryTest = (function() {
    let repository, expiry;

    repository = new AsyncRepository(_storage,_client,{});
    expiry = repository.tableExpiry('users');
    console.log('non settings=' + expiry);

    repository = new AsyncRepository(_storage,_client,{
        tables:{users:{
            expiry:20 * 60 * 1000,
        }}
    });
    expiry = repository.tableExpiry('users');
    console.log('expiry 1200sec=' + expiry);
    
})();

*/


/*

const isExpiredTest = (function() {
    const repository = new AsyncRepository(_storage,_client,_settings);

    console.log('users now=' + repository.isExpired('users', new Date()));

    console.log('users 2001-1-1=' + repository.isExpired('users', '2001-1-1 00:00:00'));

    const dt = new Date();
    const dt2 = dt.getTime() - (1 * 60 + 1) * 1000;
    const dt3 = dt.getTime() - (1 * 60 - 1) * 1000;

    console.log(dt);
    console.log(new Date(dt2));
    console.log(new Date(dt3));

    console.log('users over=' + repository.isExpired('users', dt2));
    console.log('users under=' + repository.isExpired('users', dt3));

    const dt4 = dt.getTime() - (2 * 60 + 1) * 1000;
    const dt5 = dt.getTime() - (2 * 60 - 1) * 1000;

    console.log(new Date(dt4));
    console.log(new Date(dt5));

    console.log('dummy over=' + repository.isExpired('dummy', dt4));
    console.log('dummy under=' + repository.isExpired('dummy', dt5));

})();

*/

/*

const fetchTest1 = (function() {
    window.localStorage.clear();
    window.sessionStorage.clear();

    const repository = new AsyncRepository(_storage,_client,_settings);

    repository.fetch('users')
        .then(function(data) {
            console.log(data);
            console.info('---localStorage');
            console.log(window.localStorage.getItem('users_'));
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
    window.sessionStorage.clear();

    const repository = new AsyncRepository(_storage,_client,_settings);

    repository.fetch('kobans',{yyyymm:'202307',nendo:'2023K',})
        .then(function(data) {
            console.log(data);
            console.info('---sessionStorage');
            console.log(window.sessionStorage.getItem('kobans_2023K_202307'));
            return repository.fetch('kobans',{yyyymm:'202307',nendo:'2023K',});
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
    window.sessionStorage.clear();

    const repository = new AsyncRepository(_storage,_client,_settings);

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
    window.sessionStorage.clear();

    const repository = new AsyncRepository(_storage,_client,_settings);

    repository.fetch('users')
        .then(function(data) {
            const dt = {
                'data':data
            };

            _storage.set('users_', JSON.stringify(dt));
            
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
    window.sessionStorage.clear();

    const repository = new AsyncRepository(_storage,_client,_settings);

    repository.fetch('users')
        .then(function(data) {
            const dt = {
                create_at:new Date('2001-1-1'),
                'data':data
            };

            _storage.set('users_', JSON.stringify(dt));
            
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
    window.sessionStorage.clear();

    const repository = new AsyncRepository(_storage,_client,_settings);

    repository.fetch('users')
        .then(function(data) {
            const dt = {
                create_at:new Date(),
                'data':data
            };

            _storage.set('users_', JSON.stringify(dt));
            
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
    window.sessionStorage.clear();

    const repository = new AsyncRepository(_storage,_client,_settings);

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
    window.sessionStorage.clear();

    const repository = new AsyncRepository(_storage,_client,_settings);

    repository.fetch('users')
        .then(function(data) {
            const dt = {
                create_at:new Date(),
                'data':data
            };

            _storage.set('users_', JSON.stringify(dt));
            
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
    window.sessionStorage.clear();
    
    window.localStorage.setItem('users_','DUMMY');
    
    const repository = new AsyncRepository(_storage,_client,_settings);

    repository.remove('users')
        .then(function() {
            console.log(window.localStorage.getItem('users_'));
        }).catch(function(e) {
            console.error(e);
        });
})();

*/

