import React, {useEffect} from "react";
import './App.css';
import {Route, Routes, useNavigate, useSearchParams} from "react-router-dom";
import LoginContainer from "./components/Login/LoginContainer";
import ProfileContainer from "./components/Profile/MyProfile/MyProfile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializedThunkCreate} from "./redux/app-reducer";
import HomeContainer from "./components/Home/HomeContainer";
import RegisterContainer from "./components/Login/Registration/RegisterContainer";
import Footer from "./components/Footer/Footer";
import MyFontsContainer from "./components/Profile/MyProfile/MyFonts/MyFontsContainer";
import LikedContainer from "./components/Profile/MyProfile/Liked/LikedContainer";
import ProfileSettingsContainer from "./components/Profile/MyProfile/ProfileSettings/ProfileSettingsContainer";
import UploadFontsContainer from "./components/Profile/MyProfile/UploadFonts/UploadFontsContainer";
import ProfileInfoContainer from "./components/Profile/ProfileCurrentById/ProfileInfoContainer";
import FontContainer from "./components/FontPage/FontContainer";
import {Loading} from "./components/common/load/load";
import FontInfoContainer from "./components/FontPage/Info/FontInfoContainer";
import FontTesterContainer from "./components/FontPage/Tester/FontTesterContainer";
import Edit from "./components/Edit/Edit";

const App = (props) => {
    let new_query = Object.fromEntries([...useSearchParams()[0]]);
    const navigate = useNavigate();

    let updateQuery = (update_params, variant) => {
        new_query = {...new_query, ...update_params}
        let new_string = Object.entries(new_query)
            .map(c => {
                return c[0] + "=" + encodeURIComponent(c[1])
            })
            .join("&");
        switch (variant) {
            case "home":
                return navigate("/?" + new_string);
            case "liked":
                return navigate("/liked/?" + new_string);
            case "uploaded":
                return  navigate("/my_fonts/?" + new_string);
            default:
                return ""
        }
    }

    useEffect(() => {
        props.initializeApp()
    }, []);

    if (props.initialized) {
        return (
            <>
                <HeaderContainer updateQuery={updateQuery}/>
                <div className="content">
                <Routes>
                    <Route path="/" exact element={<HomeContainer updateQuery={updateQuery}/>}/>
                    <Route path="/login" element={<LoginContainer/>}/>
                    <Route path="/editor" element={<Edit/>}/>
                    <Route path="/registration" element={<RegisterContainer/>}/>
                    <Route path="/profile">
                        <Route path=":id_user" element={<ProfileInfoContainer/>}/>
                    </Route>
                    <Route path="/font">
                        <Route path=":id_font" element={
                            <>
                                <FontContainer/>
                                <FontInfoContainer/>
                            </>
                        }/>
                    </Route>
                    <Route path="/font_tester">
                        <Route path=":id_font" element={
                            <>
                                <FontContainer/>
                                <FontTesterContainer/>
                            </>
                        }/>
                    </Route>
                    <Route path="/panel_control" element={<ProfileContainer/>}/>
                    <Route path="/profile_settings" element={<ProfileSettingsContainer/>}/>
                    <Route path="/my_fonts" element={<MyFontsContainer updateQuery={updateQuery}/>}/>
                    <Route path="/liked" element={<LikedContainer updateQuery={updateQuery}/>}/>
                    <Route path="/fonts_upload" element={<UploadFontsContainer />}/>
                </Routes>
                </div>
                <Footer/>
            </>

        )
    } else return <><Loading/></>

}

const MapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
}

export default compose(
    connect(MapStateToProps, {initializeApp: initializedThunkCreate})
    (App));
