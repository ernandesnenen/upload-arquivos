import Busboy from 'busboy'
import fs from 'fs'
import { pipeline } from 'stream/promises'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';



const caminho= resolve(dirname(fileURLToPath(import.meta.url)));


export default class UploadHandler {


     async onFile(fieldname, file, filename) { 
        let saveTo = `${caminho}\\uploads\\${filename}` 
        console.log(saveTo)
         
    
        await pipeline(         
            file,           
            fs.createWriteStream(saveTo)
        )
    }
       
    uploadArquivos(headers, onFinish) {
    
        const busboy = new Busboy({ headers })        
        busboy.on("file", this.onFile.bind(this))
        busboy.on("finish", onFinish)
        
        return busboy
    }


}
