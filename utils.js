export const isValidMimeType = (mimeType) => {
  return mimeType && (mimeType.includes("image") || mimeType.includes("video"));
};

export const filesObjToArray = (files) => {
  const filesArr = [];

  for (let key in files) {
    filesArr.push(...files[key]);
  }

  return filesArr;
};

export const generateFilePath = (file) => {
  let rootFolder = "/images";
  if (file.mimetype.includes("video")) rootFolder = "/videos";
  const newFileName = file.newFilename + "." + file.mimetype.split("/")[1];
  return `${rootFolder}/${newFileName}`;
};
