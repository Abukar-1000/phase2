import multer from 'multer';
import unzipper from 'unzipper';
import path from 'path';


const storage = multer.memoryStorage();
// Multer middleware to handle single file upload with 'zipFile' as the field name
// This is place holder untill GCP or S3 is used for keeping track of the data
const zipFileHandler = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.zip') {
            // Extract package name here
            cb(null, true); // Accept .zip files only
        } else {
            // reject file here 
            cb(null, false); // Reject other files
        }
    }
});

export default zipFileHandler;