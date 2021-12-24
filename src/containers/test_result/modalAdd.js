import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Table, Col } from 'react-bootstrap';
import axios from 'axios';
import { ROOT } from '../../actions/constants';
import ItemAdd from './itemAdd';

function ModalAdd(props) {
    const [test, setTest] = useState({

    });
    const [FileList, setFileList] = useState({ length: 3 });
    const [ImageList, setImageList] = useState({ length: 3 });
    const [arrTest, setArrTest] = useState([]);
    let onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        value = target.type === 'file' ? target.files : value;
        setTest({
            ...test,
            [name]: value
        });
    }
    let onChangeImage = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        value = target.type === 'file' ? target.files[0] : value;
        // console.error('value-file: ', value)
        setImageList({
            ...ImageList,
            [target.dataset.index]: value
        });
    }
    const [validated, setValidated] = useState(false);
    let onHandleSubmit = (e) => {
        e.preventDefault();
        console.error('test111: ', props.testFormId)
        axios.put(`http://192.168.43.158:8080/api/admin/done-result?testFormId=${props.info.testFormId}`).then(res => {
            console.error('test: ', res)
            if (res.data.status) {
                alert('Thêm kết quả xét nghiệm thành công!');
                props.handleShow();
            } else {
                alert('Thêm kết quả xét nghiệm thất bại!')
            }
        })
    }
    useEffect(() => {
        axios.get(`http://192.168.43.158:8080/api/admin/subclinical-by-test?testFormId=${props.info.id}`)
            .then(res => { setArrTest(res.data); console.error('res-data: ', res.data) })
    }, [])
    const showItems = (arrTest) => {
        let rs = null;
        if (arrTest) {
            rs = arrTest.map((test, index) => {
                return (
                    <ItemAdd index={index} test={test} resultId={props.info.resultId} />
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
                                <th>Image</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showItems(arrTest)}
                        </tbody>
                    </Table>
                    {/* <Col xs={12} md={12}>
                        <Input
                            value={test.conclude}
                            placeholder={`...`}
                            name="conclude"
                            label={`Kết quả xét nghiệm:`}
                            onChange={(e) => onChange(e)}
                        />
                    </Col> */}
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