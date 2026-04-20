"use client";

import React, {useEffect} from "react";
import Navbar from "../components/Navbar";

const Dashboard = () =>{

      useEffect(() => {
        const checkAuth = async () => {
          try {
            const res = await fetch("http://localhost:5000/api/dashboard", {
              method: "GET",
              credentials: "include"
            });
    
            const data = await res.json();
    
            if (!data.success) {
              window.location.href = "/";
            }
          } catch (err) {
            window.location.href = "/";
          }
        };
    
        checkAuth();
      }, []);

    return(
        <>
        <Navbar />
        <section>
            hello
        </section>
        </>
    )
}

export default Dashboard;