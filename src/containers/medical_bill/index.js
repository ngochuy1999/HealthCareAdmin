import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Table, Toast, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand, getAllMedicalBill } from '../../actions';
import ModalResultTest from './modalResultTest';
import ModalTest from './modalTest';
import axios from 'axios';
import ModalAddBill from './modalAddBill';

function Medical(props) {

    const [info, setInfo] = useState({ show: false, id: null });
    const [info1, setInfo1] = useState({ show: false, id: null });
    const [info2, setInfo2] = useState({ show: false, id: null });
    const [infoUser, setInfoUser] = useState(null);

    const brand = useSelector(state => state.brand);
    const medical = useSelector(state => state.medical);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrand());
        dispatch(getAllMedicalBill());
    }, [])

    const handleShow = () => setInfo({
        ...info,
        show: !info.show
    });

    const handleShow1 = () => setInfo1({
        ...info1,
        show: !info1.show
    });

    const handleShow2 = () => setInfo2({
        ...info2,
        show: !info2.show
    });

    const renderItems = (brands) => {
        let myBrands = [];
        if (brands) {
            let stt = 1;
            for (let brand of brands) {
                if (stt == 1) {
                    myBrands.push(
                        <tr key={brand._id}>
                            <td>{stt}</td>
                            <td>{brand.patient.name}</td>
                            <td onClick={() => {
                                axios.get(`http://192.168.43.158:8080/api/admin/remind?medicalId=${brand.billId}`)
                                    .then(res => {
                                        if (res.data.status == 200) {
                                            alert(res.data.message);
                                        } else {
                                            alert("Không thành công!");
                                        }
                                    })
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-bell"></i>
                            </td>
                            <td onClick={() => {
                                setInfoUser(brand.patient);
                                setInfo2({ ...info2, id: brand.billId })
                                setInfo1({ ...info1, id: brand.billId })
                                setInfo({ ...info, id: brand.billId })
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-arrow-circle-right"></i>
                            </td>
                            <td onClick={() => {
                                axios.put(`http://192.168.43.158:8080/api/admin/cancelBill?medicalId=${brand.billId}`)
                                    .then(res => {
                                        dispatch(getAllBrand());
                                    })
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-times-circle"></i>
                            </td>
                        </tr>
                    )
                    ++stt;
                } else {
                    myBrands.push(
                        <tr key={brand._id}>
                            <td>{stt}</td>
                            <td>{brand.patient.name}</td>
                            <td onClick={() => {
                                axios.get(`http://192.168.43.158:8080/api/admin/remind?medicalId=${brand.billId}`)
                                    .then(res => {
                                        if (res.data.status == 200) {
                                            alert(res.data.message);
                                        } else {
                                            alert("Không thành công!");
                                        }
                                    })
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-bell"></i>
                            </td>
                            <td onClick={() => {
                                setInfoUser(brand.patient);
                                setInfo2({ ...info2, id: brand.billId })
                                setInfo1({ ...info1, id: brand.billId })
                                setInfo({ ...info, id: brand.billId })
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-arrow-circle-right"></i>
                            </td>
                            <td onClick={() => {
                                axios.put(`http://192.168.43.158:8080/api/admin/cancelBill?medicalId=${brand.billId}`)
                                    .then(res => {
                                        dispatch(getAllBrand());
                                    })
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-times-circle"></i>
                            </td>
                        </tr>
                    )
                    ++stt;
                }
            }
        }
        return myBrands;
    }

    const renderMedicals = (brands) => {
        let myBrands = [];
        if (brands) {
            let stt = 1;
            for (let brand of brands) {
                if (stt == 1) {
                    myBrands.push(
                        <tr key={brand._id}>
                            <td>{stt}</td>
                            <td>{brand.patient.name}</td>
                            <td onClick={() => {
                                axios.get(`http://192.168.43.158:8080/api/admin/remind?medicalId=${brand.billId}`)
                                    .then(res => {
                                        if (res.data.status == 200) {
                                            alert(res.data.message);
                                        } else {
                                            alert("Không thành công!");
                                        }
                                    })
                            }}  style={{ textAlign: 'center' }}>
                                <i class="fas fa-bell"></i>
                            </td>
                            <td onClick={() => {
                                axios.put(`http://192.168.43.158:8080/api/admin/joinRoom?medicalId=${brand.billId}`)
                                    .then(res => {
                                        console.error('res: ', res);
                                        dispatch(getAllBrand());
                                        dispatch(getAllMedicalBill());
                                    })
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-exchange-alt"></i>
                            </td>
                            <td onClick={() => {
                                axios.put(`http://192.168.43.158:8080/api/admin/cancelBill?medicalId=${brand.billId}`)
                                    .then(res => {
                                        dispatch(getAllMedicalBill());
                                    })
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-times-circle"></i>
                            </td>
                        </tr>
                    )
                    ++stt;
                } else {
                    myBrands.push(
                        <tr key={brand._id}>
                            <td>{stt}</td>
                            <td>{brand.patient.name}</td>
                            <td style={{ textAlign: 'center' }}>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                            </td>
                            <td onClick={() => {
                                axios.put(`http://192.168.43.158:8080/api/admin/cancelBill?medicalId=${brand.billId}`)
                                    .then(res => {
                                        dispatch(getAllMedicalBill());
                                    })
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-times-circle"></i>
                            </td>
                        </tr>
                    )
                    ++stt;
                }
            }
        }
        return myBrands;
    }

    const handleHideModal = (type, content) => {
        setInfo({ show: false, id: null });
        dispatch(getAllBrand());
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

    const handleHideModal1 = (type, content) => {
        setInfo1({ show: false, id: null });
        dispatch(getAllBrand());
        setShow1(true);
        setType1(type);
        setContent1(content);
    };

    const handleShowError1 = (type, content) => {
        setShow1(true);
        setType1(type);
        setContent1(content);
    };

    const [show1, setShow1] = useState(false);
    const [type1, setType1] = useState('');
    const [content1, setContent1] = useState('');

    const handleHideModal2 = (type, content) => {
        setInfo2({ show: false, id: null });
        setShow2(true);
        setType2(type);
        setContent2(content);
    };

    const handleShowError2 = (type, content) => {
        setShow2(true);
        setType2(type);
        setContent2(content);
    };

    const [show2, setShow2] = useState(false);
    const [type2, setType2] = useState('');
    const [content2, setContent2] = useState('');

    return (
        <Layout sidebar>
            <Toast className={`toastShow ${type}`} onClose={() => setShow(false)} op show={show} delay={1500} autohide>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Notify</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>{content}!</Toast.Body>
            </Toast>
            <Container>
                <Row style={{ paddingTop: 25 }}>
                    <Col md="6">
                        <Row>
                            <Col md={12}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3>Đang khám</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Name</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderItems(brand.brands)}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3>Hàng chờ</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Name</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderMedicals(medical.medicals)}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6">
                        {infoUser ? (<Card style={{ width: '100%' }}>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title>Chi Tiết Khám Bệnh</Card.Title>
                                <Card.Text>
                                    Tên: {infoUser ? infoUser.name : null}<br />
                                    Năm sinh: {infoUser ? infoUser.birthday : null}<br />
                                    Địa chỉ: {infoUser ? infoUser.address : null}<br />
                                    Giới tính: {infoUser ? (infoUser.gender ? 'Nữ' : 'Nam') : null}<br />
                                </Card.Text>
                            </Card.Body>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Button variant="secondary" style={{ width: '70%' }} href={`/medical-record/${infoUser.userId}`}>Xem hồ sơ bệnh án</Button><br />
                            </Card.Body>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Button onClick={() => setInfo({ ...info, show: true })} variant="secondary" style={{ width: '70%' }}><i class="fas fa-plus"></i> | Thêm phiếu yêu cầu xét nghiệm</Button><br />
                            </Card.Body>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Button onClick={() => setInfo1({ ...info1, show: true })} variant="secondary" style={{ width: '70%' }}><i class="fas fa-eye"></i> | kết quả xét nghiệm</Button><br />
                            </Card.Body>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Button onClick={() => setInfo2({ ...info2, show: true })} variant="secondary" style={{ width: '70%' }}>Hoàn tất bệnh án</Button><br />
                            </Card.Body>
                        </Card>) : (<Card style={{ width: '100%', minHeight: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h4 style={{ textAlign: 'center' }}>Vui lòng chọn bệnh nhân</h4>
                        </Card>)}
                        <Card style={{ width: '100%', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button onClick={()=>{
                                var admin = JSON.parse(localStorage.getItem('admin'));
                                axios.put(`http://192.168.43.158:8080/api/admin/end-session?doctorId=${admin.accountId}`)
                                .then(res => {
                                    if(res.data.status){
                                        // dispatch(getAllBrand());
                                        // dispatch(getAllMedicalBill());
                                        window.location.reload();
                                    }else{
                                        alert('Có lỗi xảy ra!')
                                    }
                                })
                            }} variant="danger">Kết thúc phiên làm việc</Button>
                        </Card>

                    </Col>
                </Row>
            </Container>
            {info.show ? <ModalTest info={info} handleShow={handleShow} onHide={handleHideModal} handleShowError={handleShowError} /> : null}
            {info1.show ? <ModalResultTest info={info1} handleShow={handleShow1} onHide={handleHideModal1} handleShowError={handleShowError} /> : null}
            {info2.show ? <ModalAddBill info={info2} handleShow={handleShow2} onHide={handleHideModal2} handleShowError={handleShowError} /> : null}
        </Layout>
    );
}

export default Medical;