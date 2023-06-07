import util from 'util';
import multer from 'multer';

const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'storage/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage, limits: { fileSize: maxSize } });
const uploadFile = upload.single('file');

const uploadFileMiddleware = util.promisify(uploadFile);
export default uploadFileMiddleware;
