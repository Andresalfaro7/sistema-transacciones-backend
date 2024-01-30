import { createContext, useContext, useState } from 'react';
import { createCardRequest, getCardsRequest, deleteCardRequest, getCardRequest, updateCardRequest } from '../api/cards';

const CardContext = createContext();

export const useCards = () => {
    const context = useContext(CardContext);

    if (!context) {
        throw new Error("useCards debe usarse dentro de CardProvider");
    }
    return context;
}

export function CardProvider({ children }) {
    const [cards, setCards] = useState([]);

    const getCards = async () => {
        try {
            const res = await getCardsRequest();
            setCards(res.data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const createCard = async (card) => {
        const res = await createCardRequest(card);
        console.log(res);
        return res
    }

    const deleteCard = async(id) =>{
        const res = await deleteCardRequest(id);
        return res;
    }

    const getCard = async(id) =>{
        try {
            const res = await getCardRequest(id);
            return res;
        } catch (error) {
            console.error(error);
        }
    }

    const updateCard = async(id, card) =>{
        try {
            const res = await updateCardRequest(id, card);
            return res
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CardContext.Provider value={{
            cards,
            createCard,
            getCards,
            deleteCard,
            getCard,
            updateCard
        }}>
            {children}
        </CardContext.Provider>
    )
}

