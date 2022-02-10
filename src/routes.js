import Auth from "./pages/Auth"
import Shop from "./pages/Shop"
import MyProxy from "./pages/MyProxy"
import Payments from "./pages/Payments"
import MainPage from "./pages/MainPage"
import News from "./pages/News"
import FAQ from "./pages/FAQ"
import SuccesRegistration from "./pages/SuccesRegistration"
import { SUCCES_REGISTRATION, MAIN_PAGE, FAQ_LINK, REGISTRATION, LOGIN, SHOP_ROUTE, NEWS, MY_PROXY, PAYMENTS} from "./utils/const"


export const authRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop/>
    },
    {
        path: MY_PROXY,
        Component: <MyProxy/>   
    },
    {
        path: PAYMENTS,
        Component: <Payments/>   
    },
]

export const publicRoutes = [
    {
        path: MAIN_PAGE,
        Component: <MainPage/>
    },
    {
        path: FAQ_LINK ,
        Component: <FAQ/>
    },
    {
        path: REGISTRATION ,
        Component: <Auth/>
    },
    {
        path: LOGIN ,
        Component: <Auth/>
    },
    {
        path: NEWS,
        Component: <News/>
    },
    {
        path: SUCCES_REGISTRATION,
        Component: <SuccesRegistration/>
    }
]