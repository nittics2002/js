/**
*	ClientPrimise
*
*	@version 231227
*/

var ClientPrimise = (function(_settings, _communicator) {
	communicator = _communicator === undefined?
		new CommunicatorPromise():_communicator;
		
	settings = _settings;

    /**
    *	find
    *
    *	@param string tableName
    *	@param string tableName
    *	@return Promise(XMLHttpRequest)
    */
    let find = function(tableName,key) {
        return new Promise(function(resolve, reject){
            if (! tableName in settings) {
                reject('table not defined. tableName=' + tableName);
            } else {
                let url = settings[tableName].replace(/{key}/, key);
                
                communicator.fetch(url)
                    .then(function(req) {
                        resolve(req.response.data);
                    }).catch(function(e) {
                        reject(e)
                    });
            }
        });	
    };

    return {
        find:find,
    };
};


/*
const settings = {
	users:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/users.json?id={key}',
	kobans:'https://itcv1800005m.toshiba.local:8086/_js/AlaSql/example/test2/kobans.json?nendo={key}',
};

const client = new ClientPrimise(settings);

client.find('users','')
	.then(function(req){
		console.log(req);
		
		
		
	}).catch(function(e){
		console.error(e);

	});
		


console.log("END");
	
*/



