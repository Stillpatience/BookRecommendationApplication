import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    flex_display: {
        display: "flex",
    },
    book_card:{
        "background-color": 'white',
        margin: "0rem 2rem 0rem 0rem",
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    header: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
        "background-color": 'rgb(98, 2, 238)',
        color: 'white',
    },

    bottom_fixed: {
        position: "fixed",
        bottom: "0px",
        width: "100%",
    },

    root: {
        flexGrow: 1,
    },

    explanation: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    stars:{
        position:"relative",
        top:"-10px",
    },
    rating:{
        position:"relative",
        top:"-50px",
        left:"140px",
    },
    "right-element":{
        position:"relative",
        top:"-15px",
        left:"100px",
    },
    center: {
        display: "block",
        "margin-left": "auto",
        "margin-right": "auto",
        width: "50%",
    },
    formControl: {
        margin: 'auto',
    },
}));