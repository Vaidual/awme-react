import React from 'react';
import {
    Alert,
    Box,
    Button,
    Checkbox, CircularProgress, FilledInput, FormControl,
    FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import * as yup from "yup";
import {Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {tokens} from "../../../theme";
import {login} from "../../../redux/auth/authSlice";
import {useDispatch} from "react-redux";

const defaultValues = {
    email: '',
    password: '',
};

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();

    const [showPassword, setShowPassword] = React.useState(false);
    const [loginError, setLoginError] = React.useState({show: false, error: null});
    const [isRequestFetching, setIsRequestFetching] = React.useState(false);

    const schema = yup.object().shape({
        email: yup.string().email(t('global.formErrors.onEmailError')).required(t('global.formErrors.onRequiredError')),
        password: yup.string().required(t('global.formErrors.onRequiredError')),
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleFormSubmit = (data) => {
        setIsRequestFetching(true);
        dispatch(login(data))
            .unwrap()
            .then(() => {
                setLoginError({error: null, show: false});
                navigate("/");
            })
            .catch((error) => {
                setLoginError({error: error.message, show: true})
            }).finally(function () {
            setIsRequestFetching(false);
            });
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
            if (isRequestFetching) setLoginError({error: null, show: false});
        })
    };

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mt={"50px"}>
            <Typography
                variant="h3"
                color={theme.palette.text.primary}
                fontWeight="bold"
                mb={'20px'}
            >{t('auth.login.title')}</Typography>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={defaultValues}
                validationSchema={schema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit
                  }) => (
                    <form style={{display: "inline-block"}} onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="20px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                            }}
                        >
                            {loginError.show &&
                                <Alert sx={{gridColumn: "span 4"}} severity="error">{loginError.error}</Alert>}
                            <TextField
                                variant="filled"
                                type="text"
                                label={t('auth.login.fields.email')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email ? errors.email : ' '}
                                sx={{gridColumn: "span 4"}}
                            />
                            <FormControl error={!!touched.password && !!errors.password} sx={{gridColumn: "span 4"}}
                                         variant="filled">
                                <InputLabel>{t('auth.login.fields.password')}</InputLabel>
                                <FilledInput
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end" sx={{marginRight: '10px'}}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText>{touched.password && errors.password ? errors.password : ' '}</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box display="flex" mt="6px" flexDirection={"column"}>
                            <Box display="flex" justifyContent={"space-between"} alignItems={"center"} my={'10px'}>
                                <FormControlLabel control={<Checkbox color={"secondary"} defaultChecked/>}
                                                  label={t('auth.buttons.rememberMe')}/>
                                <Link style={{color: theme.palette.secondary.main}}
                                      to={"forgot-password"}>
                                    {t('auth.login.buttons.ForgotThePassword')}</Link>
                            </Box>
                            <Button type="submit" color="secondary" variant="contained" fullWidth
                                    sx={{height: '44px', marginBottom: '10px'}}
                                    disabled={isRequestFetching}>
                                {!isRequestFetching ? <Typography>{t('auth.buttons.signIn')}</Typography> :
                                    <CircularProgress color={"secondary"} size={'30px'}/>}
                            </Button>
                            <Box display={"flex"} justifyContent={"center"}>
                                <Typography mr={'4px'} color={tokens(theme.palette.mode).text.grey}>
                                    {t('auth.login.dontHaveAccount')}
                                </Typography>
                                <Link style={{color: theme.palette.text.primary}}
                                      to={"/register"}>
                                    {t('auth.buttons.signUp')}</Link>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default Login;