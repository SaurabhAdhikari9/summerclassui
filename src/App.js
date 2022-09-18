import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard.jsx';
import Analytics from './pages/Analytics.jsx';
import Category from './pages/Category.jsx'
import Orders from './pages/Order.jsx';
import ProductList from './pages/ProductList.jsx';
import Staff from './pages/Staff';
function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/category" element={<Category />} />
          <Route path="/" element={<Analytics />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/productList" element={<ProductList />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
