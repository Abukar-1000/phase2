import { JSX } from "react"
import All from "./Pages/All"
import Search from "./Pages/Search"
import Update from "./Pages/Update"
import Upload from "./Pages/Upload"
import Documentation from "./Pages/Documentation"

interface IRoute {
    path: string,
    component: JSX.Element
}

type Router = IRoute[];

const routes: Router = [
    {
        path: "/all",
        component: <All />
    },
    {
        path: "/search",
        component: <Search />
    },
    {
        path: "/update",
        component: <Update />
    },
    {
        path: "/upload",
        component: <Upload />
    },
    {
        path: "/documentation",
        component: <Documentation />
    }
]

export default routes;