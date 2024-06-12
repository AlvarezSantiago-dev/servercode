import { Schema, Types, model} from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "carts"
const schema = new Schema({
    user_id: { type: Types.ObjectId, ref: "users", required:true  },
    product_id:{type: Types.ObjectId, ref:"products", required: true },
    quantity: {type: Number, default: 1},
    state: {type:String, default:"reserved"  ,enum: ["pied", "delivered", "reserved"]}
}, {
    timestamps:true });

//metodo find
schema.pre("find", function () { this.populate("user_id", "name email _id") } );
schema.pre("find", function (){this.populate("product_id", "tittle price photo category _id")} )
//metodo findebyid
schema.pre("findOne", function (){this.populate("user_id", "name email -_id")})
schema.pre("findOne", function (){this.populate("product_id", "tittle price photo category -_id")} )
//metodo update
schema.pre("findByIdAndUpdate", function () { this.populate("user_id", "name email -_id") } );
schema.pre("findByIdAndUpdate", function (){this.populate("product_id", "tittle price photo category -_id")} )
//metodo delete
schema.pre("findByIdAndDelete", function () { this.populate("user_id", "name email -_id") } );
schema.pre("findByIdAndDelete", function (){this.populate("product_id", "tittle price photo category -_id")} )

schema.plugin(mongoosePaginate);
const CartModel =  model(collection,schema);
export default CartModel;
