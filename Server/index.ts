import express, { Request, response, Response } from 'express';
import multer from 'multer';
import unzipper from 'unzipper';
import path from 'path';
import * as scoreMethod from "../MVP/src/Scoring/scoring"
import * as processMethod from "../MVP/src/Processors/urlProcessor"
import * as sanitize from "../MVP/src/Input/Sanitize"

import UploadPackageRequest from './types/Request/UploadPackageRequest';
import CheckPackageRatingRequest from './types/Request/CheckPackageRatingRequest';
import UpdatePackageRequest from './types/Request/UpdatePackageRequest';
import DownloadPackageRequest from './types/Request/DownloadPackageRequest';
import FetchAvailableVersionsRequest from './types/Request/FetchAvailableVersionsRequest';
import IngestPackageRequest from './types/Request/IngestPackageRequest';
import FetchPackageDirectoryRequest from './types/Request/FetchPackageDirectoryRequest';
import SearchPackagesRequest from './types/Request/SearchPackagesRequest';
import CheckSizeCostRequest from './types/Request/CheckSizeCostRequest';

const app = express();
const PORT = 443;

// Configuration for handling zipped files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // folder to store uploaded files temporarly untill Google cloud storage is configured
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`); // rename file
    }
});
  
// Multer middleware to handle single file upload with 'zipFile' as the field name
// This is place holder untill GCP or S3 is used for keeping track of the data
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
  
// Middleware to parse JSON
app.use(express.json());

app.post(
    '/package/:debloat', 
    upload.single('package'),
    async (req: UploadPackageRequest, res: Response) => {
        console.log(req.params, req.body);
        const filename = req.file?.filename;

        // zipped file in uploads folder 
        // needs debloat to be implemented
        const endPointResponse = {
            params: req.params,
            body: req.body,
            filename: filename
        };
        res.status(200).send(endPointResponse);
});

app.post(
    '/packages/:packageName/:version',
    upload.single('package'),
    async (req: UpdatePackageRequest, res: Response) => {
        
        const filename = req.file?.filename || "Didnt get a zipped file";
        const endPointResponse = {
            params: req.params,
            body: req.body,
            filename: filename
        };
        res.status(200).send(endPointResponse);
});

app.post(
    '/packages/rating/:packageName/:version', 
    upload.single('package'),
    async (req: CheckPackageRatingRequest, res: Response) => 
{
    try {

        console.log("req: \n", req.params, " \nbody:\n", req.body);
        if (!req.params.packageName) {
            res.status(400).send('No file uploaded.');
        }

        // const zipFilePath = req.file.path;

        const npmURL = `https://www.npmjs.com/package/${req.params.packageName}`
        const cleanSet = sanitize.SanitizeUrlSet([ npmURL ])
        const repo = await processMethod.buildReposFromUrls(cleanSet)
        const npmPkgScore = await scoreMethod.scoreRepositoriesArray(repo);
        
        res.status(200).send(JSON.stringify(npmPkgScore));

        // res.status(200).send('File uploaded and extracted successfully');
        // // Optional: Unzip the file to a specific folder
        // const outputDir = path.join(__dirname, 'extracted');
        // fs.createReadStream(zipFilePath)
        //     .pipe(unzipper.Extract({ path: outputDir }))
        //     .on('close', () => {
        //         res.status(200).send('File uploaded and extracted successfully');
        //     });
    } catch (error) {
        res.status(500).send('Error uploading or processing file');
    }
});

/**
 * was originally: /packages/{packageName}/{version} in plan
 * changed to:
 *  /packages/download/{packageName}/{version}
 */
app.get(
    '/packages/download/:packageName/:version',
    async (req: DownloadPackageRequest, res: Response) => {
        const endPointResponse = {
            params: req.params,
            body: req.body
        };
        res.status(200).send(endPointResponse);
    }
)

app.get(
    '/packages/:packageName/versions/:version/:versionRange',
    async (req: FetchAvailableVersionsRequest, res: Response) => {
        const endPointResponse = {
            params: req.params,
            body: req.body
        };
        res.status(200).send(endPointResponse);
    }
)

app.post(
    '/ingest/:packageName/:version',
    async (req: IngestPackageRequest, res: Response) => {
        const endPointResponse = {
            params: req.params,
            body: req.body
        };
        res.status(200).send(endPointResponse);
    }
)

app.post(
    '/ingest/:packageName/:version',
    async (req: IngestPackageRequest, res: Response) => {
        const endPointResponse = {
            params: req.params,
            body: req.body
        };
        res.status(200).send(endPointResponse);
    }
)

app.get(
    '/packages/:page',
    async (req: FetchPackageDirectoryRequest, res: Response) => {
        /**
         * I removed limit from the request parameters.
         * Its a vulnurability if they are able to control the amt 
         * of packages on a given response.
         * 
         * Calcualte the given entries by page number and a fixed page
         * size only on the server
         */

        const pageSize = 30;
        const startIndex = (pageSize * req.params.page);
        const stopIndex = startIndex + pageSize;
        
        const endPointResponse = {
            params: req.params,
            body: req.body
        };

        res.status(200).send(endPointResponse);
    }
)

app.get(
    '/packages/search/:nameRegex/:readmeRegex',
    async (req: SearchPackagesRequest, res: Response) => {
        /**
         * Passing in raw regex over the network will fail since it will mess with the URL.
         *  -urls dont allow you to use: [] () / _
         * Possiably hash the regex with SHA256 before sending it and unhash it before using it.
         */
        const endPointResponse = {
            params: req.params,
            body: req.body
        };

        res.status(200).send(endPointResponse);
    }
)

app.get(
    '/packages/size-cost',
    async (req: CheckSizeCostRequest, res: Response) => {
        /**
         * 
         * Used the body of the request for the packages so there 
         * can be an array of simple Package objects.
         * 
         * Each has a name and an array of versions
         */
        const endPointResponse = {
            params: req.params,
            body: req.body
        };

        res.status(200).send(endPointResponse);
    }
)

app.post(
    '/reset',
    async (req: Request, res: Response) => {
        
        res.status(200).send("Reset endpoint hit.");
    }
)

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});