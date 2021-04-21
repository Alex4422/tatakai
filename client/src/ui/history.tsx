import CancelIcon from '@material-ui/icons/Cancel';
import "./history.css"
interface Props {
  history: any;
  setShowHistory: any;
}

const History = ({ history, setShowHistory }: Props) => {
  const handleOnClick = () => {
    setShowHistory(false);
  };
  return (
    <div className="modalHistory">
      <p className="historyPoint">Lorem ipsum dolor sit ame</p>
      <CancelIcon onClick={handleOnClick} style={{color: "white", display: "block", margin:"0 auto"}}></CancelIcon>
    </div>
    
  );
};

export default History;
