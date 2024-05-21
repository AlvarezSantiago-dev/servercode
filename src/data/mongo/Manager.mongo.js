class Manager {
    constructor(Model) {
        this.Model = Model
    }
    async create(data) {
        try {
            const one = await this.Model.create(data)
            return one;
        } catch (error) {
            throw error
        }
    }
    async readAll() {
        try {
            const all = await this.Model.find().lean();
            return all;
        } catch (error) {
            throw error;
        }
    }
    async read(category) {
        try {
            let query = {};
            if (category) {
                query = { category };
            }
            const all = await this.Model.find(category).lean();
            return all;
        } catch (error) {
            throw error
        }
    }

    async readCart(user_id) {
        try {
            const all = await this.Model.find({ user_id: user_id }).lean();
            return all;
        } catch (error) {
            throw error;
        }
    }
    async paginate({ filter, opts }) {
        try {
            const all = await this.Model.paginate(filter, opts);
            return all;
        } catch (error) {
            throw error;
        }
    }

    async readOne(id) {
        try {
            const one = await this.Model.findById(id).lean();
            return one;
        } catch (error) {
            throw error
        }
    }

    async readByEmail(email) {
        try {
            const one = await this.Model.findOne({ email }).lean();
            return one;
        } catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const one = await this.Model.findByIdAndUpdate(id, data, { new: true })
            return one;
        } catch (error) {
            throw error
        }
    }
    async destroy(id) {
        try {
            const elimined = await this.Model.findByIdAndDelete(id).lean();
            return elimined;
        } catch (error) {
            throw error
        }
    }
};

export default Manager;