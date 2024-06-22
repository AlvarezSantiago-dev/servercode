
import { Types } from "mongoose"

class Service {
    constructor(manager) {
        this.manager = manager;
    }
    createService = async (data) => {
        try {
            let user = await this.manager.create(data);
            return user
        } catch (error) {
            throw error
        }
    }
    updateService = async (id, data) => {
        try {
            const user = await this.manager.update(id, data);
            return user;
        } catch (error) {
            throw error
        }
    }
    readOneService = async (id) =>{
        try {
            const one = await this.manager.readOne(id);
            return one
        } catch (error) {
            throw error;
        }
    }
    paginateService = async ({ filter, opts }) => {
            try {
                const all = this.manager.paginate({ filter, opts });
                return all
            } catch (error) {
                throw error
            }
    }
    readService = async () => {
        try {
            const all = await this.manager.read()
            return all;
        } catch (error) {
            throw error
        }
    }
    readServiceFilter = async (category)=>{
        try {
            const allproducts = await this.manager.read({ category });
            return allproducts
        } catch (error) {
            throw error
        }
    }
    readCartService = async (user_id) => {
        try {
            const allproducts = await this.manager.readCart(user_id)
            return allproducts
        } catch (error) {
            throw error
        }
    }
    destroyService = async (id) => {
        try {
            const one = await this.manager.destroy(id)
            return one;
        } catch (error) {
            throw error
        }
    }
    destroyAllService = async() => {
        try {
            const all = await this.manager.destroyAll(user_id);
            return all
        } catch (error) {
            throw error
        }
    }
    agregateService = async (id) => {
        try {
            const ticket = await this.manager.aggregate([
                {
                    $match: {
                        user_id: new Types.ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        foreignField: "_id",
                        from: "products",
                        localField: "product_id",
                        as: "product_id",
                    },
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
                        },
                    },
                },
                {
                    $set: {
                        subTotal: { $multiply: ["$quantity", "$price"] },
                    },
                },
                { $group: { _id: "user_id", total: { $sum: "$subTotal" } } },
                {
                    $project: { _id: 0, user_id: id, total: "$total", date: new Date() },
                },
                //{ $merge: { into: "tickets" } },
            ]);
            return ticket;
        } catch (error) {
            throw error
        }
    }
}
export default Service;