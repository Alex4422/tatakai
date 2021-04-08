import { makeStyles } from "@material-ui/core/styles";
import useFormValidation from "../../hooks/useFormValidation";
import UploadService from "../../services/file-upload.service";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  preview: {
    width: "100%",
  },
}));

const types = ["COMMON", "RARE", "LEGEND", "UNIQUE"];

const Admin = ({
  changeField,
  nft,
  submitValue,
  changeFieldFile,
  isLoading,
}: Props & AdminProps) => {
  const { validate, isValid } = useFormValidation();
  const classes = useStyles();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState({
    image: "",
    progress: 0,
    imageInfos: [],
  });

  const handleOnChange = (e: any) => changeField(e);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    let data: any = new FormData();
    data.append("file", file!);
    submitValue(data);
  };

  useEffect(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);

  const selectFile = (event: any) => {
    setFile(event.target.files[0]);
    setPreview({
      ...preview,
      image: URL.createObjectURL(event.target.files[0]),
      progress: 0,
    });
  };

  /*   

    useEffect(() => {
    //console.log("file",file);
    for (var value of data.values()) {
      console.log(value);
    }
    submitValue(data);
  };
  useEffect(() => {
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
        {isLoading ? (
          <CircularProgress size="75px" style={{ color: "black" }} />
        ) : (
          <form className={classes.form} onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="email"
                  defaultValue={nft.name || ""}
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
                  defaultValue={nft.age || ""}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  required
                  name="nationality"
                  label="Nationality"
                  type="text"
                  id="nationality"
                  autoComplete="Nationality"
                  defaultValue={nft.nationality || ""}
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
                  id="saison"
                  autoComplete="saison"
                  defaultValue={nft.saison || ""}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  variant="outlined"
                  required
                  name="type"
                  label="Type"
                  select
                  id="type"
                  autoComplete="Type"
                  defaultValue={nft.type || "COMMON"}
                  onChange={handleOnChange}
                  style={{ width: "100%" }}
                >
                  {" "}
                  {types.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="supply"
                  type="number"
                  label="Supply"
                  name="supply"
                  autoComplete="supply"
                  defaultValue={nft.supply || ""}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
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
                    defaultValue={nft.file || ""}
                    onChange={selectFile}
                  />
                </Grid>
              </Grid>
              {nft.file ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <img src={nft.file}></img>
                  </Grid>
                </Grid>
              ) : null}
              <Grid xs={4} spacing={2}>
                {preview.image && (
                  <div style={{ marginTop: 15 }}>
                    <img
                      className="preview"
                      style={{ width: "100%" }}
                      src={preview.image}
                      alt=""
                    />
                  </div>
                )}
              </Grid>
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
            </Grid>
          </form>
        )}
      </div>
    </Container>
  );
};
export default Admin;
