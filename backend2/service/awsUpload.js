const AWS = require("aws-sdk");
const S3 = new AWS.S3({
   accessKeyId: "XXX",
   secretAccessKey: "XXX",
   region: "XXX",
});
let uploadS3 = async (fileContent, fileName) => {
  const params = {
    Bucket: "XXX",
    Key: fileName,
    Body: fileContent,
  };
  const uploadFile = await S3.upload(params).promise();
   return uploadFile;
};

module.exports = { uploadS3 };
