import { useNavigate } from "react-router-dom";
import "./match.scss"
const NextMatch = ({nameClub1,nameClub2,logo1,logo2,date,name,tournamentName,time}) => {
  const navigate = useNavigate()
    return <div className="nextMatch">
      <h3>{date}</h3>
      <p>{tournamentName}</p>
      <div className="wrap-club">
        <div className="club">
            <img src={logo1} />
            <p>{nameClub1}</p>
        </div>
        <div className="time">
         {time}
      <p>   GMT</p>
        </div>
        <div className="club">
            <img src={logo2} />
            <p>{nameClub2}</p>
        </div>
       
      </div>
      <div className="wrap-button">
            <button onClick={() => navigate("/ticket")} className="buy">Mua vé</button>
        </div>
    </div>
}
export default NextMatch;