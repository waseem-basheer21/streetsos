import './App.css'
import AllRoutes from './routes/AllRoutes'
import { Provider } from "react-redux";
import store from "./redux/store"; 
function App() {
  

  return (
    <>
    <Provider store={store}>
  <AllRoutes/>
  </Provider>
    </>
  )
}

export default App
