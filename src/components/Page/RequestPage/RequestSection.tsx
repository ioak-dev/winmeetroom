import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RequestSection.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import EventModel from '../../../model/EventModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';
import { approveRequest, getPeople, getRequest, rejectRequest, revokeRequest } from './service';
import { Button, IconButton, ThemeType } from 'basicui';

interface Props {
  location: any;
  requestList: any[];
  peopleMap: any;
  onDataChange: any;
  auth: any;
}

const RequestSection = (props: Props) => {
  const navigate = useNavigate();

  const onDeleteRequest = (request: any) => {
    revokeRequest(request._id, props.auth).then((response: any) => {
      props.onDataChange();
    })
  }

  const onApproveRequest = (request: any) => {
    approveRequest(request._id, props.auth).then((response: any) => {
      props.onDataChange();
    })
  }

  const onRejectRequest = (request: any) => {
    rejectRequest(request._id, props.auth).then((response: any) => {
      props.onDataChange();
    })
  }

  return (
    <div className="request-page-request-section">
      {/* <h4>Active requests</h4> */}
      <div className="request-page-request-section__main">
        {props.requestList.map((item: any) => (
          <div className="request-page-request-section__main__item">
            {props.auth?._id !== item.from && <td>{`${props.peopleMap[item.from]?.firstName} ${props.peopleMap[item.from]?.lastName}`}</td>}
            {props.auth?._id !== item.to && <td>{`${props.peopleMap[item.to]?.firstName} ${props.peopleMap[item.to]?.lastName}`}</td>}
            <div>
              <div className="roommate-request-action-container">
                {item.status === 'requested' && props.auth._id === item.to &&
                  <button className="roommate-request-action" onClick={() => onApproveRequest(item)}>
                    Accept
                  </button>}
                {item.status === 'requested' && props.auth._id === item.to &&
                  <button className="roommate-request-action roommate-request-action--danger" onClick={() => onRejectRequest(item)}>
                    Decline
                  </button>}
                {item.status === 'requested' && props.auth._id === item.from &&
                  <button className="roommate-request-action" onClick={() => onDeleteRequest(item)}>
                    Withdraw
                  </button>}
              </div>
            </div>
          </div>))}
      </div>
    </div>
  );
};

export default RequestSection;
