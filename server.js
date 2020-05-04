import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('This is an API with 1375 Netflix titles. Have fun exploring them!')
})

// Gets all objects in the API
app.get('/titles', (req, res) => {
  res.json(netflixData)
})

// Gets an object with a specific id
app.get('/titles/:id', (req, res) => {
  const id = req.params.id
  const titleId = netflixData.find((item) => item.show_id === +id)
  if (titleId) {
    res.json(titleId)
  } else {
    res.status(404).send('Sorry, no such title was found.')
  }
})

// Gets objects released specific year
app.get('/releaseyear/:year', (req, res) => {
  const year = req.params.year

  // Query for type:
  const showType = req.query.type
  let titlesFromYear = netflixData.filter((item) => item.release_year === + year)

  if (showType) {
    titlesFromYear = titlesFromYear.filter((item) => item.type.toLowerCase() === showType.toLowerCase())
  }
  res.json(titlesFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
