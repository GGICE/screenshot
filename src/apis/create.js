const puppeteer = require('puppeteer')
const path = require('path')
var browser
var page

function throwMessage(ctx, message) {
  ctx.body = {
    message,
  }
}

function throwError(ctx, message) {
  ctx.response.status = 500
  ctx.body = {
    message,
  }
}

async function newBrowser () {
  browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
  page = await browser.newPage()

  setTimeout(() => {
    browser.close()
    browser = null
    page = null
  }, 10 * 60 * 1000)
}

newBrowser()

async function create(ctx) {
  if (!browser) {
    await newBrowser()
  }
  const { body } = ctx.request
  let title
  let name

  if (!body.url) {
    return throwMessage(ctx, 'Not find url')
  }

  try {
    page.setViewport({
      width: Number(body.width) || 1400,
      height: Number(body.height) || 100,
    })
    await page.goto(`${body.url}`)
    title = await page.title()
    name = `${title}-${new Date().getTime()}`

    //Suport Lazy loading page
    await page.evaluate(() => {
      window.scrollTo(0, 100000000)
      window.scrollTo(100000000, 0)
      window.scrollTo(0, 100000000)
    })

    // Do screnshot
    await page.screenshot({
      path: `${path.resolve('./public/created-images/')}/${name}.png`,
      fullPage: !body.height && !body.width,
    })

  } catch (e) {
    global.console.error(e)
    return throwError(ctx, 'Server error')
  }

  ctx.body = {
    image: `${ctx.protocol}://${ctx.host}/created-images/${name}.png`,
  }

  return ctx
}

module.exports = create
