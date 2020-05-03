const express = require('express')
const exphds = require('express-handlebars')
const restaurantsList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphds({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_info = restaurantsList.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurants: restaurant_info })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantFilter = restaurantsList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())
    || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  )
  res.render('index', { restaurants: restaurantFilter, keyword: keyword })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})