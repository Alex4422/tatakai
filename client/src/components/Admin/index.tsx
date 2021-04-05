import { makeStyles } from "@material-ui/core/styles";
import useFormValidation from "../../Hooks/useFormValidation";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useEffect, useState, useRef } from "react";


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

const types = ["Commune", "Rare", "Légendaire", "Unique"];

const Admin = ({ changeField, token, submitValue, changeFieldFile }: Props & AdminProps) => {
  const { validate, isValid } = useFormValidation();
  const classes = useStyles();
  const [file, setFile] = useState();

  const handleOnChange = (e: any) => changeField(e);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    let data: any = new FormData();
    data.append("file", file!);
    //console.log("file",file);
    for (var value of data.values()) {
      console.log(value);
   }
    submitValue(data);
  };
/*   useEffect(() => {
    validate(token);
  }, [validate, token]);
 */
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create new NFT
        </Typography>
        <form className={classes.form} onSubmit={handleOnSubmit}>
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
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                name="age"
                label="Age"
                type="text"
                id="age"
                autoComplete="Age"
                defaultValue={token.age || ""}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                name="nationalité"
                label="Nationalité"
                type="text"
                id="nationalité"
                autoComplete="Nationalité"
                defaultValue={token.nationalité || ""}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                name="saison"
                label="Saison"
                type="text"
                id="Saison"
                autoComplete="Saison"
                defaultValue={token.saison || ""}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                required
                name="type"
                label="Type"
                select
                id="Type"
                autoComplete="Type"
                defaultValue={token.type || "Commune"}
                onChange={handleOnChange}
              >
                {" "}
                {types.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
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
                onChange={(e:any) => setFile(e.target.files[0])}
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
                autoComplete="supply"
                defaultValue={token.supply || ""}
                onChange={handleOnChange}
              />
            </Grid>
          </Grid>
          {token.file ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <img src={token.file}></img>
              </Grid>
            </Grid>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //disabled={!isValid}
            className={classes.submit}
          >
            Create NFT
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Admin;