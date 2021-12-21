import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import axios from '../../helpers/axios';
import { ROOT } from '../../actions/constants';

function ModalResultTestDf(props) {
  const [test, setTest] = useState({});
  useEffect(() => {
    axios.get(`/admin/test-result?testFormId=${props.info.details.id}`)
      .then(res => { setTest(res.data[0]); console.error('res: ', res.data) })
  }, [])
  return (
    <Modal className="modal" size="lg" show={props.info.show} onHide={props.handleShow}>
      <Form noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Kết quat xét nghiệm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Chuẩn đoán: {props.info.details.diagnostic}</p>
          <p>Ngày xét nghiệm: {test.date}</p>
          <div>
            <p>Hình ảnh xét nghiêm:</p>
            <img style={{ width: '100%', height: 'auto' }} src={test.imageUrl} />
          </div>
          <p>File xét nghiệm: <a href={test.fileUrl}>xem file</a></p>
          <p>Kết quả: {test.conclude}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={props.handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalResultTestDf;