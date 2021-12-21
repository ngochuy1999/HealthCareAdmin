import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Container, Row, Col, Table } from 'react-bootstrap';
import axios from '../../helpers/axios';
import Layout from '../../components/Layout';
import ModalAdd from './modalAdd';

function TestResult(props) {
    const [billID, setBillID] = useState('');
    const [arrTest, setArrTest] = useState([]);
    const [info, setInfo] = useState({ show: false, id: null });
    const handleShow = () => {
        setInfo({
            ...info,
            show: !info.show
        });
        axios.get(`/admin/test-form?billId=${billID}`)
            .then(res => setArrTest(res.data))
    };
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
                        {rs.isPay == 1 ? (<td onClick={() => { setInfo({ ...info, show: true, id: rs.id }) }}>
                            <i class="fas fa-arrow-circle-right"></i>
                        </td>) : (<td onClick={() => { setInfo({ ...info, show: true, id: rs.id }) }}>

                        </td>)}

                    </tr >
                )
            });
        }
        return rs;
    }
    return (
        <Layout sidebar>
            <Container>
                <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col xs={8} md={8}>
                        <Input
                            value={billID}
                            name='billlID'
                            placeholder={`...`}
                            label={`Nhập billID `}
                            onChange={(e) => setBillID(e.target.value)}
                        />
                    </Col>
                    <Col xs={4} md={4}>
                        <Button onClick={() => {
                            axios.get(`/admin/test-form?billId=${billID}`)
                                .then(res => setArrTest(res.data))
                        }}>Tìm kiếm</Button>
                    </Col>
                </Row>
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
                        {showItems(arrTest)}
                    </tbody>
                </Table>
            </Container>
            {info.show ? <ModalAdd info={info} handleShow={handleShow} onHide={handleHideModal} handleShowError={handleShowError} /> : null}
        </Layout>
    );
}

export default TestResult;