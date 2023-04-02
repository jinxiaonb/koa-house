const mysql = require('mysql');

const clusterConfig = {
    removeNodeErrorCount: 5,//如果一个节点发生错误的次数达到这个值，那么该节点会被移除并标记为无效节点。默认值为3。
    defaultSelector: 'RR',//默认节点选择算法。可以是RR（轮询）或RANDOM（随机）。
    canRetry: true,//如果设置为true，则可以在发生错误后重试请求。默认值为true。
    restoreNodeTimeout: 5000,// 在移除一个节点之后，需要等待多长时间才可以将该节点恢复为可用节点。默认值为0，表示不等待。
    defaultSelectorOptions: {// 默认的节点选择算法选项。
        removeNodeErrorCount: 5,
        restoreNodeTimeout: 5000
    },
    nodes: [
        {
            name: 'node1',
            poolConfig: {
                connectionLimit: 10,
                host: 'localhost',
                user: 'user1',
                password: 'password1',
                database: 'database1'
            }
        },
        {
            name: 'node2',
            poolConfig: {
                connectionLimit: 10,
                host: 'localhost',
                user: 'user2',
                password: 'password2',
                database: 'database2'
            }
        }
    ]
};

const poolCluster = mysql.createPoolCluster(clusterConfig);

// 设置一个节点作为默认节点
poolCluster.add('default', clusterConfig.nodes[0].poolConfig);

module.exports = poolCluster;