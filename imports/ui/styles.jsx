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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        flexGrow: 1,
    },
    header: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
        "background-color": 'rgb(98, 2, 238)',
        color: 'white',
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
    hr:{
        position:"relative",
        top:"-100px",
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
    }
}));