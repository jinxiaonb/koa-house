const pathParse = {
    getFile(url) {
        let arr = url.split('/');
        let file = arr[arr.length - 1];
        let fileArr = file.split('.');
        return fileArr;
    },
    //
    getFileName: function (url) {
        return this.getFile(url)[0];
    },
    getFileType: function (url) {
        return this.getFile(url)[1]
    }
};

module.exports = pathParse;