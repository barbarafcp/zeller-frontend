import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src="/assets/car.png" alt="Car" className="car-img" />
      <h1 className="title">Bienvenido</h1>
      <h2 className="subtitle">a mi postulación con zellercito</h2>
      <button className="custom-button" onClick={() => navigate("/chats")}>Empecemos</button>
    </div>
  );
}

