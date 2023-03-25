
const request = require('./request');
const dbUtil = require('./mysql');

const getData = {
    getDataList: function (url) {
        request.get(url).then(r => {
            // console.log(JSON.stringify(result));
            let result = JSON.parse(r);
            // console.log(result.districts);
            // console.log(result.status, result.info, result.infocode);
            if (result.status === '1') {
                this.parseProvince(result.districts[0]);
            }
        });
        console.log('success');
    },
    async parseProvince(result) {
        let center = result.center;
        // console.log(center);
        let obj = {
            city_code: '',
            ad_code: result.adcode,
            name: result.name,
            lat: center.split(',')[0],
            lng: center.split(',')[1],
            level: result.level
        }
        // console.log(obj);
        await dbUtil.insertData('b_province', obj)
        // console.log(s);
        if (result.districts.length > 0) {
            this.parseCity(result.districts, result.adcode);
        }
        console.log('province');

    },
    parseCity(result, province_id) {
        let that = this;
        result.map(async function (item) {
            let center = item.center;
            let obj = {
                city_code: item.citycode,
                ad_code: item.adcode,
                name: item.name,
                lat: center.split(',')[0],
                lng: center.split(',')[1],
                level: item.level,
                province_id: province_id
            };
            // console.log(item);
            await dbUtil.insertData('b_city', obj)
            if (item.districts.length > 0) {
                that.parseDistrict(item.districts, province_id, item.adcode);
            }

        });
        console.log('city');
    },
    parseDistrict(result, province_id, city_id) {
        let that = this;
        result.map(async function (item) {
            let center = item.center;
            let obj = {
                city_code: item.citycode,
                ad_code: item.adcode,
                name: item.name,
                lat: center.split(',')[0],
                lng: center.split(',')[1],
                level: item.level,
                province_id: province_id,
                city_id: city_id
            };
            // console.log(item);
            await dbUtil.insertData('b_district', obj)
            if (item.districts.length > 0) {
                that.parseStreet(item.districts, province_id, city_id, item.adcode);
            }
        });
        console.log('district');
    },
    parseStreet(result, province_id, city_id, district_id) {
        result.map(async function (item) {
            let center = item.center;
            let obj = {
                city_code: item.citycode,
                ad_code: item.adcode,
                name: item.name,
                lat: center.split(',')[0],
                lng: center.split(',')[1],
                level: item.level,
                province_id: province_id,
                city_id: city_id,
                district_id: district_id
            };
            // console.log(item);
            await dbUtil.insertData('b_street', obj)
        });
        console.log('street');
    }
}

module.exports = getData;