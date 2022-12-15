/*
import {Route, Routes, useLocation} from "react-router-dom";

const PrivateRoutes = ({ location }) => {
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="" element={<HomePage />} />
            {/!* new routes *!/}
            <Route path="stat" element={<StatPage />} />
            <Route path="hotels" element={<HotelsPage />} />
            <Route path="login" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

PrivateRoutes.propTypes = {
    location: PropTypes.object
};

const PublicRoutes = ({ location }) => {
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="login" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="login" replace />} />
        </Routes>
    );
};

PublicRoutes.propTypes = {
    location: PropTypes.object
};

const Root = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    const pageLoaded = usePageLoader();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            setUser(newUser);
            // if (!user && newUser) setUser(newUser);
            // else if (user && !newUser) setUser(newUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (!pageLoaded) {
        return <PageLoader />;
    }

    return (
        <AnimatePresence mode="wait">
            {user ? <PrivateRoutes location={location} /> : <PublicRoutes location={location} />}
        </AnimatePresence>
    );
};

export default Root;*/
