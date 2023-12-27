/**
*	ClientPrimise
*
*	@version 231227
*/

/**
*	constructor
*
*	@param object settings
*/
var ClientPrimise = function(settings, communicator) {
	this.communicator = communicator === undefined?
		new CommunicatorPromise():communicator;
		
	this.settings = settings;
};

/**
*	find
*
*	@param string tableName
*	@param string tableName
*	@return Promise(XMLHttpRequest)
*/
ClientPrimise.prototype.find = function(tableName,key) {
	let that = this;
	
	return new Promise(function(resolve, reject){
		if (! tableName in settings) {
			reject('table not defined. tableName=' + tableName);
		} else {
			let url = settings[tableName].replace(/{key}/, key);
			
			that.communicator.fetch(url)
				.then(function(req) {
					resolve(req.response.data);
				}).catch(function(e) {
					reject(e)
				});
		}
	});	
}


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



