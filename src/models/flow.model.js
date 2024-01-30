import mongoose from 'mongoose';

const flowSchema = new mongoose.Schema({
    nameFlow: {
        type: String,
        required: true
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true
});

export default mongoose.model("Flow", flowSchema);