import { useEffect } from "react";
import { initializeCars } from "./features/cars/carSlice";
import { useAppDispatch } from "./hooks";
import CarList from "./components/CarList";
import Navbar from "./components/์Navbar";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { checkAuth } from "./features/auths/authSlice";
import RequireAuth from "./components/RequireAuth";
import FinishedCars from "./components/FinishedCars";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeCars());
  },[dispatch])

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<FinishedCars />} />
        <Route path="/carlist" element={
          <RequireAuth>
            <CarList />
          </RequireAuth> 
            }
          />
        <Route path="/login" element={<LoginForm />}/>
      </Routes>
    </div>
  )
}

export default App;