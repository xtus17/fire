import React from "react";
import { Index } from "./WebSite/Index";
import { NotFound } from "./WebSite/404";
import { Form } from "./WebSite/Form";
import { Routes, Route, useLocation } from "react-router-dom";
import { Term } from "./WebSite/Term";
import { Login } from "./panelsecurityeasysos/components/Account/Login";
import { Home } from "./panelsecurityeasysos/components/Home";
import { AuthProvider } from "./panelsecurityeasysos/context/authContext";
import { Register } from "./panelsecurityeasysos/components/Account/Register";
import { ProtectedRoute } from "./panelsecurityeasysos/components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <AuthProvider>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/form" element={<Form />} />
            <Route path="/term" element={<Term />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cpaneleasysosappsecurity" element={<Login />} />
            <Route
              path="/cpaneleasysosappsecurity/register"
              element={<Register />}
            />
            <Route
              path="/cpaneleasysosappsecurity/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </AnimatePresence>
    </>
  );
}

export default App;
