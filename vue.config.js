module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true
      },
      '/apps/pdf': {
        target: 'https://hasretkemaliye.com',
        changeOrigin: true
      }
    }
  }
}