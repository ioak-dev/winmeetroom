import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getSessionValue, removeSessionValue, setSessionValue } from '../../utils/SessionUtils';
import { sendMessage } from '../../events/MessageService';
import { addAuth } from '../../store/actions/AuthActions';
import { httpGet, httpPost } from '../Lib/RestTemplate';

interface Props {
    middleware: string[];
    redirectPath?: string;
    children?: any;
    component?: any;
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || '';

const ProtectedRouteApp = (props: Props) => {
    const authorization = useSelector((state: any) => state.authorization);
    const profile = useSelector((state: any) => state.profile);
    const dispatch: any = useDispatch();
    const params = useParams();
    const navigate: any = useNavigate();

    const applyMiddlewares = () => {
        props.middleware?.forEach((middlewareName) => {
            if (!applyMidleware(middlewareName)) {
                return false;
            }
        });
        return true;
    };

    const applyMidleware = (middlewareName: string) => {
        sendMessage('spaceChange', true, '');
        // sendMessage('realmChange', true, '');
        switch (middlewareName) {
            case 'readAuthentication':
                return readAuthenticationSpace();
            case 'authenticate':
                return authenticateSpace();
            case 'isAdmin':
                return isAdmin();
            default:
                return true;
        }
    };

    const authenticateSpace = () => {
        return authenticate('space');
    };
    const readAuthenticationSpace = () => {
        return authenticate('space', false);
    };
    const readSpace = () => {
        sendMessage('spaceChange', true, params.space);
    };

    const authenticate = async (type: string, redirect = true) => {
        sendMessage('spaceChange', true, params.space);
        if (authorization.isAuth) {
            return true;
        }
        const accessToken = getSessionValue(`transit-access_token`);
        if (accessToken) {
            httpPost(
                `/roommate/auth/token`,
                { token: accessToken },
                null
            )
                .then((response: any) => {
                    if (response.status === 200) {
                        dispatch(
                            addAuth({
                                isAuth: true,
                                ...response.data.claims,
                                access_token: accessToken
                            })
                        );
                        return true;
                    }
                })
                .catch((error: any) => {
                    removeSessionValue(`transit-access_token`);
                    redirectToLogin();
                });
        } else if (redirect) {
            redirectToLogin();
        } else {
            return true;
        }
    };

    const isAdmin = () => {
        redirectToUnauthorized();
        return false;
    };

    const redirectToLogin = () => {
        console.log("*redirect*")
        window.location.href = `http://localhost:3000/#/login`;
        // navigate(`/login`);
    };

    const redirectToUnauthorized = () => {
        navigate(`/${params.space}/unauthorized`);
    };

    if (!applyMiddlewares()) {
        return <Navigate to={props.redirectPath || '/landing'} replace />;
    }

    if (props.children) {
        return React.cloneElement(props.children, { ...params });
    }
    else {
        return <props.component  {...params} />;
    }
};

export default ProtectedRouteApp;