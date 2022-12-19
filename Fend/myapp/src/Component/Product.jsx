import React, { useState } from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import axios from 'axios'
import Table from 'react-bootstrap/Table';


let arr = []

function Product() {
  const [noOfRows, setNoOfRows] = useState(1);
  const [itemData, setItemData] = useState([]);
  const [image, setImage] = useState({
    file: []
  })

  const [product, setProduct] = useState({
    Title: "",
    Description: "",
    Qty: "",
    Price: "",
    Date: ""
  });

  const imageUpload = (e) => {
    setImage({ ...image, file: e.target.files[0] })
  }


  const postdata = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProduct({ ...product, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault();
    const { Title, Description, Qty, Price, Date } = product

    const formData = new FormData()
    itemData && itemData.map((val, index) => {
      console.log(val, "item data values")
      formData.append('Image', image.file)
      formData.append('Title', val.Title)
      formData.append('Description', val.Description)
      formData.append('Qty', val.Qty)
      formData.append('Price', val.Price)
      formData.append('Date', val.Date)
      console.log('{{{image}}}', image)


      const config = {
        "Content-Type": "multipart/form-data"
      }
      // for (const values of formData.values()) {
      //   console.log(values, "kkkkk", "itemData")
      // }
      const res = axios.post("http://localhost:5000/api/post-data", formData, config)
      console.log(res, "postdata")
      window.alert("Data inserted")

     

    })

   

  }


  const pushData = async () => {
    setItemData([...itemData, product]);
    setProduct({
      Title: "",
      Description: "",
      Qty: "",
      Price: "",
      Date: ""
    })

  }

  const dataRemove = (id) => {
    const newItem = itemData.filter((newVal, index) => {
      return index !== id;
    });
    setItemData(newItem);
  }
  for (const key in itemData) {
    console.log("itemData for", itemData[key])
  }

  return (
    <div className='container' style={{ marginRight: "30rem", width: "100vw" }}>
      <div className="col-10 ">
        <div className="col-md-10"  ></div>
        <div className="row-10 ">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Quantiy</th>
                <th>Price</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemData.map((val, index) => {
                console.log(val, "mc")
                return (
                  <tr key={index} >
                    <td>{val.Image}</td>
                    <td>{val.Title}</td>
                    <td>{val.Description}</td>
                    <td>{val.Qty}</td>
                    <td>{val.Price}</td>
                    <td>{val.Date}</td>
                    <td><button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => dataRemove(index)}>
                      <MinusOutlined />
                    </button></td>
                  </tr>
                )

              })

              }
              <tr>
                <td><input type="file" multiple name="Image" onChange={imageUpload} required/></td>
                <td><input type="text" name="Title" value={product.Title} onChange={postdata} required/></td>
                <td><input type="text" name="Description" value={product.Description} onChange={postdata} required/></td>
                <td><input type="number" name="Qty" value={product.Qty} onChange={postdata} required/></td>
                <td><input type="number" name="Price" value={product.Price} onChange={postdata} required/></td>
                <td><input type="date" name="Date" value={product.Date} onChange={postdata} required/></td>
                <td>

                  <button
                    type="button"
                    className="btn btn-primary me-3"
                    onClick={() => { pushData(); setNoOfRows(noOfRows + 1) }}>
                    <PlusOutlined />
                  </button>
                </td>
              </tr>



            </tbody>


          </Table>
          <button className="btn btn-primary" onClick={postData} > Save </button>
        </div>
      </div>
    </div>

  )
}

export default Product
