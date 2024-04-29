export const asyncHandler=(func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch(error=>{
           
            return res.json({message:"catch error",error:error.stack});
           
        })
    }
}
export const globalErrorHandling=(err,req,res,next)=>{
    if(err){
        return res.json({message:err.message})
    }
}