
import { Request } from "express";
import fs from "fs/promises";
import path from "path";

export async function cleanupFile({ req, uploadFolder }: { req: Request, uploadFolder: string }) {
  if (req.file) {
    const filePath = path.join(__dirname, `../../public/uploads/${uploadFolder}`, req.file.filename);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error("Failed to remove file:", filePath, err);
    }
  }
}
