import { useEffect } from "react";
import { initializeCars } from "./features/cars/carSlice";
import { useAppDispatch } from "./hooks";
import CarList from "./components/CarList";
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
      </Routes>
    </div>
  )
}

export default App;