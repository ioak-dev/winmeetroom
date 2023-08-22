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
  isUserAvailable: boolean;
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
            <div className="request-page-request-section__main__item__left">
              <div className="request-page-request-section__main__item__left__top">
                {props.auth?._id !== item.from && `${props.peopleMap[item.from]?.firstName} ${props.peopleMap[item.from]?.lastName}`}
                {props.auth?._id !== item.to && `${props.peopleMap[item.to]?.firstName} ${props.peopleMap[item.to]?.lastName}`}
              </div>
              <div className="request-page-request-section__main__item__left__bottom">
                {item.status === 'requested' && props.auth._id === item.to && <>Sent you a friend request</>}
                {item.status === 'requested' && props.auth._id === item.from && <>Waiting for their approval</>}
                {item.status === 'approved' && props.auth._id === item.to && <>You have accepted the request</>}
                {item.status === 'approved' && props.auth._id === item.from && <>They have accepted your request</>}
                {item.status === 'rejected' && props.auth._id === item.to && <>You have declined the request</>}
                {item.status === 'rejected' && props.auth._id === item.from && <>They have declined your request</>}
              </div>
            </div>

            <div>
              <div className="roommate-request-action-container">
                {props.isUserAvailable && item.status === 'requested' && props.auth._id === item.to &&
                  <button className="roommate-request-action roommate-request-action--success" onClick={() => onApproveRequest(item)}>
                    Accept
                  </button>}
                {props.isUserAvailable && item.status === 'requested' && props.auth._id === item.to &&
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
