const _ = require("lodash");
const pr = console.log;

export { pr }

String.prototype.removeSpecialChars = function () {
    // remove special characters

    return  this.replace(/\\n/g, "\n")
                .replace(/\\r/g, "\r")
                .replace(/\\'/g, "\'")
                .replace(/\\"/g, '\"')
                .replace(/\\&/g, "\&")
                .replace(/\\t/g, "\t")
                .replace(/\\b/g, "\b")
                .replace(/\\f/g, "\f")
}
