import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faSignIn, faSignOut, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import EventModel from '../../../model/EventModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import { getPeople, getRequest } from './service';
import { Button, IconButton } from 'basicui';
import RequestSection from './RequestSection';
import PeopleSection from './PeopleSection';
import Login from '../../../components/Login';
import { getSessionValue, removeSessionValue, setSessionValue } from '../../../utils/SessionUtils';
import { httpPost } from '../../../components/Lib/RestTemplate';

interface Props {
  space: string;
  location: any;
}

const RequestPage = (props: Props) => {
  const navigate = useNavigate();
  const [view, setView] = useState<'verifying' | 'login' | 'home'>('verifying');
  const [auth, setAuth] = useState<any>();
  const [people, setPeople] = useState<any[]>([]);
  const [peopleMap, setPeopleMap] = useState<any>({});
  const [availablePeople, setAvailablePeople] = useState<any[]>([]);
  const [request, setRequest] = useState<any[]>([]);
  const [isUserAvailable, setIsUserAvailable] = useState(false);

  useEffect(() => {
    const accessToken = getSessionValue(`transit-access_token`);
    validateUser(accessToken);
  }, [])

  useEffect(() => {
    if (auth?.isAuth) {
      getPeople(auth).then((response: any[]) => {
        setPeople(response);
        const _peopleMap: any = {};
        response.forEach((item: any) => {
          _peopleMap[item._id] = item;
        })
        setPeopleMap(_peopleMap);
      })
      onDataChange();
    }
  }, [auth]);

  const onDataChange = () => {
    getRequest(auth).then((response: any[]) => {
      setRequest(response);
    })
  }

  useEffect(() => {
    const _relatedPeopleIdList: string[] = [];
    request.forEach((item: any) => {
      _relatedPeopleIdList.push(item.from);
      _relatedPeopleIdList.push(item.to);
    })
    setAvailablePeople(people.filter((item: any) => !_relatedPeopleIdList.includes(item._id) && item._id !== auth?._id));

    const _isUserAvailable = !request.find((item: any) => item.status === 'approved' && (item.from === auth._id || item.to === auth._id));
    setIsUserAvailable(_isUserAvailable);
  }, [people, request]);

  const onSignin = (accessToken: string | null) => {
    validateUser(accessToken);
  }

  const validateUser = (accessToken: string | null) => {
    if (accessToken) {
      httpPost(
        `/roommate/auth/token`,
        { token: accessToken },
        null
      )
        .then((response: any) => {
          if (response.status === 200) {
            console.log(response.data)
            setAuth(
              {
                isAuth: true,
                ...response.data.claims,
                access_token: accessToken
              })
            setSessionValue('transit-access_token', accessToken);
            setView('home');
          }
        })
        .catch((error: any) => {
          removeSessionValue(`transit-access_token`);
          setView('login');
        });
    } else {
      setView('login');
    }
  }

  const onSignout = () => {
    removeSessionValue(`transit-access_token`);
    setAuth(null);
    setView('login')
  }

  const goToManageEventPage = (event: EventModel) => {
    navigate(`/${props.space}/event/${event._id}`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="request-page">
      <Topbar title="Choose your room mate">
        {auth?.isAuth && <div className="right-navbar">
          {auth?.firstName}
          <IconButton onClick={onSignout} circle>
            <FontAwesomeIcon icon={faSignOut} />
          </IconButton>
        </div>}
      </Topbar>
      <div className="request-page__main">
        {view === 'verifying' && <div>Verifying</div>}
        {view === 'login' && <Login onSignin={onSignin} auth={auth} />}
        {view === 'home' && <div className="request-page__main__container">
          <RequestSection isUserAvailable={isUserAvailable} location={props.location} peopleMap={peopleMap} auth={auth} requestList={request} onDataChange={onDataChange} />
          <PeopleSection isUserAvailable={isUserAvailable} location={props.location} people={availablePeople} auth={auth} onDataChange={onDataChange} />
        </div>}
      </div>
    </div>
  );
};

export default RequestPage;
