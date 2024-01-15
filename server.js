const express = require("express");
const AWS = require("aws-sdk");

const app = express();
const port = 3001;

AWS.config.update({ region: "ap-south-1" }); // Set your AWS region here

app.get("/detect-face", async (req, res) => {
  const bucket = "ra140203";
  const photo = "modi.png";

  const rekognition = new AWS.Rekognition();
  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: photo,
      },
    },
    Attributes: ["ALL"],
  };

  try {
    const data = await rekognition.detectFaces(params).promise();
    res.json({ success: true, data: data.FaceDetails });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
