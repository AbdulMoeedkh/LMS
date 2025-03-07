import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../config/firebaseConfig.js';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

// const storage = getStorage(app);

// const uploadFileToFirebase = (file, path) => {
//     return new Promise((resolve, reject) => {
//         const storageRef = ref(storage, path);
//         const uploadTask = uploadBytesResumable(storageRef, file);

//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 // Optional: track upload progress
//             },
//             (error) => {
//                 console.error('Upload failed:', error);
//                 reject(error);
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref)
//                     .then((downloadURL) => {
//                         resolve(downloadURL);
//                     })
//                     .catch((error) => {
//                         console.error('Error getting download URL:', error);
//                         reject(error);
//                     });
//             }
//         );
//     });
// };


// Configure AWS SDK (Ensure these credentials are set properly)
const s3 = new S3Client({
    credentials: {
        accessKeyId: 'AKIAUZPNLSRRCQCWT6NR',
        secretAccessKey: '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'
    },
    region: 'ap-southeast-2'
});

const uploadFileToFirebase = async (file, key) => {
    try {
        const params = {
            Bucket: 'fyp-2021',
            Key: key,
            Body: file,
            ContentType: file.type
        };

        const upload = new Upload({
            client: s3,
            params
        });
        console.log(upload)

        const data = await upload.done();
        console.log(data)
        // const command = new PutObjectCommand(params);
        // await s3.send(command);

        // Construct the file URL manually
        const fileUrl = `https://${params.Bucket}.s3.ap-southeast-2.amazonaws.com/${params.Key}`;
        return fileUrl;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};

export default uploadFileToFirebase;


// export default uploadFileToFirebase;