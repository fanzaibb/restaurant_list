const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const listData = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser:true})

const db = mongoose.connection

db.on('error', ()=>{
  console.log('db error')
})

db.once('open', ()=>{
  console.log('db connected!')
  const data = listData.results
  for (let i = 0; i < data.length; i++){
    Restaurant.create(data[i])
  }
  console.log('data-process done!')
})