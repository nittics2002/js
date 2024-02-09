/**
*
*
*   @depends underscore.js
*   @version 
*/




function queryRequest(url, callback, params = {}) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = params.responseType || 'json';

    _.each(params, function(val, key) {
        xhr[key] = val;
    });
    
    
    
    xhr.addEventListener('load', callback);

    xhr.open('get', url);
    xhr.send();

}

Concerto.HttpClient = function(params = {}) {
    

};







