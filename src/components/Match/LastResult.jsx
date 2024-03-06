import "./match.scss";
const LastResult = ({
  nameClub1,
  nameClub2,
  date,
  name,
  tournamentName,
  num1,
  num2,
}) => {
  return (
    <div className="lastResult">
      <h3>{date}</h3>
      <p>{tournamentName}</p>
      <div className="wrap-num">
        
        <div className="num">
            <p className="name">{nameClub1}</p>
            <p className="number">{num1}</p>
        </div>
        <div className="num">
       
           <p className="number">{num2}</p>
           <p className="name">{nameClub2}</p>
        </div>
      </div>
      
        <button className="report">Match Report</button>
      
    </div>
  );
};
export default LastResult;
