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

// let postData = async (req,res) =>{
//     try{
//         let data1 = req.body;
//         const query1 = "INSERT INTO product set ?"
//         await con.query(query1, data1, (err,result) =>{
//             if(err){
//                 return res.send(err.sqlMessage)
//             }
//             res.send({status :200, "response":result})
//          })
//     }
//     catch (err){
//         res.send(err.sqlMessage);
//     }
// }

let postData = async (req, res) => {
  try {
    const { title, description, qty, price, date } = req.body;
    let link;
    if (!req.files || !title || !description || !qty || !price || !date) {
      return res.send({ status: 400, response: "Share full data" });
    }
    if (req.files) {
      const image = req.files["image"];
      console.log("image", image);
      //   if (image !== undefined) {
      //   const fileBuffer = image.data;
      //   const fileName = image.name;
      //   const fileBuffer = file.data;
      link = await uploadS3(image.data, image.name);
      console.log("first", link);
      //   }

      const data = {
        title,
        description,
        qty,
        price,
        date,
        image: link.Location,
      };
      console.log(data);
      const q1 = "insert into product set ?";
      await con.query(q1, data, (err, result) => {
        if (err) {
          return res.send({ status: 400, response: err.sqlMessage });
        }
        res.send({ status: 200, response: "product added", result });
      });
    }
  } catch (err) {
    res.send({ status: 400, response: err.message });
  }
};

module.exports = { get, postData };
