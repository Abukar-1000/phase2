import React from 'react';
import './App.css';
import Navbar from './Assets/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./Styles/core";
import Footer from './Assets/Footer';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router";
import routes from './routes';
import config from './Styles/config';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Navbar />
              <Container 
                maxWidth="xl"
                sx={{ 
                  minHeight: "95dvh",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column"
                }}  
              >

                  <Routes>
                    {
                      routes.map(route => <Route path={route.path} element={route.component}/>)
                    }
                  </Routes>

              </Container>
            <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
