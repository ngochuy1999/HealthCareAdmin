import React, { useState } from "react";
import "./style.css";
import { formatVnd } from '../../../helpers/formatMoney';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Card = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="card" {...props}>
      {(props.headerleft || props.headerright) && (
        <div className="cardHeader" onClick={() => setShowDetail(!showDetail)}>
          {props.headerleft && <div><i className={`fas fa-chevron-${showDetail ? 'up' : 'down'} toggle-icon`}></i> Mã hóa đơn: {props.headerleft}</div>}
          Tổng tiền: {formatVnd(props.headerright)}
        </div>
      )}
      <DropdownButton align="end" id="dropdown-menu-align-end" title="" variant="light">
        {/* <Dropdown.Item onClick={() => props.setInfo({ show: true, id: props.headerleft })} >Sửa</Dropdown.Item> */}
        <Dropdown.Item onClick={() => { props.onDelete(props.headerleft) }}>Xóa</Dropdown.Item>
      </DropdownButton>
      {showDetail ? props.children : null}
    </div>
  );
};

export default Card;