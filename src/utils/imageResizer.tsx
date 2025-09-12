import Resizer from "react-image-file-resizer";

export const resizeImage = (
  file: any,
  maxWidth: number = 1920,
  maxHeight: number = 1920
) => {
  if (file?.type === "image/gif") {
    return file;
  } else if (file?.type == "image/svg+xml") {
    return file;
  }


  
  if (file?.type === "image/png") {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        "png",
        90,
        0,
        (uri) => resolve(uri),
        "file",
      );
    });
  }

  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(uri as File);
      },
      "file"
    );
  });
};

export default resizeImage;



