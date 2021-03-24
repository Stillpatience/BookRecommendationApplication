import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {RoutePaths} from "./RoutePaths";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useStyles} from "./styles";
import {Link} from "react-router-dom";



export const Register = () => {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleClicked = () => {
        setChecked(!checked);
    }

    const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
        ? <Link to={to} onClick={submit}>{children}</Link>
        : <>{children}</>;

    const submit = () => {
        Accounts.createUser({username: email, email: email, password: password});
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={({ target : {value}}) => setEmail(value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={({ target : {value}}) => setPassword(value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirm-password"
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                    />
                    <Checkbox
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onClick={handleClicked}
                    />
                    <Typography variant="body2" color="textSecondary"  display="inline">
                    I agree to the <Link to={RoutePaths.TERMS_AND_CONDITIONS}>terms & conditions </Link>
                    </Typography>
                    <ConditionalLink to={RoutePaths.SETUP} condition={checked}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign up
                        </Button>
                    </ConditionalLink>

                </form>
            </div>
        </Container>
    );
}