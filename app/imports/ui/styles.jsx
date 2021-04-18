import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({

    //Login & register screen
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

    //Setup screen
    center: {
        display: "block",
        "margin-left": "auto",
        "margin-right": "auto",
        width: "50%",
    },

    header: {
        padding: theme.spacing(2),
        margin: 'auto',
    },

    // Book list pages
    books_container: {
        display: "flex",
        "flex-wrap": "wrap",
        padding: 0,
        "flex-direction":"row",
    },

    books_item: {
        padding: "5px 2px 5px 0",
        "overflow-wrap": "anywhere",
        "overflow":"hidden",
        "text-overflow": "ellipsis",
    },

    bottom_fixed: {
        position: "fixed",
        bottom: "0px",
        width: "95%",
    },


    word_wrap: {
        "overflow-wrap": "anywhere",
        "overflow":"hidden",
        "flex-grow": 0,
        "width": "98px",
        padding: "0px 0px 20px 0",
        "text-overflow": "ellipsis",
    },

    //Book details
    right: {
        "margin-left": "auto",
        "margin-right": 0,
    },

    left:{
        "margin-left": 0,
        "margin-right": "auto",
        "display": "flex",
    },

    flex_header: {
        "display": "flex",
        "margin": "auto",
    },

    //Initialization page
    fixed_header: {
        padding: theme.spacing(2),
        margin: 'auto',
        position: "fixed",
        top: "0px",
        width: 0.85 * window.innerWidth,
    },

}));