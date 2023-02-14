import React from "react";

import{Route, Routes} from "react-router-dom";
import KakaoMap from "./MainPage/KakaoMap";


function UserRouter(){
    return (
        <Routes>
            <Route path="/" element={<KakaoMap/>}/>
        </Routes>
    )
}

export default UserRouter;