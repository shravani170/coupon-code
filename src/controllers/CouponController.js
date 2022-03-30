const CouponModel=require("../models/CouponModel")

const isValidCoupontype = function (type) {
    return ['Flat','Percent'].indexOf(type) !== -1
}

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}



const couponCreation=async (req,res)=>
{
    let requestbody=req.body;
    if(!requestbody){
        res.status(400).send({status:false,message:"Please provide details"})
    }

    let {couponNumber,type,value,percent_off,min_amount,maxdiscount,expiryDate}=requestbody;

   if(!isValid(couponNumber)){
    return res.status(400).send({ status: false, message: 'Valid Coupon number is required' })
   }

   const CouponDuplicate=await CouponModel.findOne({couponNumber});
   if(CouponDuplicate){
       return res.status(400).send({status:false,message:"Please provide valid coupon Number"})
   }
   if(!isValid(type)){
       return res.status(400).send({status:false,message:"Please provide Coupon type"})
   }
   type=type.trim();
   if(!isValidCoupontype(type)){
    return res.status(400).send({status:false,message:"coupon Type should be among Flat or Percent"})
   }
   if(type=="Flat"){
      if(!isValid(value)){
        return res.status(400).send({status:false,message:"Coupon value is required"})
      }
   }else{
       if(!isValid(percent_off)){
        return res.status(400).send({status:false,message:"Percentage_off is required"})
       }}

   const regex=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
   if(!regex.test(expiryDate))
   {
       return res.status(400).send({status:false,message:"Provide currect date format."})
   }

   let Data={couponNumber,type,value,min_amount,percent_off,maxdiscount,expiryDate};
   let Coupon=await CouponModel.create(Data);
   res.status(201).send({status:true,data:Coupon})


}

const getcoupon=async (req,res)=>{
 

    let allCoupon=await CouponModel.find();
    return res.status(200).send({List:allCoupon})
}


const checkForCoupon =async (req,res)=>{
    try{

    let CartTotal=req.params.amount;
    let CouponCode=req.params.couponcode;

    let CouponExist=await CouponModel.findOne({couponNumber:CouponCode});
    if(!CouponExist){
        res.status(404).send({status:true,message:"provide currect coupon code"})
    }
    if(CouponExist.Used=="false"){
        res.status(400).send({status:false,message:"Coupon Code is already used"})
    }
    let DateNow=Date.now();
   
    if(!(CouponExist.expiryDate>DateNow)){
        res.status(400).send({status:false,message:"Coupon Code expired."})
    }
    if(!(CouponExist,min_amount<CartTotal)){
        res.status(400).send({status:false,message:`Minimum amount of cart should be greater than ${CouponExist.min_amount}`})
    }

    if(CouponExist.type=='Flat'){
        return res.status(200).send({status:true,message:`You are eligible for discount of ${CouponExist.value}`})
    }else{

        let percent=CouponExist.percent_off;
        let discount=(percent*CartTotal)/100;
        if(discount>CouponExist.maxdiscount) discount=CouponExist.maxdiscount
        return res.status(200).send({status:true,message:`You are eligible for discount of ${discount}`})
    }
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}


}

module.exports.couponCreation=couponCreation
module.exports.getcoupon=getcoupon
module.exports.checkForCoupon=checkForCoupon