import Login from "../pages/login/Login.jsx"
import Home from "../pages/home/Home.jsx"
import Cart from "../pages/cart/Cart.jsx"
import Setting from "../pages/setting/Setting.jsx"
import Orders from "../pages/order/Orders.jsx"
const publicNavigator = [
    {name: "login", component: Login},
    // {name:"home",component :Home,},

]

const privateNavigator =[
    {name:"home",component :Home,},
    {name:"cart",component :Cart},
    {name:"setting",component :Setting},
    {name:"orders",component :Orders},
]

export {publicNavigator,privateNavigator}