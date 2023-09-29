module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Spring Boot 서버 주소
        ws: true,
        changeOrigin: true
      }
    }
  },
};