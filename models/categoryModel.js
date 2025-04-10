import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title: {type: String, required: true},
    desc: String,
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: "user", required},
}, {timestamps: true})

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;