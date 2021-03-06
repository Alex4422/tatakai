import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useModal } from "../../hooks/useModal";
import SwapModal from "../../ui/SwapModal";
import {Avatar, Button, Divider, ListItemAvatar, ListItemText, ListItem, List, Typography, Link, Breadcrumbs, Container} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import logo from "../../assets/logo_fond_noir.svg";

import "../styles.css";


declare interface Props {
  accounts: Array<any> | null,
  cards: Array<any> | null,
  isAdmin: boolean,
  isNew: boolean,
  balanceTAK: any | null,
  balanceWei: any | null,
  isLoading: boolean,
  importTAKMetamaskWallet: Function,
  getBalances: Function,
  swapEthTak: Function,
  getTAK: Function,
  provider: any,
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '50%',
    align: 'center',
    margin: 'auto',
    backgroundColor: 'transparent',
    color: '#fff'
  },
  breadcrumbs: {
    color: 'gray',
    marginTop: '40px',
    marginBottom: '40px'
  },
  listItemText: {
    color:'#ABABAB',
    '& p': {
      color: '#fff'
    }
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      margin: '0 10px'
    }
  },
  logo: {
    width: "10px",
    verticalAlign: "-5%",
  }
}));

const Profile = ({ accounts, cards, isAdmin, balanceTAK, balanceWei,isLoading,getTAK, importTAKMetamaskWallet, getBalances, isNew, swapEthTak, provider }: Props) => {
  const classes = useStyles();
  const { handleOpen } = useModal();
  const networkVersion = provider!.networkVersion;
  const handleOnClickModal = () => {
    handleOpen();
  };


  useEffect(() => {
    getBalances()
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <div className="App">
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="secondary">My Profile</Typography>
      </Breadcrumbs>
        <SwapModal/>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} primary="Account" secondary={accounts ? accounts[0] : "Non account"} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} primary="NFTS" secondary={cards!.length >= 1 ? `Nombre de NFTS : ${cards!.length}`  : "None NFTS in your wallet"} />
          </ListItem>
          <Divider variant="inset" component="li" />
          
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} primary={networkVersion=="80001" ? "Balance Matic" : "Balance Wei"} secondary={balanceWei ? balanceWei : "Non account"} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceWalletOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} primary="Balance TAK" secondary={balanceTAK ? <>{balanceTAK} <img src={logo} className={classes.logo} alt="logo"></img></>  : "Non account"} />
          </ListItem>
          {isAdmin 
          ?<>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SupervisorAccountOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.listItemText} primary="Admin" secondary={"You're admin of the markeplace!"} />
            </ListItem>
          </>
          : null
          }
        </List>
        <br></br>
        <div className={classes.btnContainer}>
        { isAdmin 
        ?<>
        <Button variant="contained" color="secondary" onClick={() => getTAK()}>
        Send me TAK
        </Button>
       <br/>
       </>
        : <br/>
        }
        
       <Button variant="contained" color="secondary" onClick={handleOnClickModal}>
        Swap ETH/TAK
      </Button>

      {isNew 
      ?<Button variant="contained"  onClick={() => importTAKMetamaskWallet()}>
        Import Tak !
      </Button>
      : null
      }
      </div>
      
      </div>
    </Container>
  );
};

export default Profile;
