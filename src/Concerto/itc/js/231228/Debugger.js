/**
*	Debugger
*
*	@version 231227
*/

/**
*	constructor
*
*	@param bool isProduction
*/
var Debugger = function(isProduction = true) {
    this.isProduction = isProduction === undefined ?
        true:isProduction;

    this.debug = function(msg) {
        if (!this.isProduction) {
            console.debug(msg);
        }
    }

    this.error = function(msg) {
        if (!this.isProduction) {
            console.error(msg);
        }
    }

    this.info = function(msg) {
        if (!this.isProduction) {
            console.info(msg);
        }
    }

    this.log = function(msg) {
        if (!this.isProduction) {
            console.log(msg);
        }
    }

    this.warn = function(msg) {
        if (!this.isProduction) {
            console.warn(msg);
        }
    }
        
    return this;
};

Debugger = Debugger(false);

/*

Debugger.debug("debug");

Debugger.error("error");

Debugger.info("info");

Debugger.log("log");

Debugger.warn("warn");
*/
