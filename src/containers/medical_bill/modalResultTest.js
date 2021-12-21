import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import axios from '../../helpers/axios';
import { ROOT } from '../../actions/constants';
import ModalResultTestDf from './modalResultTestDf';

function ModalResultTest(props) {
  const [info, setInfo] = useState({ show: false, id: null });
  const [rsTest, setRsTest] = useState([]);
  useEffect(() => {
    axios.get(`/admin/test-form?billId=${props.info.id}`)
      .then(res => setRsTest( res.data))
  })
  const handleShow = () => setInfo({
    ...info,
    show: !info.show
  });
  const handleHideModal = (type, content) => {
    setInfo({ show: false, id: null });
    setShow(true);
    setType(type);
    setContent(content);
  };

  const handleShowError = (type, content) => {
    setShow(true);
    setType(type);
    setContent(content);
  };

  const [show, setShow] = useState(false);
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const showItems = (rsTest) => {
    let rs = null;
    if (rsTest) {
      rs = rsTest.map((rs, index) => {
        return (
          <tr key={index}>
            <td>{++index}</td>
            <td>{rs.diagnostic}</td>
            <td>{rs.isPay == 0 ? 'chưa thanh toán' : (rs.isPay === 1 ? 'đang tiến hành' : 'đã hoàn thành')}</td>
            {rs.isPay == 2 ? (<td onClick={() => { setInfo({ ...info, show: true, details: rs }) }}>
              <i class="fas fa-arrow-circle-right"></i>
            </td>) : (<td></td>)}
          </tr >
        )
      });
    }
    return rs;
  }
  return (
    <Modal className="modal" show={props.info.show} onHide={props.handleShow}>
      <Form noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Danh sách xét nghiệm yêu cầu</Modal.Title>
        </Modal.Header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Chuẩn đoán</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {showItems(rsTest)}
          </tbody>
        </Table>

        <Modal.Footer>
          <Button variant="light" onClick={props.handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
      {info.show ? <ModalResultTestDf info={info} handleShow={handleShow} onHide={handleHideModal} handleShowError={handleShowError} /> : null}
    </Modal>
  );
}

export default ModalResultTest;