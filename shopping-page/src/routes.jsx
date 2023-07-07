import Home from "./components/Home/Home"
import Dashboard from "./components/Dashboard/Dashboard"
import AboutUs from "./components/AboutUs/AboutUs"
import MainProduct from "./components/MainProduct/MainProduct"
import NotFound from "./components/NotFound/NotFound"

const routes = [
    {path:"/",element:<Home/>},
    {path:"/dashboard",element:<Dashboard/>},
    {path:"/aboutus",element:<AboutUs/>},
    {path:"/product/:id",element:<MainProduct/>},
    {path:"*",element:<NotFound/>},
]

export default routes