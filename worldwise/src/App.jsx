import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import {useEffect, useState} from "react";
import CountryList from "./components/CountryList.jsx";

const BASE_URL = 'http://localhost:8000';

function App() {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data)
            } catch {
                alert("Failed to fetch cities.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="app" element={<AppLayout/>}>
                    <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="form" element={<p>Form</p>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;