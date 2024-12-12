

const baseApiRout = (
    process.env.CONTEXT === "dev" ||
    process.env.CONTEXT === undefined
) ? 
    "http://localhost:443/" 
: 
    "[prod]";


const config = {
    route: baseApiRout
}

export default config;