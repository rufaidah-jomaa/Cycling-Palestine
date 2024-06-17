import multer from 'multer';

export const fileType={
    image:['image/jpeg','image/png','image/jpg','image/svg+xml'],
    pdf:['applcation/pdf'],
    video:['video/mp4'],
    media:['image/jpeg','image/png','image/jpg','image/svg+xml','video/mp4'],
    excel:['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
}

function uploadFile ( customType = [] ){
const storage = multer.diskStorage({})
function fileFilter (req,file,cb){
  if(customType.includes(file.mimetype)){
   cb(null,true)
  }else{
     cb("invalid format",false)
  }
}
  
  const upload = multer({ fileFilter,storage })
  return upload;
}
export default uploadFile;