import React, { useEffect, useState } from 'react';
import { Table, Spin, Button, Popconfirm, Modal, Form, Dropdown } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import HTTP from '../components/server';


const Comment = () => {

  // defined required fields
  const [dataSource, setDataSource] = useState([]);
  const [loaded, setLoaded] = useState(true);

  const [id, setId] = useState();
  const [title, setTitle] = useState();

  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);


  // function defined for open edit
  const editOpen = () => {
    setEditVisible(true);
  }
  // close edit function
  const editClose = () => {
    setEditVisible(false);
  }

  // function designed for open add modal
  const addOpen = () => {
    setAddVisible(true);
  }

  // function designed for close add modal
  const addClose = () => {
    setAddVisible(false);
  }

  // function keeps track of edited field
  const handleEdit = (value) => {
    setId(value.id);
    setTitle(value.title)
  }

  // function for update the changes in the database
  const updateEdit = async() =>{
    editClose();
    const data = {
      id: id,
      title: title
    }
    const response = await HTTP.put('Category/UpdateCategory',data);
    console.log("Update reponse:  ", response);
    getData();
  }

  // function for add new category in the database
  const addCategory = async () => {
    addClose();

    const addCategoryData =
    {
      id: id,
      title: title

    }
    await HTTP.post('Category/AddCategory', addCategoryData);
    getData();
  }

  // function for delete the category 
  const handleDelete = async(value) => {
    const response = await HTTP.delete(`Category/${value.id}`);
    getData();
    console.log("Delete reponse: ", response);
  }

  // function for get all the category from the database 
  const getData = async () => {
    const data = await HTTP.get('Category/GetAllCategories');
    console.log(data);
    setDataSource(data.data);
    setLoaded(false);
  }

  // initial call function
  useEffect(() => {
    getData();
  }, []);


  // defining the columns for the table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <>
            <Popconfirm title="Do you want to delete? "
            onConfirm={() =>handleDelete(record)}
            >
              <Button
                danger
                style={{fontWeight:'bold', backgroundColor:'#f56038'}}
                type='primary'
                shape='round'
              >
                Delete
              </Button>
            </Popconfirm>&nbsp;

            <Button
            style={{fontWeight:'bold', backgroundColor:'#5885AF'}}
              type='primary'
              shape='round'
              onClick={() => { editOpen(); handleEdit(record) }}
            >
              Edit
            </Button>
          </>
        ) : null
    },
  ];

  // dropdown menu
  
  return (
    <div>
      <h1>Category list: </h1>

      {/* loader while fetching the data  */}
      <Spin spinning={loaded} delay={10}>

        {/* Add button */}
        <Button
          style={{ float: 'right', backgroundColor:'#5885AF', fontWeight:'bold'}}
          type='primary'
          icon={<PlusCircleOutlined />}
          shape='round'
          onClick={() => setAddVisible(true)}
        >ADD
        </Button>

        <Table style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }} dataSource={dataSource} columns={columns} />;

        <Modal
          title="Edit form"
          visible={editVisible}
          onCancel={() => { editClose() }}
          footer={null}
        >
          <Form>
            <Form.Item
              label="ID:"
            >
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Name"
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Item>


            <Button
              danger
              type='primary'
              shape='round'
              onClick={() => {editClose()}}
            > Cancel</Button>
            &nbsp;
            &nbsp;
            <Button
              type='primary'
              onClick={() => updateEdit()}
              shape='round'
            >Update</Button>
          </Form>


        </Modal>

        <br />
        <Modal
          title="Add Category: "
          visible={addVisible}
          onCancel={() => { addClose() }}
          footer={null}
        >
          <Form>
            <Form.Item
              label="ID:"
            >
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Name"
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Item>


            <Button
              danger
              type='primary'
              onClick={() => setAddVisible(false)}
              shape='round'
            >Cancel</Button>
            &nbsp;
            &nbsp;
            <Button
              type='primary'
              onClick={() => {addCategory();}}
              shape='round'
            >ADD</Button>
          </Form>

        </Modal>


      </Spin>

    </div>
  );
};

export default Comment;