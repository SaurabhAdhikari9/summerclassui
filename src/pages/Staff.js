import React, { useEffect, useState } from 'react'
import HTTP from '../components/server'
import { Spin, Table, Button, Popconfirm, Modal, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
function Staff() {

    const [staffData, setStaffData] = useState([]);

    const getStaffs = async() => {
        const response = await HTTP.get('Authentication/GetAllStaffs');
        console.log(response.data);
        setStaffData(response.data);
    }
    useEffect( ()=> {
        getStaffs();
    },[])


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
          }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
          }, {
            title: 'Phone no',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 150,
          },
    ]
  return (
    <div>
        <h1>Staff: </h1>
        <Table dataSource={staffData}
        columns={columns}
        />
    </div>
  )
}

export default Staff