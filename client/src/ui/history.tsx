import {useState} from "react"
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment'
import "./history.css"

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
          <p>{moment(new Date(history[page].date*1000)).locale('fr').format('LLL')}</p>
          <p>{history[page].oldOwner}</p>
          <p>{history[page].newOwner}</p>
          <p>{history[page].price}</p>
        </>
      }
      <div className="footer">
      {page!==0
      ? <ArrowBackIosIcon color="secondary" onClick={() => setPage(page-1)}/>
      : <ArrowBackIosIcon color="secondary" style={{visibility: "hidden"}}/>
      }
      <CancelIcon onClick={handleOnClick} style={{color: "white"}}></CancelIcon>
      {page<history.length-1
      ? <ArrowForwardIosIcon color="secondary" onClick={() => setPage(page+1)}/>
      : <ArrowForwardIosIcon color="secondary" style={{visibility: "hidden"}}/>
      }
      </div>
    </div>
    
  );
};

export default History;
