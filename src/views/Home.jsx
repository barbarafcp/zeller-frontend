import "../styles/Home.css";
import carImage from '../assets/car.png'
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src={carImage} alt="Car" className="car-img" />
      <h1 className="title">Bienvenido</h1>
      <h2 className="subtitle">a un mini mini MINI zeller</h2>
      <button className="custom-button" onClick={() => navigate("/chats")}>Empecemos</button>
    </div>
  );
}

