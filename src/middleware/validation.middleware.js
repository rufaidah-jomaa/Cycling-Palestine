import Joi from "joi";

const dataMethods =['body', 'query', 'params','headers'];
export const generalValidation={
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,20}$/).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg','image/svg+xml').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(1000000).required(),//1MB
}),
    id:Joi.string().hex().length(24).required()
}
const validation = (schema) => {
 
  return (req, res, next) => {
    const errorMessage=[]
    const filterData = {...req.body,...req.params,...req.query}
    if(req.file){
        filterData.image=req.file
    }

    const {error}= schema.validate(filterData,{abortEarly:false})
    if(error){
       
        error.details.forEach(element => {
            const key = element.context.key
           errorMessage.push({[key]:element.message})
        });
        return res.status(400).json({message:"validation error",errorMessage})
    }
    next()
   // const validationError=[]
    /*if(schema.body){
        const validationResult=schema.body.validate(req.body,{abortEarly:false})
        if(validationResult.error){
            validationError.push(validationResult.error)
        }
    }if(schema.query){
        const validationQueryResult=schema.query.validate(req.query,{abortEarly:false})
        if(validationQueryResult.error){
            validationError.push(validationQueryResult.error)
        }
    }
   if(validationError.length>0){
    return res.status(400).json({message:"validation Error",validationError})
   }*/
   //تحسين للكود
  /*dataMethods.forEach(key=>{
    if(schema[key]){
     const validationResult=schema[key].validate(req[key],{abortEarly:false})
     if(validationResult.error){
        validationError.push(validationResult.error)
     }
    }
   })
   if(validationError.length>0){
    return res.status(400).json({message:"validation Error",validationError})
   }
   next()
*/
  }
}
export default validation; 
