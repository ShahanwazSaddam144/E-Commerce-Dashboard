const express = require("express");
const OrderStatus = require("../Database/orderstatus");
const router = express.Router();

router.post("/orderstatus", async(req,res)=>{
    try{
        const {orderId, orderStatus} = req.body;
        if(!orderId || !orderStatus){
            res.status(401).json({success: false, message: "Please fill all fields"});
        }

        const newOrderId = new OrderStatus({orderId, orderStatus});
        await newOrderId.save();
        res.status(200).json({success: true});
    } catch(err){
        res.status(500).json({success: false, message: "Server Error"});
    }
});

router.get("/orderstatus", async(req,res)=>{
    try{
        const orderStatus = await OrderStatus.find();
        res.status(200).json({success: true, orderStatus});
    } catch(err){
        res.status(500).json({success: false, message: "Server Error"});
    }
});

router.put("/orderstatus", async(req,res)=>{
    try{
        const {orderId, orderStatus} = req.body;
        if(!orderId || !orderStatus){
            return res.status(401).json({success: false, message: "Please fill all fields"});
        }

        const updatedOrderStatus = await OrderStatus.findOneAndUpdate(
            {orderId: orderId},
            {orderStatus: orderStatus},
            {new: true}
        );

        if(!updatedOrderStatus){
            return res.status(404).json({success: false, message: "Order not found"});
        }

        res.status(200).json({success: true, updatedOrderStatus});
    } catch(err){
        res.status(500).json({success: false, message: "Server Error"});
    }
});

router.delete("/orderstatus", async(req,res)=>{
    try{
        const {orderId} = req.body;
        if(!orderId){
            return res.status(401).json({success: false, message: "Please provide orderId"});
        }

        const deletedOrder = await OrderStatus.findOneAndDelete({orderId: orderId});

        if(!deletedOrder){
            return res.status(404).json({success: false, message: "Order not found"});
        }

        res.status(200).json({success: true});
    } catch(err){
        res.status(500).json({success: false, message: "Server Error"});
    }
});

module.exports = router;