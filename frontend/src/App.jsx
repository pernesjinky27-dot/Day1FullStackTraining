import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Hero from "./pages/Hero.jsx";
import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Team from "./pages/Team.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Footer from "./components/Footer.jsx";
import Profile from "./pages/Profile.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { PrivateRoute } from "./context/PrivateRoute.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/team" element={<Team />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
