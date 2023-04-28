import React, { useContext, useEffect, createContext, useState } from "react";
import theme from "./theme.js";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer.js";
import Movies from "./pages/Movies.js";
import Series from "./pages/Series.js";
import Home from "./pages/Home.js";
import LoginForm from "./pages/LoginForm.js";
import SignUpForm from "./pages/SignUpForm.js";
import SearchResults from "./pages/SearchResults.js";
import { ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { APIContextProvider } from "./context/APIContext.js";
import { AppbarContextProvider } from "./context/AppbarContext.js";
import { UserContext } from "./context/UserContext.js";
import { UserListProvider } from "./context/UserListContext.js";
import { EmailContextProvider } from "./context/EmailContext.js";
import MyList from "./pages/MyList.js";
import Landing from "./pages/Landing.js";
import SendEmail from "./pages/SendEmail.js";
import InputOtp from "./pages/InputOtp.js";
import { ResetPassword } from "./pages/ResetPassword.js";

const App = () => {
  const { isUserLoggedIn, setIsUserLoggedIn, userData, setUserData } =
    useContext(UserContext);
  let user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
      setUserData(JSON.parse(user));
    } else {
      setIsUserLoggedIn(false);
      navigate("/login");
    }
  }, [user]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <APIContextProvider>
          <UserListProvider>
            <AppbarContextProvider>
              <EmailContextProvider>
                {isUserLoggedIn ? (
                  <React.Fragment>
                    <Appbar />
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/movies" element={<Movies />} />
                      <Route path="/series" element={<Series />} />
                      <Route path="/list" element={<MyList />} />
                      <Route path="/search" element={<SearchResults />} />
                    </Routes>
                  </React.Fragment>
                ) : (
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/send-otp" element={<SendEmail />} />
                    <Route path="/type-otp" element={<InputOtp />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                  </Routes>
                )}
                <Footer />
              </EmailContextProvider>
            </AppbarContextProvider>
          </UserListProvider>
        </APIContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
