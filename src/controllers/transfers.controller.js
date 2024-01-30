import Transfer from '../models/transfer.model.js';
import Transaction from '../models/transaction.model.js';

export const getTransfers = async(req, res) =>{
    const transfer = await Transfer.find({
        user: req.user.id,
        isDeleted: false
    })
    .populate({path:'user', select: 'names lastnames _id'})
    .populate({path:'flow', select: 'nameFlow'})
    .populate({path:'card', select: 'number cardholder _id'});
    res.json(transfer);
}   

export const createTransfer = async(req, res) =>{
    const { concept, amount, flow, card } = req.body;
    const data = {
        concept,
        amount,
        flow,
        card,
        user: req.user.id
    }
    const newTransfer = new Transfer(data);
    const newTransaction = new Transaction(data);

    const savedTransfer = await newTransfer.save();
    const savedTransaction = await newTransaction.save();

    res.json({transfer: savedTransfer, transaction: savedTransaction});
}

export const getTransfer = async(req, res) =>{
    const transfer = await Transfer.findById(req.params.id)
                            .where({isDeleted: false})
                            .populate({path:'user', select: 'names lastnames _id'})
                            .populate({path:'flow', select: 'nameFlow'})
                            .populate({path:'card', select: 'number cardholder _id'});
    if(!transfer) return res.status(404).json({ message: "Transferencia no encontrada" });
    res.json(transfer);
}

export const deleteTransfer = async(req, res) =>{
    const transfer = await Transfer.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if(!transfer) return res.status(404).json({ message: "Transferencia no encontrada" });
    res.json(transfer);
}

export const updateTransfer = async(req, res) =>{
    const transfer = await Transfer.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if(!transfer) return res.status(404).json({ message: "Transferencia no encontrada" });
    res.json(transfer);
}