import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth();
  useEffect(()=>{
    navigate('/login')
  })
  
  
  return (
    <div className="text-2xl font-bold pt-14">home
    </div>
  );
};

export default Home;
