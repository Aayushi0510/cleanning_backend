import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    try {
      console.log(file); // Log the file object
  
      if (!file || !file.originalname || !file.buffer) {
        throw new Error('Invalid file object');
      }
  
      const parser = new DataUriParser();
      const extName = path.extname(file.originalname);
      console.log(extName);
  
      if (!extName) {
        throw new Error('Invalid file extension');
      }
  
      const dataUri = parser.format(extName, file.buffer);
      console.log(dataUri);
  
      return dataUri;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
export default getDataUri