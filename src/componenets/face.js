// Load the SDK
const AWS = require("aws-sdk");
import { useState } from "react";

// Replace these values with your own
const bucket = "ra140203"; // the bucket name without s3://
const photo = "modi.png"; // the name of the file
const profileName = "rahulyash"; // your AWS profile name
const region = "ap-south-1"; // the AWS region

// Configure AWS SDK
const credentials = new AWS.SharedIniFileCredentials({ profile: profileName });
AWS.config.credentials = credentials;
AWS.config.update({ region: region });

// Create an instance of the Rekognition client
const rekognition = new AWS.Rekognition();

// Define the parameters for face detection
const params = {
  Image: {
    S3Object: {
      Bucket: bucket,
      Name: photo,
    },
  },
  Attributes: ["ALL"],
};

// Perform face detection
rekognition.detectFaces(params, function (err, data) {
  if (err) {
    console.error(err, err.stack); // an error occurred
  } else {
    console.log(`Detected faces for: ${photo}`);
    data.FaceDetails.forEach((face) => {
      console.log(
        `The detected face is between: ${face.AgeRange.Low} and ${face.AgeRange.High} years old`
      );
      console.log("All other attributes:");
      console.log(`  BoundingBox.Width:      ${face.BoundingBox.Width}`);
      console.log(`  BoundingBox.Height:     ${face.BoundingBox.Height}`);
      console.log(`  BoundingBox.Left:       ${face.BoundingBox.Left}`);
      console.log(`  BoundingBox.Top:        ${face.BoundingBox.Top}`);
      console.log(`  Age.Range.Low:          ${face.AgeRange.Low}`);
      console.log(`  Age.Range.High:         ${face.AgeRange.High}`);
      console.log(`  Smile.Value:            ${face.Smile.Value}`);
      console.log(`  Smile.Confidence:       ${face.Smile.Confidence}`);
      // Add the rest of the attributes as needed
      console.log("------------");
      console.log("");
    });
  }
});

function DetectFace1(){
    const [result, setResult] = useState([])

    try{

    }catch

    return (
      <div>
        <button onClick={runRekognition}>Run Rekognition</button>
        {result && (
          <div>
            <h2>Results:</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    );
}