const pathParse = {
    getFile(url) {
        let arr = url.split('/');
        let file = arr[arr.length - 1];
        // console.log(file);
        let fileArr = file.split('.');
        // console.log(fileArr);
        return fileArr;
    },
    //
    getFileName: function (url) {
        return this.getFile(url)[0];
    },
    getFileNameByXiaoQu: function (url) {
        let arr = url.split('/');
        return arr[arr.length - 2];
    },
    getFileType: function (url) {
        return this.getFile(url)[1]
    }
};

module.exports = pathParse;