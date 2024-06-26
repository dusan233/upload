import { supabaseClient } from "./supabase-client.js";
import fs from "fs";

export const uploadFile = async (file, path) => {
  const fileContent = await fs.promises.readFile(file.filepath);
  const { data, error } = await supabaseClient.storage
    .from("booking-images")
    .upload(path, fileContent, {
      contentType: file.mimetype,
    });

  if (error) {
    console.log("Error upload went very wrong!", error);
  }

  return data;
};

export const getFileUrl = (path) => {
  const { data } = supabaseClient.storage
    .from("booking-images")
    .getPublicUrl(path);

  return data;
};
