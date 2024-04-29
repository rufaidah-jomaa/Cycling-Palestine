import multer from 'multer';

export const fileValidation={
    image:['image/jpeg','image/png','image/jpg','image/svg+xml'],
    pdf:['applcation/pdf']
}

function uploadFile (customValidation=[]){
const storage = multer.diskStorage({})
const fileFilter=(req,file,cb)=>{
 if(customValidation.includes(file.mimetype))
 {
   cb(null,true)
 }else{
    cb("invalid format",false)
 }
}
  
  const upload = multer({ fileFilter,storage })
  return upload;
}
export default uploadFile;