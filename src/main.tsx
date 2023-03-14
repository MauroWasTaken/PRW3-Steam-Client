import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Details from "./pages/details"
import NoPage from "./pages/nopage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"game"}>
                        <Route path={":id"} element={<Details />}/>
                    </Route>
                    <Route path={"*"} element={<NoPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container!);
root.render(<App/>);
