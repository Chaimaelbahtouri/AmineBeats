import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import AdminSongCard from './components/AdminSongCard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './components/Search';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from "./pages/Dashboard";
import FavoritesPage from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import PlaylistPage from './pages/PlaylistPage';
import SongPage from './pages/SongPage';
import Songs from "./pages/Songs";

function App() {
  return (
    <div className="app">
        <Navbar/>
        <Routes>
          <Route
          path='/'
          element={<Home/>}
          />
          <Route
            path="/playlistPage"
            element={
            <PlaylistPage />}
        />
          <Route
            path='/login'
            element={<Login/>}/>
          <Route 
            path="/favorites"
            element={<FavoritesPage />}
          />
          <Route 
            path="/song/:id" 
            element={<SongPage />} 
          />
          <Route path="/search" element={<Search />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="songs" element={<Songs />}/>
            <Route path="AdminSongCard" element={<AdminSongCard />}/>
          </Route>
        </Routes>
        <Footer/>
    </div>

  );
}

export default App;
