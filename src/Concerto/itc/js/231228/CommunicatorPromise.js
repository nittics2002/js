/**
*	CommunicatorPromise
*
*	@version 231227
*/

/**
*	constructor
*
*/
var CommunicatorPromise = function() {
	
};

/**
*	fetch
*
*	@param string url
*	@param object options
*		{method,responseType,timeout,withCredentials}
*	@return Promise(XMLHttpRequest)
*/
CommunicatorPromise.prototype.fetch = function(url, options) {
	options = options || {responseType:"json"};
	
	return new Promise(function(resolve, reject){
		const xhr = new XMLHttpRequest();

		const method = options.method === undefined?
			"GET":options.method;
		
		xhr.open(method, url, true);
		
		xhr.responseType = options.responseType === undefined?
			"json":options.responseType;
		
		xhr.timeout = options.timeout === undefined?
			0:options.timeout;
		
		xhr.withCredentials = options.withCredentials === undefined?
			false:options.withCredentials;
		
		xhr.onload = function(){
			if(xhr.status == 200 || xhr.status == 304) {
				resolve(xhr);
				
			} else {
				reject(xhr);
				
			}	
		};

		xhr.onerror = function(){
			reject(xhr);
		};
		
		xhr.send();
	});	
}
