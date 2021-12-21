import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import Layout from '../../components/Layout';
import axios from '../../helpers/axios';
import ModalDoctor from './modalDoctor';
import './style.css';

function Home(props) {
  const [doctors, setDoctors] = useState([]);
  const [info, setInfo] = useState({ show: false, id: null });
  useEffect(() => {
    axios.get(`/admin/listDoctor`)
      .then(res => setDoctors(res.data))
  }, [])
  const showItems = (rsTest) => {
    let rs = null;
    if (rsTest) {
      rs = rsTest.map((rs, index) => {
        return (
          <tr key={index}>
            <td>{++index}</td>
            <td>{rs.firstName}</td>
            <td>{rs.address}</td>
            <td>{rs.birthday}</td>
            <td>
              <Button onClick={()=>{
                setInfo({ show: true, id: null , doctor: rs})
              }} variant="light">Sửa</Button>
              <Button onClick={(rs) => {

              }} variant="dark">Xóa</Button>
            </td>
          </tr >
        )
      });
    }
    return rs;
  }
  const handleShow = () => {
    setInfo({
      ...info,
      show: !info.show
    });
    axios.get(`/admin/listDoctor`)
      .then(res => setDoctors(res.data))
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
  return (
    <Layout sidebar>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Ngày sinh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {showItems(doctors)}
          </tbody>
        </Table>
      </Container>
      {info.show ? <ModalDoctor info={info} handleShow={handleShow} onHide={handleHideModal} handleShowError={handleShowError} /> : null}
    </Layout>
  );
}

export default Home;