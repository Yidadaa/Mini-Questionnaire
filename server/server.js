const Router = require('koa-router')
const koa = require('koa')
const serve = require('koa-static')
const koaBody = require('koa-body')
const path = require('path')
const fs = require('fs')

const sqlite = require('sqlite')
const Promise = require('bluebird')
const dbPromise = sqlite.open('./q.db', { Promise })

const app = new koa()
const router = new Router()

const indexFile = fs.createReadStream('dist/index.html')

router.get('/', (ctx, next) => {
  ctx.response.type = 'text/html'
  ctx.response.body = indexFile
})

router.post('/post', (ctx, next) => {
  ctx.response.type = 'json'
  ctx.response.body = {
    success: true
  }
})

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())
app.use(serve(path.join(__dirname, '..', 'dist')))

app.listen(8088)