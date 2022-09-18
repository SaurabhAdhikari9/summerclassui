import React, { useEffect, useState } from 'react';
import HTTP from '../components/server';
import { Spin, Table, Button, Popconfirm, Modal, Form } from 'antd';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
const Analytics = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loaded, setLoaded] = useState(true);

    const [dataStaff, setData] = useState([]);
    const [loadedStaff, setLoadedStaff] = useState(true);

    const getData = async () => {
        const data = await HTTP.get('Chart/GetAllProductSales');
        
        if (data) {
            setLoaded(false);
        }
        setDataSource(data.data);
      }

    const getDataStaff = async()=> {
        const dataStaff = await HTTP.get('Chart/GetAllStaffSales');
       
        if (dataStaff) {
            setLoadedStaff(false);
        }
        setData(dataStaff.data);
        }

      const columnsStaff = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300,
          },
          {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
            width: 150,
          }
      ]

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 300,
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
          width: 300,
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          width: 150,
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
            width: 150,
          }
      ];

      useEffect(() => {
        getData();
      }, []);

      useEffect(() => {
        getDataStaff();
      }, []);

    return (
        <div>
            <h1>Analytics - Products</h1>
           
            <Spin spinning={loaded} delay={10}>
                <Table
                style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}
                dataSource={dataSource}
                columns = {columns}
                size="small"
                pagination={{
                    pageSize: 15,
                }}
                />
                
                <PieChart width={400} height={400} style={{float:"right"}}>
                <Pie
                    dataKey="sales"
                    isAnimationActive={false}
                    data={dataSource}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label />
                <Tooltip />
                </PieChart>

                <BarChart
                    width={800}
                    height={400}
                    data={dataSource}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    
                    <XAxis dataKey="name"/>
                     <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        height={1}
                        
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="sales" fill="#8884d8" background={{ fill: '#eee' }}/>
                    <Bar dataKey="quantity" fill="#82ca9d" background={{ fill: '#eee' }}/>
                </BarChart>
            </Spin>

            <h1>Analytics - Staffs</h1>
            <Spin spinning={loadedStaff} delay={10}>
                <Table
                style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}
                dataSource={dataStaff}
                columns = {columnsStaff}
                size="small"
                pagination={{
                    pageSize: 15,
                }}
                />

                <PieChart width={400} height={400} style={{float:"right"}}>
                <Pie
                    dataKey="sales"
                    isAnimationActive={false}
                    data={dataStaff}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label />
                <Tooltip />
                </PieChart>

                    <BarChart
                        width={500}
                        height={300}
                        data={dataStaff}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="sales" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
            </Spin>
        </div>
    );
};

export default Analytics;