import React, { useEffect, useState } from 'react';
import HTTP from '../components/server';
import { Spin, Table, Button, Popconfirm, Modal, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const Orders = () => {
    // defining variable
    const [orderData, setOrderData] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [addVisible, setAddVisible] = useState(false);

    const [staffs, setStaffs] = useState([]);
    const getStaffs = async () => {
        const response = await HTTP.get('Authentication/GetAllStaffs');
        setStaffs(response.data);
    }

    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const reponse = await HTTP.get('controller/GetAllProducts');
        setProducts(reponse.data);
    }

    const [id, setId] = useState();
    const [staffID, setStaffID] = useState();
    const [orderLine, setOrderLine] = useState({
        orderID: id,
        productID: products.id,
        quantity: 0
    })

    const getOrders = async () => {
        const response = await HTTP.get('controller/GetAllOrders');
        // console.log("response",response.data);
        setOrderData(response.data);
        setLoaded(false);
    }

    useEffect(() => {
        getOrders();
    }, [])

    const openAdd = () => {
        // console.log(orderLine.productID);
        getStaffs();
        getProducts();
        setAddVisible(true);
        // setOrderLine((p) => ({...p, productID:products[0].id}))
    }

    const closeAdd = () => {
        setStaffs([]);
        setProducts([]);
        setAddVisible(false);
    }

    const addOrder = async () => {
        console.log(orderLine);
        let pID;
        let sID;
        for (var p = 0; p < products.length; p++) {
            if (orderLine.productID === products[p].name) {
                pID = products[p].id;
                console.log(pID);
            }
        }

        for (var s = 0; s < staffs.length; s++) {
            if (orderLine.staffID === staffs[s].name) {
                sID = staffs[s].id;
                console.log(sID);
            }
        }
        const data = {
            id: id,
            staffID: sID,
            orderLines: [{
                orderID: id,
                productID: pID,
                quantity: orderLine.quantity
            }]
        }
        console.log(data);
         await HTTP.post('controller/PostOrder', data);
         closeAdd();
        getOrders();
    }

    const column = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
        }, {
            title: 'Order Date',
            dataIndex: 'orderedDate',
            key: 'orderedDate',
            width: 150,
        }, {
            title: 'Total amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 150,
        },
    ]
    return (
        <div>
            <h1>Orders:</h1>
            <Spin spinning={loaded} delay={10}>
                <Button
                    style={{ float: 'right', backgroundColor: '#5885AF', fontWeight: 'bold' }}
                    type='primary'
                    icon={<PlusCircleOutlined />}
                    shape='round'
                    onClick={() => openAdd()}
                >ADD
                </Button>
                <Table
                    style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}
                    dataSource={orderData}
                    columns={column}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.orderLines.productID}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                />
                <Modal
                    title="Add Product"
                    visible={addVisible}
                    onCancel={() => closeAdd()}
                    footer={null}
                >
                    <Form>
                        <Form.Item
                            label="ID: "
                        >
                            <input
                                value={id}
                                onChange={(e) => { setId(e.target.value); setOrderLine((p) => ({ ...p, orderID: e.target.value })) }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Staff ID: "
                        >
                            <select onChange={(e) => setOrderLine((p) => ({ ...p, staffID: e.target.value }))}>
                                {
                                    staffs.map((item, index) => (
                                        <option>{item.name}</option>
                                    ))
                                }
                            </select>
                        </Form.Item>

                        <Form.Item
                            label="Product ID: "
                        >
                            <select onChange={(e) => setOrderLine((p) => ({ ...p, productID: e.target.value }))}>
                                {
                                    products.map((item, index) => (
                                        <option>{item.name}</option>
                                    ))
                                }
                            </select>
                        </Form.Item>
                        <Form.Item
                            label="Quantity: "
                        >
                            <input
                                value={orderLine.quantity}
                                type='number'
                                onChange={(e) => { setOrderLine((p) => ({ ...p, quantity: e.target.value })) }}
                            />
                        </Form.Item>

                        <Button
                            danger
                            type='primary'
                            shape='round'
                            onClick={() => {
                                closeAdd();
                            }}
                        >Cancel</Button>
                        &nbsp;
                        &nbsp;
                        <Button
                            type='primary'
                            onClick={() => { addOrder() }}
                            shape='round'
                        >Add</Button>
                    </Form>
                </Modal>
            </Spin>

        </div>
    );
};

export default Orders;