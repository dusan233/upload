import express from "express";
import "dotenv/config";
import cors from "cors";
import parseFileUpload from "./middleware/parse-file-upload.js";
import { isValidMimeType, generateFilePath } from "./utils.js";
import { uploadBookingMediaSchema } from "./validation.js";
import { getFileUrl, uploadFile } from "./upload-file.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

app.post(
  "/api/media/upload",
  parseFileUpload(
    {
      maxFileSize: 10000000,
      maxTotalFileSize: 10000000 * 5,
      maxFiles: 18,
      isValidMimeType,
    },
    uploadBookingMediaSchema
  ),
  async function (req, res, next) {
    const uploadRes = await Promise.all(
      req.files.map((file) => {
        const filePath = generateFilePath(file);
        return uploadFile(file, filePath);
      })
    );

    const data = uploadRes.map((fileData) => getFileUrl(fileData.path));

    return res.json({
      message: "Uploaded successfully!",
      data,
    });
  }
);

app.use((err, req, res, next) => {
  return res.json({
    message: "Something went wrong!",
    error: err.message,
  });
});

app.listen(8000, () => {
  console.log("works");
});
