module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 실제 백엔드 서버 주소
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}