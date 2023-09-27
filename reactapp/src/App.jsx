
import React, { Component, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import SidebarMenu from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Customers from "./pages/customers/details";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <SidebarMenu isSidebar={isSidebar}  />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/users" element={<Users />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
