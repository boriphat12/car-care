import { useEffect } from "react";
import { initializeCars } from "./features/cars/carSlice";
import { useAppDispatch } from "./hooks";
import CarList from "./components/CarList";
import CarForm from "./components/CarForm";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeCars());
  },[dispatch])

  return (
    <div>
      <CarList />
      <CarForm />
    </div>
  )
}

export default App;