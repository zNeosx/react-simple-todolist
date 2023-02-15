import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import ErrorUrlPage from "./pages/ErrorUrlPage";
import Home, { loader as homeLoader, action as homeAction } from "./pages/Home";
import Layout from "./pages/Layout.jsx";

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorUrlPage />}>
      <Route index element={<Home />} loader={homeLoader} action={homeAction} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
