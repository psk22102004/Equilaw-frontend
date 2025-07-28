// App.jsx
import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import Signup from "./Signup";
import Chatbot from "./Chatbot";
import DocGenerate from "./DocGenerate";
import NoSidebarLayout from "./layouts/NoSidebarLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import { AddCaseForm } from "./AddCaseForm";
import CaseChat from "./CaseChat";
import Hearings from "./HookWalaForm";
import HearingForm from "./HearingForm";
import CaseDetails3 from "./CaseDetails3";
import Dashboard3 from "./Dashboard3";
import VectorCaseSearch from "./VectorCaseSearch";
import ViewAll from "./ViewAll";
import ViewAllc from "./ViewAllc";
import Navbar from "./HomePage Components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";
import { LoadingProvider } from "../contexts/LoadingContext";
const App = () => {
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NoSidebarLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "login",
          element: <Login />, // Here after login navigate to /user/:id
        },
        {
          path: "signup",
          element: <Signup />, // Here after signup navigate to /user/:id
        },
      ],
    },
    {
      path: "/user",
      element: <SidebarLayout />,

      children: [
        {
          index: true,
          element: <Dashboard3 />,
        },
        {
          path: "home",
          element: <Dashboard3 />,
        },
        {
          path: "AI",
          element: <Chatbot />,
        },
        {
          path: "Doc",
          element: <DocGenerate />,
        },
        {
          path: "addCase",
          element: <AddCaseForm />,
        },
        {
          path: ":caseId",
          element: <CaseDetails3 />,
        },
        {
          path: ":caseId/caseChat",
          element: <CaseChat />,
        },
        {
          path: "vectorSearch",

          element: <VectorCaseSearch />,
        },
        {
          path: "viewAllopen",
          element: <ViewAll />,
        },
      ],
    },
  ]);

  return (
    <LoadingProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LoadingProvider>
  );
};

export default App;
