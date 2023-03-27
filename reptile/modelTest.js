const xiaoquModel = require('./mvc/models/xiaoqu');
const xiaoquesfsellModel = require('./mvc/models/xiaoquesfsell');

let xqm = new xiaoquModel({
    id: 1,
    code: '1811054186107',
    name: '湖畔花园春晓苑',
    pic_detail: 'https://ke-image.ljcdn.com/hdic-resblock/06e501dc-c806-46a8-8e6b-5392468ad18d.JPG.232x174.jpg',
    pic_path: 'https://ke-image.ljcdn.com/hdic-resblock/',
    district_name: '西湖',
    street_name: '文一西路小区',
    erf_code: 'c1811054186107',
    add_time: '1679902825',
    update_time: '1679902826'
});

let xqesfsm = new xiaoquesfsellModel({
    id: 1,
    xiaoqu_id: 1,
    xiaoqu_code: '1811054186107',
    xiaoqu_name: '湖畔花园春晓苑',
    sell_count: 3,
    add_time: '1679902825'
})
// console.log(xqm.getId());

console.log(JSON.stringify(xqesfsm));