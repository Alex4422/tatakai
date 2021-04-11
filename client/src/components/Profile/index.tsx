import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
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
  isAdmin: Boolean,
  balanceTAK: any | null,
  balanceWei: any | null,
  isLoading: Boolean,
  getTAK: Function,
  importTAKMetamaskWallet: Function,
  getBalances: Function,
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '50%',
    align: 'center',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Profile = ({ accounts, cards, isAdmin, balanceTAK, balanceWei,isLoading, getTAK, importTAKMetamaskWallet, getBalances }: Props) => {
  const classes = useStyles();
  
  useEffect(() => {
    getBalances()
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <div className="App">
        <h1>My Profile </h1>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Account" secondary={accounts ? accounts[0] : "Non account"} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="NFTS" secondary={cards!.length >= 1 ? `Nombre de NFTS : ${cards!.length}`  : "Pas de NFTS dans votre protefeuille !"} />
          </ListItem>
          <Divider variant="inset" component="li" />
          
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Balance Wei" secondary={balanceWei ? balanceWei : "Non account"} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceWalletOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Balance TAK" secondary={balanceTAK ? balanceTAK : "Non account"} />
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
              <ListItemText primary="Admin" secondary={"You're admin of the markeplace!"} />
            </ListItem>
          </>
          : null
          }
        </List>
        <Button variant="contained" color="secondary" onClick={() => getTAK()}>
        Get TAK !
      </Button><br></br>
      <Button variant="contained"  onClick={() => importTAKMetamaskWallet()} style={{display: "block", margin: "1rem auto"}}>
        Import Tak !
      </Button>
      </div>
    </Container>
  );
};

export default Profile;
