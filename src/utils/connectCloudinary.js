import { v2 as cloudinary } from 'cloudinary'

const cloudinaryAccess = () => {
  return cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.API_Key,
    api_secret: process.env.API_Secret,
  })
}
export default cloudinaryAccess
