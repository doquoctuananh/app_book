import Login from "../pages/login/Login.jsx"
import Home from "../pages/home/Home.jsx"
import Cart from "../pages/cart/Cart.jsx"
const publicNavigator = [
    {name: "login", component: Login},
    // {name:"home",component :Home,},

]

const privateNavigator =[
    {name:"home",component :Home,},
    {name:"cart",component :Cart},
]

export {publicNavigator,privateNavigator}