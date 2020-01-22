// 用express不用定義hostname，已預設用localhost
// include express from node_module
const express = require('express') // express內部已載入http模組
const app = express() //讓app能使用express提供的method
const mongoose = require('mongoose')

//連接資料庫
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

//連線後透過mongoose.connection拿到connection的物件
const db = mongoose.connection

// define server related variables
const port = 3000
// require express-handlebars
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant.js')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//瀏覽全部資訊
app.get('/', (req, res) => {
  Restaurant.find((err, restaurant) => { // （失敗參數, 成功參數）
    if (err) return console.err(err)
    return res.render('index', { restaurant: restaurant })
  })
})

//瀏覽特定餐廳資訊

//新增餐廳

//修改資訊

//刪除資訊






// start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})

// --------------初期ㄉ陽春路由---------------
// handle request and response
// app.get('/', (req, res) => {
//   res.render('index', { rest: restList.results }) //render() for HTML; send() for text 
// })
// app.get('/restaurants/:rest_id', (req, res) => {
//   const rest = restList.results.find( rest => rest.id.toString() === req.params.rest_id )
//   res.render('show', { rest: rest })
// })
// app.get('/search', (req, res) =>{
//   const keyword = req.query.keyword
//   const rests = restList.results.filter( rest => { 
//     return rest.name.toLowerCase().includes(keyword.toLowerCase())
//   })

//   console.log(rests[0])
//   res.render('show', { rests: rests[0] })
// })