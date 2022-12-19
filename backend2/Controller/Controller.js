const { con } = require("./../Modal/Modal");
const { uploadS3 } = require("../service/awsUpload");

let get = async (req, res) => {
  try {
    const data = "SELECT * FROM product";
    await con.query(data, (err, result) => {
      if (err) {
        return res.send({ status: 400, response: err.sqlMessage });
      }
      res.send({ status: 200, response: "all product", product: result });
    });
  } catch (err) {
    res.send(err.sqlMessage);
  }
};



let postData = async (req, res) => {
  try {
    const { Title, Description, Qty, Price, Date } = req.body;
    let link;
    if (!req.files || !Title || !Description || !Qty || !Price || !Date) {
      return res.send({ status: 400, response: "Share full data" });
    }
    if (req.files) {
      const image = req.files["Image"];
      console.log("Image", image);
      
      link = await uploadS3(image.data, image.name);
      console.log("first", link);
    }

    const data = {
      Title,
      Description,
      Qty,
      Price,
      Date,
      Image: link.Location,
    };
    console.log(data);
    const q1 = "insert into product set ?";
    await con.query(q1, data, (err, result) => {
      if (err) {
        return res.send({ status: 400, response: err.sqlMessage });
      }
      res.send({ status: 200, response: "product added", result });
    });
    // }
  } catch (err) {
    res.send({ status: 400, response: err.message });
  }
};

module.exports = { get, postData };
