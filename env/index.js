module.exports = {
  mockApi:'',
  Dev:{// 本地
    baseApi: 'http://localhost:3000'
  },
  Test:{// 测试
    baseApi: 'http://test-node.51purse.com'
  },
  Slave:{//
    baseApi: 'http://slave-node.51purse.com'
  },
  Prod:{// 线上
    baseApi: 'http://node.51purse.com'
  }
}