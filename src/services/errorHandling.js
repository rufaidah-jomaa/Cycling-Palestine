export const asyncHandler=(func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch(error=>{
           
            return res.json({message:"catch error",error:error.stack});
           
        })
    }
}
export const globalErrorHandling=(err,req,res,next)=>{
    if(err){
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).json({message:err.message})
    }
}