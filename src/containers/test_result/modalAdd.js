import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Table, Col } from 'react-bootstrap';
import axios from '../../helpers/axios';
import { ROOT } from '../../actions/constants';

function ModalAdd(props) {
    const [test, setTest] = useState({
        conclude: '',
        imageUrl: '',
        fileUrl: ''
    });
    const [arrTest, setArrTest] = useState([]);
    let onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        value = target.type === 'file' ? target.files[0] : value;
        setTest({
            ...test,
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
            alert('Chưa thêm đầy đủ kết quả xét nghiệm!');
        } else {
            const admin = JSON.parse(window.localStorage.getItem('admin'));
            const form = new FormData();
            form.append("testFormId", props.info.id);
            form.append("doctorId", admin.accountId);
            form.append("conclude", test.conclude);
            form.append("imageUrl", test.imageUrl);
            form.append("fileUrl", test.fileUrl);
            axios.post('/admin/test-result1', form).then(res => {
                if (res.data.status) {
                    alert('Thêm kết quả xét nghiệm thành công!');
                    props.handleShow();
                } else {
                    alert('Thêm kết quả xét nghiệm thất bại!')
                }
            })
        }
    }
    useEffect(() => {
        axios.get(`/admin/subclinical-by-test?testFormId=${props.info.id}`)
            .then(res => setArrTest(res.data))
    }, [])
    const showItems = (arrTest) => {
        let rs = null;
        if (arrTest) {
            rs = arrTest.map((test, index) => {
                return (
                    <tr key={index}>
                        <td>{++index}</td>
                        <td>{test.testName}</td>
                        <td>{test.price}</td>
                    </tr >
                )
            });
        }
        return rs;
    }
    return (
        <Modal className="modal" size="lg" show={props.info.show} onHide={props.handleShow}>
            <Form noValidate onSubmit={onHandleSubmit} noValidate validated={validated}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm kết quả xét nghiệm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showItems(arrTest)}
                        </tbody>
                    </Table>
                    <Col xs={12} md={12}>
                        <Input
                            value={test.conclude}
                            placeholder={`...`}
                            name="conclude"
                            label={`Kết quả xét nghiệm:`}
                            onChange={(e) => onChange(e)}
                        />
                    </Col>
                    <Col xs={12} md={12}>
                        <Input
                            placeholder={`...`}
                            type="file"
                            name="imageUrl"
                            label={`Hình ảnh xét nghiệm:`}
                            onChange={(e) => onChange(e)}
                        />
                    </Col>
                    <Col xs={12} md={12}>
                        <Input
                            placeholder={`...`}
                            type="file"
                            name="fileUrl"
                            label={`File xét nghiệm:`}
                            onChange={(e) => onChange(e)}
                        />
                    </Col>
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

export default ModalAdd;