const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //First argument is for error as we don't have error so put null
        //Second where to save our file
        callback(null, 'public/backend/uploads')
    },

    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + '-', file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fieldSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, callback) => {
        const types = /jpeg|jpg|png|gif|/ //Regex
        const extName = types.test(path.extname(file.originalname).toLowerCase()) // return boolean
        const mimeType = types.test(file.mimeType) // return boolean

        console.log('****File:*** ');
        console.log(file);

        if (extName && mimeType) {
            callback(null, true) //True means file upload korte hobe
        } else {
            callback(new Error('Only Support Images'))
        }

    }
})

module.exports = upload