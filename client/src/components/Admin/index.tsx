import { useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";

type Props = IContractAction & IContractState;
type AdminProps = IAdminState & IAdminAction;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Admin = ({
  changeField,
  newInstance,
  token,
  contract,
}: Props & AdminProps) => {
  const classes = useStyles();
  const handleOnChange = (e: any) => changeField(e);
  const fetchContract = useCallback(() => {
    newInstance();
  }, [newInstance]);
  useEffect(() => {
    console.log("New Instance...");
    !contract && fetchContract();
  }, [fetchContract]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create new NFT
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Token's name"
                name="tokenName"
                autoComplete="email"
                defaultValue={token.tokenName || ""}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                multiline
                rows={3}
                autoComplete="description"
                defaultValue={token.description || ""}
                onChange={handleOnChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              {/* <InputLabel shrink htmlFor="bootstrap-input">
                File Upload
              </InputLabel> */}
              <TextField
                variant="filled"
                required
                fullWidth
                id="file"
                type="file"
                label="File upload"
                name="file"
                InputLabelProps={{ shrink: true }}
                defaultValue={token.file || ""}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="supply"
                type="number"
                label="Supply"
                name="supply"
                autoComplete="lname"
                defaultValue={token.supply || ""}
                onChange={handleOnChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Admin
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Admin;
