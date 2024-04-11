import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (_req: any, _file: any, cb: (arg0: null, arg1: string) => void) {
    cb(null, './uploads')
  },
  filename: function (_req: any, file: { fieldname: string; }, cb: (arg0: null, arg1: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage: storage });

export default upload;
