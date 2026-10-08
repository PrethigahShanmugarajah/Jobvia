// Jobvia / Server / utils / cloudinaryUtils.js

/* -------- Extract Public Id from Cloudinary URL -------- */
export const getPublicIdFromUrl = (url, resourceType) => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex === -1) {
      return null;
    }

    const pathAfterVersion = parts.slice(uploadIndex + 2).join("/");

    if (resourceType === "raw") {
      return (
        pathAfterVersion.substring(0, pathAfterVersion.lastIndexOf(".")) ||
        pathAfterVersion
      );
    }
  } catch (error) {
    return null;
  }
};
