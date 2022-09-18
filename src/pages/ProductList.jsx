import React, { useEffect, useState } from 'react';
import { Spin, Table, Button, Popconfirm, Modal, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import HTTP from '../components/server';
import '../CSS/Product.css'
const ProductList = () => {

  // declaring required fields 
  const [loaded, setLoaded] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [id, setID] = useState("");
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [category, setCategory] = useState("");

  const [categoryId, setCategoryID] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");


  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);


  // fuction for clearing input fields
  const emptyField = () => {
    setID();
    setName();
    setQuantity(0);
    setPrice(0.0);
    setCategory();
  }

  // open add form 
  const openAdd = () => {
    setAddVisible(true);
    getCategoryList();
    emptyField();
  }

  // close add form
  const closeAdd = () => {
    setAddVisible(false);
    emptyField();
  }

  // open edit form 
  const openEdit = () => {
    console.log("data source: ",dataSource);
    getCategoryList();
    setEditVisible(true);
  }

  // close edit form 
  const closeEdit = () => {
    setEditVisible(false);
    emptyField();
  }


  const updateDatabase = async() => {
    closeEdit();
    let catID;

    for (var i = 0; i < categoryList.length; i++) {
      if (categoryList[i].title == category) {
        catID = categoryList[i].id;

      }
    }
    const data = {
      id: id,
      name: name,
      quantity: quantity,
      price: price,
      categoryID: catID
    }
    catID="";
    await HTTP.put('controller/UpdateProduct', data);
    getData();

  }

  // get all the product lists
  const getData = async () => {


    // console.log("categoryList: ", categoryList);
    const data = await HTTP.get('controller/GetAllProducts');
    if (data) {
      setLoaded(false);
    }
    console.log(data);
    console.log(data.data[1].category.title);
    setDataSource(data.data);
  }

  //get all the category list
  const getCategoryList = async () => {
    const data = await HTTP.get('Category/GetAllCategories');
    const value = data.data;
    console.log("value:", value);
    setCategoryList(value);
  }
  // initial call
  useEffect(() => {
    getData();
  }, []);




  // function for delete the product
  const handleDelete = async (value) => {
    await HTTP.delete(`controller/${value.id}`);
    getData();
  }



  // function for add the product
  const addProduct = async () => {
    emptyField();
    closeAdd();

    let catID;

    for (var i = 0; i < categoryList.length; i++) {
      if (categoryList[i].title == category) {
        catID = categoryList[i].id;

      }
    }

    const data = {
      id: id,
      name: name,
      quantity: quantity,
      price: price,
      categoryID: catID

    }
    catID="";
    await HTTP.post('controller/AddProduct', data);
    getData();
  }

  // function for update the product details
  const handleUpdate = async (value) => {
    emptyField();
    await HTTP.get(`controller/${value.id}`)
      .then(res => {
        if (res) {
          const retriveData = res.data;
          setID(retriveData.id);
          setName(retriveData.name);
          setQuantity(retriveData.quantity);
          setPrice(retriveData.price);
          setCategory(retriveData.category);
          openEdit();

        }
      })

  }
// defining the columns for the table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price', width: 150,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 250,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <>
            <Popconfirm title="Do you want to delete? "
              onConfirm={() => { handleDelete(record); }}
            >
              <Button
                danger
                style={{fontWeight:'bold'}}
                type='primary'
                shape='round'
              >
                Delete
              </Button>
            </Popconfirm>
            &nbsp;
            &nbsp;
            <Button
            style={{backgroundColor:'#5885AF', fontWeight:'bold'}}
              type='primary'
              shape='round'
              onClick={() => handleUpdate(record)}
            >
              Edit
            </Button>
          </>
        ) : null
    },
  ];

  return (
    <div>
      <h1>Product List: </h1>
      <Spin spinning={loaded} delay={10}>
        <Button
          style={{ float: 'right', backgroundColor:'#5885AF', fontWeight:'bold' }}
          type='primary'
          icon={<PlusCircleOutlined />}
          shape='round'
          onClick={() => openAdd()}
        >ADD
        </Button>
        <Table
          style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30 }}
          dataSource={dataSource}
          columns={columns}
          size="small"
          pagination={{
            pageSize: 10,
          }}
        />
        <Modal
          title="Edit form"
          visible={editVisible}
          onCancel={() => { closeEdit() }}
          footer={null}
        >
          <Form>    

            <Form.Item
              label="Name"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Quantity:"
            >
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type='number'
              />
            </Form.Item>

            <Form.Item
              label="Price:"
            >
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type='number'
              />
            </Form.Item>
            <Form.Item
              label="Category:"
            >
                <select onChange={(e) => setCategory(e.target.value)}>
                {
                  categoryList.map((item, index) => (
                    <option>{item.title}</option>
                  ))
                }
              </select>
            </Form.Item>

            <Button
              danger
              type='primary'
              shape='round'
              onClick={() => {
                closeEdit(); emptyField();
              }}
            >Cancel</Button>
            &nbsp;
            &nbsp;

            <Button
              type='primary'
              onClick={() => { updateDatabase();}}
              shape='round'
            >Update</Button>
          </Form>
        </Modal>

        <Modal
          title="Add Product"
          visible={addVisible}
          onCancel={() => closeAdd()}
          footer={null}
        >
          <Form>
            <Form.Item
              label="ID:"
            >
              <input
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Name"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Quantity:"
            >
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type='number'
              />
            </Form.Item>


            <Form.Item
              label="Price:"
            >
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type='number'
              />
            </Form.Item>
            <Form.Item
              label="Category:"
            >
              <select onChange={(e) => setCategory(e.target.value)}>
                {
                  categoryList.map((item, index) => (
                    <option>{item.title}</option>
                  ))
                }
              </select>
            </Form.Item>
            <Button
              danger
              type='primary'
              shape='round'
              onClick={() => {
                closeAdd(); emptyField();
              }}
            >Cancel</Button>
            &nbsp;
            &nbsp;
            <Button
              type='primary'
              onClick={() => { addProduct() }}
              shape='round'
            >Add</Button>
          </Form>
        </Modal>
      </Spin>


    </div>
  );
};

export default ProductList;