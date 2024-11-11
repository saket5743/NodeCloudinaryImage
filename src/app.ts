import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer'
import mongoose, { Schema, Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'
import { v2 as cloudinary } from 'cloudinary';
const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})


const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, './uploads')
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    console.log("inside filename function", file);
    const random = uuidv4()
    cb(null, random + "" + file.originalname)
  }
})

const upload = multer({ storage: storage })

interface MyDocument extends Document {
  Image_Url: string;
}

const MySchema = new Schema<MyDocument>({
  Image_Url: { type: String, required: true },
});

import connectDB from "./db/connect"

connectDB();

const Image: Model<MyDocument> = mongoose.model<MyDocument>('Image', MySchema)


app.post('/', upload.single('myfile'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file?.path!);
    console.log("Cloudinary", uploadResult);

    const newvar = new Image({ Image_Url: uploadResult.secure_url });
    await newvar.save().then(() => console.log('Work is completed'))

    // Delete the file
    fs.unlink((req.file?.path!), function (err: NodeJS.ErrnoException | null) {
      if (err) console.log(err);
      console.log("Deleted File")
    })
    res.json({
      msg: 'file uploaded',
      your_url: { image_url: uploadResult.secure_url }
    });
  } catch (error) {
    console.log("ERROR", error)
    next(error)
  }
})

let port = process.env.PORT || 5050

const start = async () => {
  console.log("DB Connected");
  app.listen(port, () => {
    console.log(`The port is listening on ${port}`)
  })
}

start();