/**
 * 请求高德地图api，获取省市区街道地址
*/


const getData = require('./get-data');

function getDataList() {
    //北京市 天津市 河北省 山西省 内蒙古自治区 辽宁省 吉林省 黑龙江省	上海市 江苏省 浙江省 安徽省 福建省	江西省	山东省	河南省	湖北省	
    // 湖南省	广东省	广西壮族自治区 海南省 重庆市 四川省 贵州省 云南省 西藏自治区 陕西省 甘肃省 青海省 宁夏回族自治区 新疆维吾尔自治区 台湾省 香港特别行政区 澳门特别行政区
    let provinceList = ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市',
        '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省',
        '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'];

    let provinceName = '澳门特别行政区';
    let url = `https://restapi.amap.com/v3/config/district?key=8003b9a13bfbf2dbb58fb1c35238db6f&keywords=${provinceName}&subdistrict=3&extensions=base`;
    getData.getDataList(url);
    // provinceList.forEach(function (provinceName) {
    //     let url = `https://restapi.amap.com/v3/config/district?key=8003b9a13bfbf2dbb58fb1c35238db6f&keywords=${provinceName}&subdistrict=3&extensions=base`;
    //     getData.getDataList(url);
    // })
}

getDataList();