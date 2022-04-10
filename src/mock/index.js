import Mock from 'mockjs'
import home from './home'

// 设置mock响应时间为200-2000毫秒范围
Mock.setup({
  timeout: '200-2000',
})

Mock.mock('http://192.168.43.104:8060/api/v1/browser/www.336z.net/tree', 'get', home.getData)
