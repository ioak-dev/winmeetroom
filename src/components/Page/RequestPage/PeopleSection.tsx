import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PeopleSection.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import EventModel from '../../../model/EventModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import { createRequest, getPeople, getRequest } from './service';
import { Button } from 'basicui';

interface Props {
  location: any;
  people: any[];
  auth: any;
  onDataChange: any;
}

const PeopleSection = (props: Props) => {
  const navigate = useNavigate();

  const onSendRequest = (person: any) => {
    console.log(props.auth);
    console.log(person);
    createRequest({ from: props.auth._id, to: person._id }, props.auth).then((response: any) => {
      console.log(response);
      props.onDataChange();
    })
  }

  return (
    <div className="request-page-people-section">
      {/* <h4>People list</h4> */}
      <div className="request-page-people-section__main">
        {props.people.map((item: any) => (
          <div className="request-page-people-section__main__item">
            <div>{item.firstName} {item.lastName}</div>
            <div>
              <div className="roommate-request-action-container">
                <button className="roommate-request-action" onClick={() => onSendRequest(item)}>
                  Send request
                </button>
              </div>
            </div>
          </div>))}
      </div>
    </div>
  );
};

export default PeopleSection;
