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
}));