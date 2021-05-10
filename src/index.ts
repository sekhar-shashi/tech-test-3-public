import express from 'express';
import { validateUser } from '../src/handleUser/loginCheck'
const app = express()
const port = 3000

app.use(express.json())

app.get('/status', (req, res) => { res.status(200).end(); });
app.head('/status', (req, res) => { res.status(200).end(); });

const basicAuthHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try{
    // extract header and get user name ans password
    const extractedAccount = req.headers['authorization'] && 
        req.headers['authorization'].substring('Basic:'.length).trim() || '';
    if (validateUser(extractedAccount).length === 0) {
      res.set('WWW-Authenticate', 'Basic realm="tech-test-3"')
      res.status(401).send({ message: 'invalid login' })
  }
  }catch(err) {
    res.status(500).send({ error: 'err.message' })
  }
  
  next()
}

app.get('/basic-auth', basicAuthHandler, (req: express.Request, res: express.Response) => {
  res.status(200).end();
})

export const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
