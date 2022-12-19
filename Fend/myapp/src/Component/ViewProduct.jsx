import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';

import ListGroup from 'react-bootstrap/ListGroup';

function ViewProduct() {
  const [data, setData] = useState([])
  const [filterSearch, setFilterSearch] = useState('')

  useEffect(() => {
    async function getdata() {
      let response = await fetch("http://localhost:5000/api/get-data")
      let data = await response.json()
      console.log("response", data)
      setData(data.product)

    }
    getdata()
  }, [])

  const search = (data1) => {
    return data1.filter(
      (item) =>
        item.Title.toLowerCase().includes(filterSearch) ||
        item.Description.toLowerCase().includes(filterSearch),
    )
  }

  return (
    <div className='container'>
      <div className="row gx-5">
        <div className="col">
          <div className="p-3"></div>
        </div>
        <div className="col">
          <div className="p-3"><input
            placeholder="search here"
            style={{ width: 300, marginBottom: 8 }}
            onChange={(e) => setFilterSearch(e.target.value)}
          /></div>
        </div>
      </div>

      <div className="row">
        {
          search(data).map((d, index) => {
            return (
              <>
                <Card className="row" style={{ display: "contents" }} >
                  <div className="col-6 justify-content-right ">
                    <Card.Header className="col-6 justify-content-right " >
                      <Card.Title></Card.Title>
                      <Card variant="top" src="holder.js/100px180">
                        <img src={d.Image} alt="" />
                      </Card>

                    </Card.Header>
                  </div>
                  <div className="col-6 justify-content-left ">
                    <Card.Body className="col-6 justify-content-left " >
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          {d.Title}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          {d.Description}

                        </ListGroup.Item>
                        <ListGroup.Item>
                          {d.Qty}

                        </ListGroup.Item>
                        <ListGroup.Item>
                          {d.Price}

                        </ListGroup.Item>
                        <ListGroup.Item>
                          {d.Date}

                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </div>
                </Card>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default ViewProduct
