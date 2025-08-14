import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

const getMulterStorage = (folderName: string) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadFolder = folderName || 'folder1';
            const folderPath = path.join(__dirname, '../../public/uploads', uploadFolder);

            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        }
    });
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = [
        // Images
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/jpg',
        'image/webp',
        // Excel
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Your file type is not allowed!') as any, false);
    }
};

const upload = ({ folderName }: { folderName: string }) => {
    const storage = getMulterStorage(folderName);
    return multer({ storage, fileFilter });
};

export { upload };
