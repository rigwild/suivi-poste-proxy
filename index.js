// @ts-check
'use strict'

// A simple server that lets users query tracking data without registering for an API key
// also hides the user's IP, which is cool for privacy 🤫

require('dotenv-safe').config()

const API_KEY = process.env.API_KEY
const SERVER_PORT = process.env.SERVER_PORT

const express = require('express')
const suiviPoste = require('suivi-poste')

const app = express()

// Trust reverse proxy
app.set('trust proxy', 1)

// Open CORS
// @ts-ignore
app.use(require('cors')())
// Compress responses
// @ts-ignore
app.use(require('compression')())
// Apply rate limit
app.use(
  // @ts-ignore
  require('express-rate-limit')({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'You have reached your `suivi-poste-proxy` rate limit (max 50 calls/15 minutes). Wait some time.'
  })
)
// Log requests
// @ts-ignore
app.use(require('morgan')('combined'))

app.get('/_proxy/:trackingNumbersRaw', async (req, res) => {
  res.set('Content-Type', 'application/json')

  const trackingNumbersRaw = req.params.trackingNumbersRaw
  if (!trackingNumbersRaw) return res.status(400).json({ returnMessage: 'Missing tracking number' })

  const trackingNumbers = trackingNumbersRaw.split(',')

  try {
    const suiviPosteApi = suiviPoste.api({
      token: API_KEY,
      userAgent: `${req.get('User-Agent')} - call through https://suivi-poste-proxy.rigwild.dev/ proxy server`
    })

    const result = await suiviPosteApi.getTracking(...trackingNumbers)
    // console.log(JSON.stringify(result, null, 2))
    res.json(result)
  } catch (err) {
    res.status(typeof err.status === 'number' ? err.status : 500).json(err || { error: err.message })
  }
})

app.listen(SERVER_PORT, () => console.log(`Server is listening on http://localhost:${SERVER_PORT}`))
