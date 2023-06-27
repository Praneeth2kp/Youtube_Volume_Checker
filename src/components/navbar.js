import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import "./navbar.css";
import learnova from './asserts/Learnova.svg'
import Quizze from './asserts/Quizzes.svg'
import flashcard from './asserts/Flashcards.svg'
import space from './asserts/space.svg'
import nava from './asserts/nava.svg'


function Navbar() {
  return (
    <div className="row"> 
      <div className="col">
        <div className="nav-box">
        <div className="nav-box-heading">
           <p><img className="px-1 " src={learnova} alt="" />Learnova</p>
        </div>
        
      <div className="nav-box-1">
        <Link className="link d-block" ><img className="px-1 " src={space} alt="" />Space</Link>
        <Link className="link d-block" to="/space"><img className="px-1" src={flashcard} alt="" />Flashcards</Link>
        <Link className="link d-block" to=""><img className="px-1" src={Quizze} alt="" />Quizzes</Link>
        <Link className="link d-block" to=""><img className="px-1" src={nava} alt="" />Nava AI</Link>
      </div>
       </div>
    </div>

    </div>
    
  );
}

export default Navbar;
