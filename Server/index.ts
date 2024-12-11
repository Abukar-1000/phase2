import express, { Request, response, Response } from 'express';

import UploadPackageRequest from './types/Request/UploadPackageRequest';
import CheckPackageRatingRequest from './types/Request/CheckPackageRatingRequest';
import UpdatePackageRequest from './types/Request/UpdatePackageRequest';
import DownloadPackageRequest from './types/Request/DownloadPackageRequest';
import FetchAvailableVersionsRequest from './types/Request/FetchAvailableVersionsRequest';
import IngestPackageRequest from './types/Request/IngestPackageRequest';
import FetchPackageDirectoryRequest from './types/Request/FetchPackageDirectoryRequest';
import SearchPackagesRequest from './types/Request/SearchPackagesRequest';
import CheckSizeCostRequest from './types/Request/CheckSizeCostRequest';
import cors from "cors"

// Route endpoint definitions
import ZippedUpload from './routes/ZippedUpload';
import UpdatePackage from "./routes/UpdatePackage";
import CheckPackageRating from "./routes/CheckPackageRating";
import DownloadPackage from "./routes/DownloadPackage";
import FetchAvailableVersions from "./routes/FetchAvailableVersions";
import IngestPackage from "./routes/IngestPackage";
import FetchPackageDirectory from "./routes/FetchPackageDirectory";
import SearchPackages from "./routes/SearchPackages";
import CheckSizeCost from "./routes/CheckSizeCost";
import Reset from "./routes/Reset";

// auto grader routes
// import ZippedUpload from './auto/ZippedUpload';
// import UpdatePackage from "./auto/UpdatePackage";
// import CheckPackageRating from "./auto/CheckPackageRating";
// import DownloadPackage from "./auto/DownloadPackage";
// import FetchAvailableVersions from "./auto/FetchAvailableVersions";
// import IngestPackage from "./auto/IngestPackage";
// import FetchPackageDirectory from "./auto/FetchPackageDirectory";
// import SearchPackages from "./auto/SearchPackages";
// import CheckSizeCost from "./auto/CheckSizeCost";
// import Reset from "./auto/Reset";


const app = express();
const PORT = 443;
  
// Middleware to parse JSON
app.use(express.json());
app.use(cors<Request>());

// Route mapping
app.use("/package", ZippedUpload);
app.use("/packages", UpdatePackage);
app.use("/packages", CheckPackageRating);
app.use("/packages/download", DownloadPackage);
app.use("/packages/versions", FetchAvailableVersions);
app.use("/ingest", IngestPackage);
app.use("/packages/directory", FetchPackageDirectory);
app.use("/packages/search", SearchPackages);
app.use("/packages/size-cost", CheckSizeCost);
app.use("/reset", Reset);

// app.use("/packages", FetchAvailableVersions);
// app.use("/packages/search", SearchPackages);
// app.use("/package", ZippedUpload);
// app.use("/packages", UpdatePackage);
// app.use("/packages/rating", CheckPackageRating);
// app.use("/packages/download", DownloadPackage);
// app.use("/ingest", IngestPackage);
// app.use("/packages/directory", FetchPackageDirectory);
// app.use("/reset", Reset);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});