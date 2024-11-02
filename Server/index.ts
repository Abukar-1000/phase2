import express, { Request, Response } from 'express';
import multer from 'multer';
import unzipper from 'unzipper';
import * as PakageRating from "./types/RatePackageRequest"
import * as scoreMethod from "../MVP/src/Scoring/scoring"
import * as processMethod from "../MVP/src/Processors/urlProcessor"
import * as sanitize from "../MVP/src/Input/Sanitize"

const app = express();
const PORT = 3000;


const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON
app.use(express.json());
app.use('/packages/rating', upload.single('zipfile'));


/** rates recieved package
 * Test with postman using: http://localhost:3000/packages/rating/:packageName/:version?packageName=name&version=1.0
*/
app.post(
    '/packages/rating/:packageName/:version', 
    async (req: Request<PakageRating.RatePackageRequestParams, any, PakageRating.RatePackageRequestBody>, res: Response) => 
{
    try {

        console.log("req: \n", req.params, " \nbody:\n", req.body);
        // if (!req.file) {
        //     return res.status(400).send('No file uploaded.');
        // }

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


// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});