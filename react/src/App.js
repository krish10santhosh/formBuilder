import React from "react";
import { Box, CssBaseline, StyledEngineProvider } from '@mui/material';
import Dashboard from './mainContainer/dashboard';
import NavBarComponent from './shared/components/material_navbar/navbar';
import { useLocation } from "react-router-dom";
import './App.css';
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Box>
            {/* {location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/resetpassword' ? null : <NavBarComponent />} */}
            <NavBarComponent />
            <Dashboard />
          </Box>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
