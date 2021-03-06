import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Table, Dropdown, DropdownButton, Toast, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand } from '../../actions';
import axios from '../../helpers/axios';
import { useParams } from 'react-router';
import moment from 'moment'

function MedicalRecord(props) {
    let { slug } = useParams();
    const [records, setRecords] = useState();
    const [infoRecord, setInfoRecord] = useState(null);
    useEffect(() => {
        if (slug) {
            axios.get(`admin/medical-record?pid=${slug}`)
                .then(res => {
                    setRecords(res.data);
                })
        }
    }, [slug]);

    let showItems = (records) => {
        let rs = null;
        if (records) {
            rs = records.map((record, index) => {
                return (
                    <tr key={index}>
                            <td>{record.recordId}</td>
                            <td>{record.medicalBill.doctor.firstName}</td>
                            <td>{moment("1900-01-01T00:00:06.75+07:06:40", 'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD')}</td>
                            <td onClick={() => {
                                setInfoRecord(record)
                            }} style={{ textAlign: 'center' }}>
                                <i class="fas fa-arrow-circle-right"></i>
                            </td>
                        </tr>
                )
            });
        }
        return rs;
    }
    return (
        <Layout sidebar>
            <Container>
                <Row style={{ paddingTop: 25 }}>
                    <Col md="6">
                        <Row>
                            <Col md={12}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr style={{ textAlign: 'center' }}>
                                            <th colSpan="4">H??? s?? b???nh ??n</th>
                                        </tr>
                                        <tr style={{ textAlign: 'center' }}>
                                            <th>M?? HS</th>
                                            <th>T??n</th>
                                            <th>Ng??y</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showItems(records)}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6">
                        {infoRecord ? (<Card style={{ width: '100%' }}>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title>Chi Ti???t H??? S?? B???nh ??n</Card.Title>
                                <Card.Text>
                                    M??: {infoRecord ? infoRecord.recordId : null}<br />
                                    Chu???n ??o??n: {infoRecord ? infoRecord.diagnostic : null}<br />
                                    T??n b???nh nh??n: {infoRecord ? infoRecord.medicalBill.patient.name : null}<br />
                                    B??c s?? kh??m: {infoRecord ? infoRecord.medicalBill.doctor.firstName : null}<br />
                                    D??? ???ng thu???c: {infoRecord ? infoRecord.drugAllergy : null}<br />
                                    
                                </Card.Text>
                            </Card.Body>
                        </Card>) : (<Card style={{ width: '100%', minHeight: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h4 style={{ textAlign: 'center' }}>Vui l??ng ch???n h??? s??</h4>
                        </Card>)}
                    </Col>
                </Row>
            </Container>
            {/* {info.show ? <ModalBrand info={info} handleShow={handleShow} onHide={handleHideModal} handleShowError={handleShowError} /> : null} */}
        </Layout>
    );
}

export default MedicalRecord;