import { Schema, Types, model} from "mongoose"

const collection = "carts"
const schema = new Schema({
    user_id: { type: Types.ObjectId, ref: 'users', required: true, unique: true },
    product_id:{type: Types.ObjectId, ref:'products',required: true, unique: true},
    quantity: {type: Number, default: 1},
    state: {type:String, default:"reserved"  ,enum: ["pied", "delivered", "reserved"]}
}, {
    timestamps:true })

schema.pre("find", function () { this.populate("user_id", "name email -_id") } );
schema.pre("find", function (){this.populate("product_id", "tittle price photo category -_id")} )
const CartModel =  model(collection,schema);
export default CartModel;
