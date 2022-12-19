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
import {Link} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {authAPI} from "../../../api/api";
import {useTranslation} from "react-i18next";
import {tokens} from "../../../theme";
import {setIsAuthorized} from "../../../redux/slices/authSlice";
import {useDispatch} from "react-redux";

const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
};

function Register() {
    const {t} = useTranslation();

    const schema = yup.object().shape({
        firstName: yup.string().required(t('global.formErrors.onRequiredError')),
        lastName: yup.string().required(t('global.formErrors.onRequiredError')),
        email: yup.string().email(t('global.formErrors.onEmailError')).required(t('global.formErrors.onRequiredError')),
        password: yup.string().min(8, t('global.formErrors.onMinLengthError', {count: 8})).required(t('global.formErrors.onRequiredError')),
        repeatPassword: yup.string().required(t('global.formErrors.onRequiredError')).oneOf([yup.ref('password')], t('global.formErrors.onPasswordMatchError')),
    });

    const dispatch = useDispatch();

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();

    const [showPassword, setShowPassword] = React.useState(false);

    const [registerError, setRegisterError] = React.useState({show: false, error: null});
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [isRequestFetching, setIsRequestFetching] = React.useState(false);
    const handleFormSubmit = (values) => {
        setIsRequestFetching(true);

        const {repeatPassword, ...data} = values
        authAPI.register(data).then(value => {
            dispatch(setIsAuthorized(true));
            console.log(value);
        }).catch(function (error) {
            setRegisterError({error: error.response ? error.response.data : error.message, show: true})
        }).finally(function () {
            setIsRequestFetching(false);
        });
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
            if (isRequestFetching) setRegisterError({error: null, show: false});
        })
    };

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mt={"50px"}>
            <Typography
                variant="h3"
                color={theme.palette.text.primary}
                fontWeight="bold"
                mb={'20px'}
            >{t('auth.register.title')}</Typography>
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
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                            }}
                        >
                            {registerError.show &&
                                <Alert sx={{gridColumn: "span 4"}} severity="error">{registerError.error}</Alert>}
                            <TextField
                                variant="filled"
                                type="text"
                                label={t('auth.register.fields.firstName')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName ? errors.firstName : ' '}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                variant="filled"
                                type="text"
                                label={t('auth.register.fields.lastName')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName ? errors.lastName : ' '}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                variant="filled"
                                type="text"
                                label={t('auth.register.fields.email')}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email ? errors.email : ' '}
                                sx={{gridColumn: "span 4"}}
                            />
                            <FormControl error={!!touched.password && !!errors.password} sx={{gridColumn: "span 4"}}
                                         variant="filled">
                                <InputLabel>{t('auth.register.fields.password')}</InputLabel>
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
                                <FormHelperText>{touched.password ? errors.password : ' '}</FormHelperText>
                            </FormControl>
                            <FormControl error={!!touched.repeatPassword && !!errors.repeatPassword}
                                         sx={{gridColumn: "span 4"}} variant="filled">
                                <InputLabel>{t('auth.register.fields.repeatPassword')}</InputLabel>
                                <FilledInput
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.repeatPassword}
                                    name="repeatPassword"
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
                                <FormHelperText>{touched.repeatPassword ? errors.repeatPassword : ' '}</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box display="flex" mt="6px" flexDirection={"column"}>
                            <Box display="flex" justifyContent={"space-between"} alignItems={"center"} my={'10px'}>
                                <FormControlLabel control={<Checkbox color={"secondary"} defaultChecked/>}
                                                  label={t('auth.buttons.rememberMe')}/>
                            </Box>
                            <Button type="submit" color="secondary" variant="contained" fullWidth sx={{height: '44px', marginBottom: '10px'}}
                                    disabled={isRequestFetching}>
                                {!isRequestFetching ? t('auth.buttons.signUp') : <CircularProgress color={"secondary"} size={'30px'}/>}
                            </Button>
                            <Box display={"flex"} justifyContent={"center"}>
                                <Typography mr={'4px'} color={tokens(theme.palette.mode).text.grey}>
                                    {t('auth.register.alreadyHaveAccount')}
                                </Typography>
                                <Link style={{color: theme.palette.text.primary}}
                                      to={"/login"}>
                                    {t('auth.buttons.signIn')}</Link>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default Register;