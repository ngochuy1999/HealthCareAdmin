import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import axios from '../../helpers/axios';
import { ROOT } from '../../actions/constants';

function ModalResultTestDf(props) {
  const [test, setTest] = useState({});
  useEffect(() => {
    axios.get(`/admin/test-result?testFormId=${props.info.details.id}`)
      .then(res => {
        setTest(res.data[0]);
        console.error('res.data[0]: ', res.data[0])
      })
  }, [])
  return (
    <Modal className="modal" size="lg" show={props.info.show} onHide={props.handleShow}>
      <Form noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Kết quả xét nghiệm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Chuẩn đoán: {props.info.details.diagnostic}</p>
          <p>Ngày xét nghiệm: {test.date}</p>
          <div>
            <p>Hình ảnh xét nghiêm:</p>
            {test.testResultDetail ? test.testResultDetail.map((image, index) => {
              return (image.imageUrl ? (<img style={{ width: '100%', height: 'auto' }} src={image.imageUrl} />) : null);
            }) : null}
          </div>
          <div>
            <p>File xét nghiệm: </p>
            {test.testResultDetail ? test.testResultDetail.map((file, index) => {
              return (file.fileUrl ? ( <p><a href={file.fileUrl}>xem file</a></p>) : null);
            }) : null}
          </div>
    
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