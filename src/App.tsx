import { useEffect } from "react";
import { initializeCars } from "./features/cars/carSlice";
import { useAppDispatch } from "./hooks";
import CarList from "./components/CarList";
import CarForm from "./components/CarForm";
import Navbar from "./components/์Navbar";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeCars());
  },[dispatch])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<CarList />}/>
        <Route path="/create" element={<CarForm />}/>
        <Route path="/edit/:id" element={<CarForm />}/>
      </Routes>
    </div>
  )
}

export default App;