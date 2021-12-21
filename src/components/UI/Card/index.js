import React, { useState } from "react";
import "./style.css";

const Card = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="card" {...props}>
      {(props.headerleft || props.headerright) && (
        <div className="cardHeader" onClick={() => setShowDetail(!showDetail)}>
          {props.headerleft && <div><i className={`fas fa-chevron-${showDetail ? 'up' : 'down'} toggle-icon`}></i> Mã đơn hàng: {props.headerleft}</div>}
          Người nhận: {props.headerright && props.headerright}
        </div>
      )}
      {showDetail ? props.children : null}
    </div>
  );
};

export default Card;