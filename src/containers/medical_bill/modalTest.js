import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from '../../helpers/axios';
import { ROOT } from '../../actions/constants';

function ModalTest(props) {
  const [category, setCategory] = useState([]);
  const [tests, setTests] = useState([]);
  const [arrTest, setArrTest] = useState([
  ]);

  useEffect(() => {
    axios.get(`/admin/listSpeciality`)
      .then(res => { setCategory(res.data) })
  }, [])
  const [testSend, setTestSend] = useState({
    diagnostic: '',
  });
  const [test, setTest] = useState({
    show: false,
    note: '',
    value: ''
  });
  let onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    setTestSend({
      ...testSend,
      [name]: value
    });
  }
  const [validated, setValidated] = useState(false);
  const onHandleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      console.error('props.info.idxxxx: ', props.info.id)
      axios.post('/admin/subclinical-testForm', {
        ...testSend,
        medicalBillId: props.info.id,
        listSubclinicalInTests: arrTest
      }).then(res => {
        if (res.data.status) {
          alert('Thêm phiếu xét nghiệm thành công!');
          props.handleShow();
        } else {
          alert('Thêm phiếu xét nghiệm thất bại!')
        }
      })
    }
  }
  const onChangeCategory = (e) => {
    axios.get(`/admin/subclinical?specialityId=${e.target.value}`)
      .then(res => { setTests(res.data) })
    setTestSend({ ...testSend, medicalBillId: e.target.value });
  }
  const showList = (categories) => {
    let result = null;
    if (categories && categories.length > 0) {
      result = categories.map((category, index) => {
        return (
          <option key={index} value={category.specialityId}>
            {category.name}
          </option>
        );
      })
    }
    return result;
  }
  const showListTests = (tests) => {
    let result = null;
    if (tests && tests.length > 0) {
      result = tests.map((test, index) => {
        return (
          <option key={index} value={test.subclinicalId}>
            {test.testName}
          </option>
        );
      })
    }
    return result;
  }
  const showArrTest = (arrTest) => {
    let result = null;
    if (arrTest && arrTest.length > 0) {
      result = arrTest.map((test, index) => {
        return (
          <Row>
            <Col xs={4} md={4}>
              <p>{test.name}</p>
            </Col>
            <Col xs={6} md={6}>
              <p>{test.note}</p>
            </Col>
            <Col xs={2} md={2}>
              <Button variant='danger' onClick={() => {
                var rs = JSON.parse(JSON.stringify(arrTest));
                rs.splice(index, 1);
                setArrTest(rs);
              }}>Delete</Button>
            </Col>
          </Row>
        );
      })
    }
    return result;
  }
  const saveTest = () => {
    let arrTestAtempt = JSON.parse(JSON.stringify(arrTest));
    arrTestAtempt.push(testAdd);
    setArrTest(arrTestAtempt);
    setTestAdd({
      subclinicalId: '',
      name: '',
      note: ''
    })
    setTest({ ...test, show: false })
  }
  const cancelTest = () => {
    setTest({ ...test, show: false })
    setTestAdd({
      subclinicalId: '',
      name: '',
      note: ''
    })
  }
  const [testAdd, setTestAdd] = useState({
    subclinicalId: '',
    name: '',
    note: ''
  });
  const onChangeTestAdd = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.type === 'select-one') {
      let nametest = '';
      tests.map((item, index) => {
        if (item.subclinicalId == value) {
          nametest = item.testName;
        }
      })
      setTestAdd({
        ...testAdd,
        [name]: value,
        name: nametest
      });
    } else {
      setTestAdd({
        ...testAdd,
        [name]: value
      });
    }
  }
  return (
    <Modal className="modal" size="lg" show={props.info.show} onHide={props.handleShow}>
      <Form onSubmit={onHandleSubmit} noValidate validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm phiếu xét nghiệm</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={12}>
                <Input
                  value={testSend.diagnostic}
                  placeholder={`...`}
                  name="diagnostic"
                  type="text"
                  label={`Chuẩn đoán`}
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: 'center', paddingTop: 25 }} xs={12} md={12}>
                <h4>Danh sách chỉ đỉnh xét nghiệm</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <Form.Group>
                  <Form.Label>Chọn chuyên khoa</Form.Label>
                  <Form.Control required as="select" name="specialityId" onChange={(e) => onChangeCategory(e)}>
                    <option key={'empty'} value={''}>...</option>
                    {showList(category)}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row><br />
            <Row>
              <p>Danh sách xét nghiệm đã chọn:</p>
              {showArrTest(arrTest)}
              {!test.show ? (<Col style={{ textAlign: 'center', paddingTop: 25 }} xs={12} md={12}>
                <Button onClick={() => setTest({ ...test, show: true })} variant="primary">+</Button>
              </Col>) : null}
              {test.show ? (<>
                <Col xs={4} md={4}>
                  <Form.Group>
                    <Form.Label>Xét nghiệm</Form.Label>
                    <Form.Control required as="select" name="subclinicalId" onChange={(e) => onChangeTestAdd(e)}>
                      <option key={'empty'} value={''}></option>
                      {showListTests(tests)}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={8} md={8}>
                  <Input
                    value={testAdd.note}
                    placeholder={`...`}
                    name="note"
                    type="text"
                    label={`Ghi chú`}
                    onChange={(e) => onChangeTestAdd(e)}
                  />
                </Col>
                <Col style={{ textAlign: 'center', paddingTop: 25 }} xs={12} md={12}>
                  <Button onClick={() => saveTest()} variant="primary">lưu</Button>
                  <Button onClick={() => cancelTest()} variant="danger">Hủy</Button>
                </Col>
              </>) : null}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={props.handleShow}>
            Close
          </Button>
          <Button type="submit" variant="dark">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalTest;