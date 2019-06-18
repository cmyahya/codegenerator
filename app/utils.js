const path = require('path')
const mkdirp = require('mkdirp');

var parentFolderName = getCurrentProjectFolder();

function getCurrentProjectFolder () {
    var folderpath = path.resolve(".\\");
    return folderpath.substr(folderpath.lastIndexOf("\\") + 1);    
}

module.exports = {
    isValidServiceName: function (serviceName) {
        var validationRule = /^((?![A-Z0-9`~!@#$%^&*()+={}[\]|\\;:'"<>,./?]).)*(-service)$/g;
        return validationRule.test(serviceName);
    }, 
    getParentFolderName: function () {
        return parentFolderName;
    }, 
    getClassName: function (serviceName) {        
        var words = serviceName.split('-');
        var className = '';
        words.forEach(function (word) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
            className += word;
        })
        return className;
    },
    getRootDirectory: function (serviceName) {
        return (parentFolderName === serviceName) ? "." : serviceName 
    },
    createDirectories: function (directories) {        
        directories.forEach(function (element) {
            if (! (element == 'undefined') || (element == "")) {
                console.log(element)
                mkdirp(element)
            }            
        })
    }
}
