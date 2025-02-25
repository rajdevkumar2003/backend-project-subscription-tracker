import mongoose from "mongoose";4


const subscriptionSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'subscription name is required'],
        trim:true,
        minLength:2,
        maxLength:100,
    },
    price:{
        type:Number,
        required:[true,'subscription price is required'],
        min:[0, 'price must be greater than 0'],
    },
    currency:{
        type:String,
        enum: ['USD', 'EUR', 'INR'],
        default: 'INR',
    },
    frequency:{
        type:String,
        enum: ['daily','weekly','monthly','annually'],
        default: 'monthly',
    },
    category:{
        type:String,
        enum: ['sports','news','lifestyle','technology','politics','other','finance','entertainment'],
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum: ['active', 'cancelled', 'expired'],
        default:'active',
    },
    startDate:{
        type:Date,
        default:new Date(),
        validate:{
            validator:(value)=> value<=new Date(),
            message: 'Start date must be in the past',
        },
    },
    renewalDate:{
        type:Date,
        validate:{
            validator:function(value){
                return value > this.startDate;
            },
            message: 'Renewal date must be after start date',
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    }

}, {timestamps:true});

subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        };

        this.renewalDate = new Date(this.startDate);

        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status='expired';
    }

    next();
})


const Subscription= mongoose.model('Subscription',subscriptionSchema); 

export default Subscription;