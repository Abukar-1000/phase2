import multer from 'multer';
// Configuration for handling zipped files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // folder to store uploaded files temporarly untill Google cloud storage is configured
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`); // rename file
    }
});

const upload = multer({
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
