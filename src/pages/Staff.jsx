import React from 'react';
import {Table} from 'antd'
const Staff = () => {
    const dataSource = [
        {
          key: '1',
          id:'S01',
          name: 'Mike',
          designation:'Manager',
          email:'mike@resourcemanagement.com',
          phone:'980123456',
          hiredate:'2022-02-18',
        },
        {
          key: '2',
          id:'S02',
          name: 'John',
          designation:'Accountant',
          email:'john@resourcemanagement.com',
          phone:'980156111',
          hiredate:'2022-05-28',
        },
      ];
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
        {
          title: 'Designation',
          dataIndex: 'designation',
          key: 'designation',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },   {
            title: 'Hiredate',
            dataIndex: 'hiredate',
            key: 'hiredate',
          },
      ];

    return (
        <div>
            <h1>Staff:</h1>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    );
};

export default Staff;