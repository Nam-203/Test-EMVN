import DashBoardPage from "../page/DashBoardPage/DashBoardPage";
import HomePage from "../page/HomePage/HomePage";

 export const routes =[
    {
        path:"/",
        page:HomePage,
        isShowHeader:true,
        titleName:"Home"
        
    },
    {
        path:"/dashboard",
        page:DashBoardPage,
        isShowHeader:false,
        title:"dashboard"
    },
    // {
    //     path:"/trackPlay:id",
    //     page:TrackPlayPage,
    //     isShowHeader:false,
    //     title:"login"
    // }

]