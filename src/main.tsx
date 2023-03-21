import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Details from "./pages/details"
import NoPage from "./pages/nopage";
import Login from "./pages/login";
import User from "./models/user";

export default function App() {
    const [token, setToken] = useState<User>();

    if (!token) {
        return <Login setToken={setToken}/>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"game"}>
                        <Route path={":id"} element={<Details />}/>
                    </Route>
                    <Route path={"login"} element={<Login />}/>
                    <Route path={"*"} element={<NoPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container!);
root.render(<App/>);
