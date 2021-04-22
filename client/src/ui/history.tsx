import {useState} from "react"
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';
import "./history.css";
import logo from "../assets/logo_fond_noir.svg";

interface Props {
  history: any;
  setShowHistory: any;
}

const History = ({ history, setShowHistory }: Props) => {
  const handleOnClick = () => {
    setShowHistory(false);
  };
  const [page, setPage] = useState(history.length-1)
  
  return (
    <div className="modalHistory">
      {
         <>
          <h2>History</h2>
          <p><span className="modalHistory__list">Date :</span> {moment(new Date(history[page].date*1000)).locale('fr').format('LLL')}</p>
          <p><span className="modalHistory__list">Old owner :</span> {history[page].oldOwner}</p>
          <p><span className="modalHistory__list">New Older :</span> {history[page].newOwner}</p>
          <p><span className="modalHistory__list">Price : </span> {history[page].price} <img src={logo} className="modalHistory__logo" alt="logo"></img></p>
        </>
      }
      <div className="footer">
      {page!==0
      ? <ArrowBackIosIcon color="secondary" onClick={() => setPage(page-1)} className="arrow"/>
      : <ArrowBackIosIcon color="secondary" style={{visibility: "hidden"}}/>
      }
      <CancelIcon onClick={handleOnClick} style={{color: "white"}} className="arrow"></CancelIcon>
      {page<history.length-1
      ? <ArrowForwardIosIcon color="secondary" onClick={() => setPage(page+1)} className="arrow"/>
      : <ArrowForwardIosIcon color="secondary" style={{visibility: "hidden"}}/>
      }
      </div>
    </div>
    
  );
};

export default History;
