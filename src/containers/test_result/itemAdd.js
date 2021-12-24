import React, { useEffect, useState } from 'react';
import Input from './../../components/UI/Input';
import { Modal, Button, Form, Table, Col } from 'react-bootstrap';
import axios from 'axios';
import { ROOT } from '../../actions/constants';

function ItemAdd(props) {
    const [file, setFile] = useState({
        imageUrl: '',
        fileUrl: ''
    })
    const [check, setCheck] = useState(true);
    let onChangeFile = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        value = target.type === 'file' ? target.files[0] : value;
        setFile({
            ...file,
            [name]: value
        });
    }
    return (
        <tr key={props.index}>
            <td>{props.index}</td>
            <td>{props.test.testName}</td>
            <td>{props.test.price}</td>
            <td style={{ maxWidth: 200, overflow: 'hidden' }}>
                <Input
                    placeholder={`...`}
                    type="file"
                    name="imageUrl"
                    onChange={(e) => onChangeFile(e)}
                />
            </td>
            <td style={{ maxWidth: 200, overflow: 'hidden' }}>
                <Input
                    placeholder={`...`}
                    type="file"
                    name="fileUrl"
                    onChange={(e) => onChangeFile(e)}
                />
            </td>
            <td style={{ maxWidth: 200, overflow: 'hidden' }}>
                {check ? (<Button onClick={() => {
                    const form = new FormData();
                    form.append("imageUrl", file.imageUrl);
                    form.append("fileUrl", file.fileUrl);
                    form.append("resultId", props.resultId);
                    axios.post('http://192.168.43.158:8080/api/admin/test-result-detail', form)
                        .then(res => {
                            if (res.status) {
                                alert('Lưu thành công!');
                                setCheck(false);
                            }else{
                                alert('Vui lòng kiểm tra lại file!');
                            }
                        })
                }}>Lưu</Button>) : null}
            </td>
        </tr >
    );
}

export default ItemAdd;