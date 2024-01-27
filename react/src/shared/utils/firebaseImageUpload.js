import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";

const FirebaseImageUpload = async (fileSrc, title) => {
    const imageRef = ref(storage, `${title}/${fileSrc?.formData?.fileName}`);
    const url = await uploadBytesResumable(imageRef, fileSrc?.formData?.full);
    const data = await getDownloadURL(url.ref);
    const value = {
        "fileName": url.metadata.name,
        "full": data,
        "rawUrls": data,
        "regular": data,
        "small": data,
        "small_s3": data,
        "fileDimensions": {
            width: "",
            height: ""
        },
        "fileSize": url.metadata.size,
        "fileType": url.metadata.contentType
    }
    return value;
}

const FirebaseDeleteImage = async (fileUrl) => {
    const storageRef = ref(storage, `${fileUrl}`);
    await deleteObject(storageRef)
        .then(async (data) => {
            return data;
        })
        .catch((error) => {
            
        });

}

export { FirebaseImageUpload, FirebaseDeleteImage };