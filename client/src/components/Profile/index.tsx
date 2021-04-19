import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useModal } from "../../hooks/useModal";
import SwapModal from "../../ui/SwapModal";
import Container from "@material-ui/core/Container";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import "../styles.css";


declare interface Props {
  accounts: Array<any> | null,
  cards: Array<any> | null,
  isAdmin: boolean,
  isNew: boolean,
  balanceTAK: any | null,
  balanceWei: any | null,
  isLoading: boolean,
  getTAK: Function,
  importTAKMetamaskWallet: Function,
  getBalances: Function,
  swapEthTak: Function,
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
  }
}));

const Profile = ({ accounts, cards, isAdmin, balanceTAK, balanceWei,isLoading, getTAK, importTAKMetamaskWallet, getBalances, isNew, swapEthTak }: Props) => {
  const classes = useStyles();
  const { handleOpen } = useModal();
  
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
            <ListItemText className={classes.listItemText} primary="NFTS" secondary={cards!.length >= 1 ? `Nombre de NFTS : ${cards!.length}`  : "Pas de NFTS dans votre protefeuille !"} />
          </ListItem>
          <Divider variant="inset" component="li" />
          
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} primary="Balance Wei" secondary={balanceWei ? balanceWei : "Non account"} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceWalletOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} primary="Balance TAK" secondary={balanceTAK ? balanceTAK : "Non account"} />
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
      ?<Button variant="contained"  onClick={() => importTAKMetamaskWallet()} style={{display: "block", margin: "1rem auto"}}>
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
