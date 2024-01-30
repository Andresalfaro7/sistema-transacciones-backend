import Transaction from '../models/transaction.model.js';

export const getTransactions = async (req, res) => {
    const transactions = await Transaction.find({
        user: req.user.id,
        isDeleted: false
    })
        .populate({ path: 'user', select: 'names lastnames _id' })
        .populate({ path: 'flow', select: 'nameFlow' })
        .populate({ path: 'card', select: 'number cardholder _id' });
    res.json(transactions);
}

export const createTransaction = async (req, res) => {
    const { concept, amount, flow, card } = req.body;
    const newTransaction = new Transaction({
        concept,
        amount,
        flow,
        card,
        user: req.user.id
    });

    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
}

export const getTransaction = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)
        .where({ isDeleted: false })
        .populate({ path: 'user', select: 'names lastnames _id' })
        .populate({ path: 'flow', select: 'nameFlow' })
        .populate({ path: 'card', select: 'number cardholder _id' });
    if (!transaction) return res.status(404).json({ message: "Transacción no encontrada" });
    res.json(transaction);
}

export const deleteTransaction = async (req, res) => {
    const transaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        { $set: { isDeleted: true } },
        { new: true }
    );
    if (!transaction) return res.status(404).json({ message: "Transacción no encontrada" });
    res.json(transaction);
}

export const updateTransaction = async (req, res) => {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!transaction) return res.status(404).json({ message: "Transacción no encontrada" });
    res.json(transaction);
}