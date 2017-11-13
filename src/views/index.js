async function index(ctx) {
  const createdTime = 1510376628830
  const lifeTime = Math.floor((new Date() - createdTime) / 1000 / 3600 / 24)

  ctx.body = `
    <html>
      <head>
        <title>screenshot</title>
        <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
        <div class="wrap">
          <div class="content">
            <input id="url-input" placeholder="网站地址">
            <span id="submit" class="button">截图</span>
            <p class="download">
              每天凌晨会清理图片，请及时下载
              <a id="result" target="_blank" href="#">下载图片</a>
            </p>
          </div>
          <footer class="footer">
            <p> BY <a href="https://ice.gs" target="_blank">GGICE</a> | 已经稳定运行${lifeTime}天</p>
          </footer>
          <div class="spinner" id="loading">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
          <script src="/js/main.js"></script>
        </div>
      </body>
    </html>
  `
}

module.exports = index
