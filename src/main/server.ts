import app from './config/app'

const port = 5050
app.listen(5050, () => {
  console.log(`Server running at http://localhost:${port}`)
})
