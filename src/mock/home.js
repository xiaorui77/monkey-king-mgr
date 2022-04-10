export default {
  getData: () => {
    return {
      code: 20000,
      data: {
        id: 0,
        name: '首页',
        children: [
          {
            id: 1,
            pid: 0,
            name: '你好',
            children: null,
          },
        ],
      },
    }
  },
}
