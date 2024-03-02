import axios from 'axios'
import { getStorage, ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";

const baseUrl = process.env.REACT_APP_BASE_URL

export const getUserfromId = async (id)=>{
const url = baseUrl + "/user/" + id
 try {
    return await axios.get(url)
 } catch (error) {
    console.log(error)
 }
}

export const createUser = async (user)=>{
    const url = baseUrl + "/create"
    try {
        const res = await axios.post(url,user)
        if(!res){
            throw new Error("failed user upload")
        }
    } catch (error) {
        console.log(error)
    }
}


const storage = getStorage();

export const uploadImg = async (file)=>{

    try {
       console.log(file)
        const storageRef = ref(storage, "files/"+ file.name);
        const metadata = {
            contentType: file.mimetype,
        };
        
        const snapshot = await uploadBytes(storageRef, file, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        
        return downloadURL
    } catch (error) {
        console.log(error)
    }
}



