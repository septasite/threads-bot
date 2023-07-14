const { ThreadsAPI } = require('threads-api')
const axios = require('axios')
require('dotenv').config()

const main = async () => {
  try {
    const randomQuote = await axios.get('https://api.quotable.io/random')
    const { content } = randomQuote.data

    const threadsAPI = new ThreadsAPI({
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    })

    const posts = await threadsAPI.publish({
      text: content,
    })

    console.log(posts)
  } catch (err) {
    throw new Error(err.message)
  }
}

setInterval(async () => {
  await main()
}, process.env.DELAY * 1000)
