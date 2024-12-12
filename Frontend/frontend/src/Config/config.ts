

const baseApiRout = (
    process.env.REACT_APP_Context === "dev" ||
    process.env.REACT_APP_Context === undefined
) ? 
    "http://localhost:443/" 
: 
    "http://ec2-184-73-59-90.compute-1.amazonaws.com:443/";


const config = {
    route: baseApiRout
}

export default config;