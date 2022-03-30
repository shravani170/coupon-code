const mongoose=require('mongoose');

const CouponSchema=new mongoose.Schema({
CouponNumber :
{   type:String,
    required:true,
    unique:true
},
type: 
{  type:String,
required:true 
},
value:{type:Number},
min_amount:{type:Number},
percent_off:{type:Number},
maxdiscount:{type:Number},
startDate:{type:Date,default:Date.now()},
expiryDate:{type:Date,required:true},
Used: 
{   type:Boolean,
    default:false
}
})

module.exports=mongoose.model("Coupon",CouponSchema)