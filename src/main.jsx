import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import Modal from 'react-modal';
Modal.setAppElement('#root');

import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// Create a client
const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={Routes}></RouterProvider>
      <Toaster/>
    </AuthProvider>
     </QueryClientProvider>
  </React.StrictMode>
);
