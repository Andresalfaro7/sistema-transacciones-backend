import Card from '../models/card.model.js';

export const getCards = async (req, res) => {
    try {
        const cards = await Card.find({
            user: req.user.id,
            isDeleted: false
        }).populate({ path: 'user', select: 'names lastnames _id' });
        res.json(cards);
    } catch (error) {
        return res.status(500).json({ message: "Error inesperado" });
    }
}

export const createCard = async (req, res) => {
    try {
        const { number, cardholder, expirationDate, cvv, totalAmount } = req.body;
        const newCard = new Card({
            number,
            cardholder,
            expirationDate,
            cvv,
            totalAmount,
            user: req.user.id
        });

        const savedCard = await newCard.save();
        res.json(savedCard);
    } catch (error) {
        return res.status(500).json({ message: "Error inesperado" });
    }
}

export const getCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id).where({ isDeleted: false }).populate({ path: 'user', select: 'names lastnames _id' });
        if (!card) return res.status(404).json({ message: "Tarjeta no encontrada" });
        res.json(card);
    } catch (error) {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
    }

}

export const deleteCard = async (req, res) => {
    // const card = await Card.findByIdAndDelete(req.params.id);
    // if(!task) return res.status(404).json({ message: "Task not found" });

    // return res.sendStatus(204);
    try {
        const card = await Card.findByIdAndUpdate(
            req.params.id,
            { $set: { isDeleted: true } },
            { new: true }
        );
        if (!card) return res.status(404).json({ message: "Tarjeta no encontrada" });
        res.json(card);
    } catch (error) {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
    }
}

export const updateCard = async (req, res) => {
    try {
        const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!card) return res.status(404).json({ message: "Tarjeta no encontrada" });
        res.json(card);
    } catch (error) {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
    }
}