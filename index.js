import http  from 'http'
import cors from 'cors'
import express from 'express'
import Busboy  from 'busboy'




import { pipeline } from 'stream/promises'
import  UploadHandler  from './upload.js'




const app = express();
app.use(cors())


 
app.post('/fileupload', async function (req, res) {

const { headers } = req
const uploadHandler = new UploadHandler()

const onFinish = (response) => () => {
  response.writeHead(200, { 'Connection': 'close' })
  const data = JSON.stringify({ result: 'Files uploaded with success! ' })
  response.end(data)
}

const busboyInstance = uploadHandler.uploadArquivos(headers, onFinish(res))

await pipeline(
  req,
  busboyInstance
)


})

 
app.listen(8080);