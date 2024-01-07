/**
*	NonCompresser
*
*	@version 231227
*/

var NonCompresser = (function() {

    /**
    *	compress
    *
    *	@param string strVal
    *	@return string
    */
    let compress = function(strVal) {
        return strVal;
    };

    /**
    *	decompress
    *
    *	@param string strVal
    *	@return string
    */
    let decompress = function(strVal) {
        return strVal;
    };
    
    return {
        compress:compress,
        decompress:decompress,
    };
});

////////////////////////////////////////////////////////////////////////////////

/*

const allTest = (function() {
    const value = "ABCD";

    const compresser = new NonCompresser();
    
    console.log('compress=' + compresser.compress(value));
    console.log('decompress=' + compresser.decompress(value));
})();

*/





