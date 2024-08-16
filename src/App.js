import Header from "./Components/header";
import Userdetails from "./Components/User-details";
import Users from "./Components/Users";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Header></Header> },
    { path: "/Home", element: <Header></Header> },
    {
      path: "/Users",
      element: <Users></Users>,
    },
    { path: "Users/:userId", element: <Userdetails></Userdetails> },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
