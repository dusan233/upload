import formidable from "formidable";
import { ZodError } from "zod";
import { filesObjToArray } from "../utils.js";

export default (options, schema) => async (req, res, next) => {
  let cancelUploads = false;

  const form = formidable({
    maxFileSize: options.maxFileSize,
    maxTotalFileSize: options.maxTotalFileSize,
    maxFiles: options.MaxFiles,
    filter: ({ mimetype }) => {
      const validMimeType = options.isValidMimeType(mimetype);

      if (!validMimeType) {
        //this will make sure that form.parse throws error;
        form.emit("error", new Error("Invalid file mimeType"));
        cancelUploads = true;
      }
      return !cancelUploads && validMimeType;
    },
  });

  try {
    const [_, files] = await form.parse(req);

    const validatedFiles = schema.parse(files);
    req.files = filesObjToArray(validatedFiles);
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return next(err.errors[0]);
    }

    return next(err);
  }
};
