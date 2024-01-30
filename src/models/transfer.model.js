import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
    concept: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transferDate: {
        type: Date,
        default: Date.now 
    },
    flow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flow',
        required: true
    },
    card:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true
});

export default mongoose.model("Transfer", transferSchema);