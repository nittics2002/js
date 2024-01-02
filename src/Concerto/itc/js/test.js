

const settings = {
	//users:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/users.json?id={key}',
	//kobans:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/kobans.json?nendo={key}',
	users:'https://localhost:8000/users.json',
	kobans:'https://localhost:8000/kobans.json',
};

const client = new ClientPrimise(settings);

const storage = new WebStoragePromise('TABLE', false);

const repository = new RepositoryPrimise(storage,client,{
    expiry:60,
});



const sqlTest1 = (function() {
    const usersPminise = repository.find('users');

console.info('---after usersPminise');

    const kobansPminise = repository.find('kobans');

console.info('---after usersPmkobansPminiseinise');

    Promise.all([
        usersPminise,
        kobansPminise,
    ]).then(function(dataset) {
        
        //console.log(dataset);

        const sql = "SELECT * FROM :users WHERE id LIKE :idLike ORDER BY name";
        const params = {
            users:dataset[0],
            idLike:'91%',
        };
        
        return alasql.promise(sql,params);

    }).then(function(result) {
        console.log(result);
    }).catch(function(e) {
        console.error(e);
    });
   
    
})();

console.info('---END');




