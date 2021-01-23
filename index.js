// @ts-check

// A simple server that lets users query tracking data without registering for an API key
// also hides the user's IP, which is cool for privacy 🤫

import dotenv from 'dotenv-safe'
dotenv.config()

import express from 'express'
import { suiviPosteApi as suiviPoste } from 'suivi-poste'

import cors from 'cors'
import compression from 'compression'
import expressRateLimit from 'express-rate-limit'
import morgan from 'morgan'

const API_KEY = process.env.API_KEY
const SERVER_PORT = process.env.SERVER_PORT

const app = express()

// Trust reverse proxy
app.set('trust proxy', 1)

// Open CORS
app.use(cors())

// Compress responses
app.use(compression())

// Apply rate limit
app.use(
  expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'You have reached your `suivi-poste-proxy` rate limit (max 50 calls/15 minutes). Wait some time.'
  })
)

// Log requests
app.use(morgan('combined'))

app.get('/_proxy/:trackingNumbersRaw', async (req, res) => {
  res.set('Content-Type', 'application/json')

  const trackingNumbersRaw = req.params.trackingNumbersRaw
  if (!trackingNumbersRaw) return res.status(400).json({ returnMessage: 'Missing tracking number' })

  const trackingNumbers = trackingNumbersRaw.split(',')

  try {
    const suiviPosteApi = suiviPoste({
      token: API_KEY,
      userAgent: `${req.get(
        'User-Agent'
      )} - proxied with github.com/rigwild/suivi-poste-proxy v0.2.0 on suivi-poste-proxy.rigwild.dev`
    })

    const result = await suiviPosteApi.getTracking(...trackingNumbers)
    // console.log(JSON.stringify(result, null, 2))
    res.json(result)
  } catch (err) {
    res.status(typeof err.status === 'number' ? err.status : 500).json(err || { error: err.message })
  }
})

app.listen(SERVER_PORT, () => console.log(`Server is listening on http://localhost:${SERVER_PORT}`))
