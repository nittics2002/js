/**
*	AsyncClient
*
*	@version 231227
*/

var AsyncClient = (function(settings, communicator) {
	const _communicator = communicator === undefined?
		new AsyncCommunicator():communicator;
		
	const _settings = settings;

    /**
    *	find
    *
    *	@param string tableName
    *	@param ?object params
    *	@return Promise(XMLHttpRequest)
    */
    let find = function(tableName,params) {
        return new Promise(function(resolve, reject){
            let url = _settings[tableName]

            if (url === undefined) {
                reject('table not defined. tableName=' + tableName);
            } else {
                const query = params !== undefined?
                    '?' + buildQuery(params):'';

                url = _settings[tableName] + query;
                
                _communicator.fetch(url)
                    .then(function(req) {
                        resolve(req.response.data);
                    }).catch(function(e) {
                        reject(e)
                    });
            }
        });
    };

    /**
    *	buildQuery
    *
    *	@param object params
    *	@return string
    */
    let buildQuery = function(params) {
        return Object.keys(params).map(function(key,index,ar) {
            return key + '=' + params[key];
        }).join('&');
    };
    
    return {
        find:find,
    };
});

////////////////////////////////////////////////////////////////////////////////


/*
const _settings = {
	//users:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/users.json?id={key}',
	//kobans:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/kobans.json?nendo={key}',
	users:'https://localhost:8000/users.json',
};

const client = new AsyncClient(_settings);

client.find('users')
	.then(function(data){
		console.log(data);
	}).catch(function(e){
		console.error(e);

	});

client.find('users',{id:'abc',name:'aoki'})
	.then(function(data){
		console.log(data);
	}).catch(function(e){
		console.error(e);

	});

client.find('DUMMY',{id:'abc',name:'aoki'})
	.then(function(data){
		console.error(data);
	}).catch(function(e){
		console.log(e);

	});
		


console.log("END");
	
*/



