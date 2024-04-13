import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits : {filesize : 1024*1024, },
}); 

export default upload;