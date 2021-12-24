import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from '../../helpers/axios';

function ModalAddBill(props) {
    const [listMedical, setListMedical] = useState([]);
    useEffect(() => {
        axios.get('/admin/medicine/').then(res => setListMedical(res.data))
    }, [])
    const [medical, setMedical] = useState({
        diagnostic: '',
        needs: '',
        prohibited: '',
        dateBegin: '',
        dateEnd: '',
        reExaminationDate: ''
    })
    const [arrTest, setArrTest] = useState([
    ]);
    let onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        setMedical({
            ...medical,
            [name]: value
        });
    }
    const [testAdd, setTestAdd] = useState({
        medicineId: '',
        quantity: '',
    });
    let onChangeAddTest = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        setTestAdd({
            ...testAdd,
            [name]: value
        });
    }
    const [validated, setValidated] = useState(false);
    let onHandleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            axios.post('/admin/create-prescription', {
                medicalBillId: props.info.id,
                ...medical,
                prescriptionParamList: arrTest
            }).then(res => {
                if (res.data.status) {
                    alert('Thêm bill thành công!');
                    props.handleShow();
                    window.location.reload();
                } else {
                    alert('Thêm bill thất bại!')
                }
            })
        }
    }
    const showArrTest = (arrTest) => {
        let result = null;
        if (arrTest && arrTest.length > 0) {
            result = arrTest.map((test, index) => {
                let nameMedical = '';
                listMedical.map((item, index) => {
                    if (item.medicineId == test.medicineId) {
                        nameMedical = item.medicineName;
                    }
                })
                return (
                    <Row>
                        <Col xs={6} md={6}>
                            <p>{nameMedical}</p>
                        </Col>
                        <Col xs={6} md={6}>
                            <p>{test.quantity}</p>
                        </Col>
                    </Row>
                );
            })
        }
        return result;
    }
    const [test, setTest] = useState({
        show: false,
        note: '',
        value: ''
    });
    const cancelTest = () => {
        setTest({ ...test, show: false })
        setTestAdd({
            medicineId: '',
            quantity: '',
        })
    }
    const saveTest = () => {
        let arrTestAtempt = JSON.parse(JSON.stringify(arrTest));
        arrTestAtempt.push(testAdd);
        setArrTest(arrTestAtempt);
        setTestAdd({
            medicineId: '',
            quantity: '',
        })
        setTest({ ...test, show: false })
    }
    const showList = (categories) => {
        let result = null;
        if (categories && categories.length > 0) {
            result = categories.map((category, index) => {
                return (
                    <option key={index} value={category.medicineId}>
                        {category.medicineName}
                    </option>
                );
            })
        }
        return result;
    }
    return (
        <Modal className="modal" size="lg" show={props.info.show} onHide={props.handleShow}>
            <Form onSubmit={onHandleSubmit} noValidate validated={validated}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm đơn thuốc</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                <Input
                                    value={medical.diagnostic}
                                    placeholder={`...`}
                                    name="diagnostic"
                                    label={`Chuẩn đoán`}
                                    onChange={(e) => onChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <Input
                                    value={medical.needs}
                                    placeholder={`...`}
                                    name="needs"
                                    label={`Nên:`}
                                    onChange={(e) => onChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <Input
                                    value={medical.prohibited}
                                    placeholder={`...`}
                                    name="prohibited"
                                    label={`Hạn chế: `}
                                    onChange={(e) => onChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <Input
                                    value={medical.dateBegin}
                                    placeholder={`...`}
                                    type="date"
                                    name="dateBegin"
                                    label={`Ngày bắt đầu uống thuốc:`}
                                    onChange={(e) => onChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <Input
                                    value={medical.dateEnd}
                                    placeholder={`...`}
                                    type="date"
                                    name="dateEnd"
                                    label={`Ngày kết thúc uống thuốc:`}
                                    onChange={(e) => onChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <Input
                                    value={medical.reExaminationDate}
                                    placeholder={`...`}
                                    type="date"
                                    name="reExaminationDate"
                                    label={`Ngày tái khám:`}
                                    onChange={(e) => onChange(e)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <p>Danh sách thuốc đã chọn:</p>
                            {showArrTest(arrTest)}
                            {!test.show ? (<Col style={{ textAlign: 'center', paddingTop: 25 }} xs={12} md={12}>
                                <Button onClick={() => setTest({ ...test, show: true })} variant="primary">+</Button>
                            </Col>) : null}
                            {test.show ? (<>
                                <Col xs={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Chọn thuốc</Form.Label>
                                        <Form.Control required as="select" name="medicineId" onChange={(e) => onChangeAddTest(e)}>
                                            <option key={'empty'} value={''}>...</option>
                                            {showList(listMedical)}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={6}>
                                    <Input
                                        value={testAdd.quantity}
                                        placeholder={`...`}
                                        name="quantity"
                                        label={`Số lượng:`}
                                        onChange={(e) => onChangeAddTest(e)}
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

export default ModalAddBill;