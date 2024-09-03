import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import { Search } from "./pages/search.jsx";
import { SingleRoute } from "./pages/singleRoute.jsx";
import { CreateRoute } from "./pages/createRoute.jsx";
import { EditRoute } from "./pages/editeRoute2.jsx";
import { Profile } from "./pages/profile.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import { Navbarsearch } from "./component/navbar-search.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                <Navbarsearch />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Search />} path="/search" />
                        <Route element={<SingleRoute />} path="/route/:theid" />
                        <Route element={<CreateRoute />} path="/route/create" />
                        <Route element={<EditRoute />} path="/route/edit/:theid" /> 
                        <Route element={<Profile />} path="/user/:theid" />
                        <Route element={<ResetPassword />} path="/reset-password/:token" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);