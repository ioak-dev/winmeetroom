import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import EventModel from '../../../model/EventModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import { getPeople } from './service';
import { Button } from 'basicui';

interface Props {
  space: string;
  location: any;
}

const RequestPage = (props: Props) => {
  const navigate = useNavigate();

  const authorization = useSelector((state: any) => state.authorization);
  const [people, setPeople] = useState<any[]>([]);

  useEffect(() => {
    if (authorization.isAuth) {
      getPeople(authorization).then((response: any[]) => {
        setPeople(response);
      })
    }
  }, [authorization]);

  const goToManageEventPage = (event: EventModel) => {
    navigate(`/${props.space}/event/${event._id}`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="request-page">
      <Topbar title="Choose your room mate" />
      <div className="request-page__main">
        <table className="basicui-table table-small table-bordered">
          {people.map((item: any) => (
            <tr>
              <td>{`${item.firstName} ${item.lastName}`}</td>
              <td>
                <Button>
                  Send request
                </Button>
              </td>
            </tr>))}
        </table>
      </div>
    </div>
  );
};

export default RequestPage;
