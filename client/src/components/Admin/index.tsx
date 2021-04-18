import { makeStyles } from "@material-ui/core/styles";
import useFormValidation from "../../hooks/useFormValidation";
import UploadService from "../../services/file-upload.service";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState, useRef } from "react";

declare interface Props {
  changeField: Function;
  nft: any;
  isLoading: boolean;
  isFullfilled: boolean;
  buyNFT: Function;
  changeFieldFile: Function;
  submitValue: Function;
}
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '70%'
  },
  breadcrumbs: {
    color: 'gray',
    marginLeft: '80px',
    marginTop: '40px',
    marginBottom: '40px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: '30px auto',
  },
  preview: {
    width: "100%",
  },
  input: {
    "& .MuiInputLabel-outlined": {
      color: "#fff"
    },
    "& .MuiSelect-select.MuiSelect-select": {
      color: "#fff"
    },
    "& .MuiFilledInput-input": {
      color: "#fff"
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff"
    }
  }
}));

const types = ["COMMON", "RARE", "LEGEND", "UNIQUE"];

const Admin = ({
  changeField,
  nft,
  submitValue,
  changeFieldFile,
  isLoading,
  isFullfilled,
  history,
}: Props & { history: any }) => {
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

  //TODO fix!
    /* useEffect(() => {
      console.log("isLoading", isLoading);
      isFullfilled && history.push("/marketplace");
    }, [isLoading]); */

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
    validate(token);
  }, [validate, token]);
 */
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="secondary">Create a new NFT</Typography>
        </Breadcrumbs>
      <div className={classes.paper}>
        {isLoading ? (
          <CircularProgress size="75px" style={{ color: "black" }} />
        ) : (
          <form className={classes.form} onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="email"
                  defaultValue={nft.name || ""}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.input}
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
                  className={classes.input}
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
                  className={classes.input}
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
                  className={classes.input}
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
                  className={classes.input}
                  variant="outlined"
                  required
                  fullWidth
                  id="price"
                  type="number"
                  label="Price in TAK"
                  name="price"
                  autoComplete="price"
                  defaultValue={nft.price || ""}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  {/* <InputLabel shrink htmlFor="bootstrap-input">
                File Upload
              </InputLabel> */}
                  <TextField
                  className={classes.input}
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
              <Grid xs={12} spacing={2}>
                {preview.image && (
                  <div style={{ marginTop: 15 }}>
                    <img
                      className="preview"
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
                color="secondary"
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
