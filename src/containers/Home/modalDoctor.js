import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Table, Col } from 'react-bootstrap';
import axios from '../../helpers/axios';
import { ROOT } from '../../actions/constants';

function ModalDoctor(props) {
    const [test, setTest] = useState({
    });
    useEffect(() => {
        setTest(props.info.rs);
    }, [])
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
    let onHandleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <Modal className="modal" size="lg" show={props.info.show} onHide={props.handleShow}>
            <Form noValidate onSubmit={onHandleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa thông tin bác sĩ </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col xs={12} md={12}>
                        <Input
                            placeholder={`...`}
                            name="fileUrl"
                            label={`Tên:`}
                            onChange={(e) => onChange(e)}
                        />
                        <Input
                            placeholder={`...`}
                            name="fileUrl"
                            label={`Ngày sinh:`}
                            onChange={(e) => onChange(e)}
                        />
                        <Input
                            placeholder={`...`}
                            name="Địa chỉ"
                            label={`File xét nghiệm:`}
                            onChange={(e) => onChange(e)}
                        />
                        <Input
                            placeholder={`...`}
                            name="fileUrl"
                            label={`Mô tả:`}
                            onChange={(e) => onChange(e)}
                        />
                        <Input
                            placeholder={`...`}
                            name="fileUrl"
                            label={`Hình ảnh:`}
                            onChange={(e) => onChange(e)}
                        />
                        <Input
                            placeholder={`...`}
                            name="fileUrl"
                            label={`Năm kinh nghiệm:`}
                            onChange={(e) => onChange(e)}
                        />
                        <Input
                            placeholder={`...`}
                            name="fileUrl"
                            label={`Thời gian khám:`}
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

export default ModalDoctor;