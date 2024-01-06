/**
*	AsyncCommunicator
*
*	@version 231227
*/

var AsyncCommunicator = (function() {
    /**
    *	fetch
    *
    *	@param string url
    *	@param object options
    *		{method,responseType,timeout,withCredentials}
    *	@return Promise(XMLHttpRequest)
    */
    let fetch = function(url, options) {
        _options = options || {responseType:"json"};
        
        return new Promise(function(resolve, reject){
            const xhr = new XMLHttpRequest();

            const method = _options.method === undefined?
                "GET":_options.method;
            
            xhr.open(method, url, true);
            
            xhr.responseType = _options.responseType === undefined?
                "json":_options.responseType;
            
            xhr.timeout = _options.timeout === undefined?
                0:_options.timeout;
            
            xhr.withCredentials = _options.withCredentials === undefined?
                false:_options.withCredentials;
            
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
    };

    return {
        fetch:fetch,
    };
	
});

///////////////////////////////////////////////////////////////////////////////

/*

const obj = new AsyncCommunicator();

obj.fetch('users.json')
    .then(function(xhr) {
        console.log(xhr.response);
    }).catch(function(e) {
        console.error(e);
    });

*/
