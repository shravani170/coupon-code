# coupon-code
The endpoint should take the total amount of the cart and a coupon code (string) and return if the coupon code is valid or not
If valid, it should also return the discount amount that needs to be deducted from the total cart value.
Coupon Validation should include the following rules:
Coupons will have a start date and end date. Post end date, the coupon is considered as expired. 
Coupon code can only be applied on a cart with a minimum amount defined for each of the coupons. 
Coupon codes can be of two type
Flat discount, which will deduct a predefined amount from the total cart value
Percentage discount, which will deduct a percentage from the cart value. It should also define a maximum amount that can be discounted using this percentage discount. 
It should also have endpoints to create and list coupon codes.

