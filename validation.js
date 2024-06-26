import z from "zod";

export const uploadBookingMediaSchema = z.object({
  images: z
    .array(z.any())
    .max(15)
    .refine(
      (files) => files.every((file) => file.mimetype.startsWith("image/")),
      "All '/images' files must be of image type"
    )
    .optional(),
  videos: z
    .array(z.any())
    .max(3)
    .refine(
      (files) => files.every((file) => file.mimetype.startsWith("video/")),
      "All '/videos' files must be of video type"
    )
    .optional(),
});
