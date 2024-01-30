import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { getFlowsRequest } from '../../api/flows';
import { getCardsRequest } from '../../api/cards';
import { createTransactionRequest, updateTransactionRequest } from '../../api/transactions';

const EditTransactionModal = (props) => {
    const [dataFlows, setDataFlows] = useState({});
    const [dataCards, setDataCards] = useState({});
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const getFlows = async () => {
        try {
            const res = await getFlowsRequest();
            if (res.data) {
                setDataFlows(res.data);
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCards = async () => {
        try {
            const res = await getCardsRequest();
            if (res.data) {
                setDataCards(res.data);
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        try {
            const res = await updateTransactionRequest(props.dataTransaction._id ,data);
            console.log(res);
            if (res.data) {
                props.setShowModalEditTransactional(false);
                props.getTransactions();
            }
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        getFlows();
        getCards();
        console.log(props.dataTransaction)
        if(props.dataTransaction){
            setValue('concept', props.dataTransaction.concept);
            setValue('amount', props.dataTransaction.amount);
            setValue('flow', props.dataTransaction.flow);
            setValue('card', props.dataTransaction.card);
        }
    }, []);


    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-10 inset-0 z-99999 outline-none focus:outline-none">
                <div className="w-4/5 relative my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Editar Transacción
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => props.setShowModalEditTransactional(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <form onSubmit={onSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label htmlFor="concept" className="mb-2.5 block text-black font-bold">Concepto de la transacción <span className="text-meta-1">*</span></label>
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:focus:border-primary"
                                            type="text"
                                            id="concept"
                                            placeholder="Ingresar concepto"
                                            {...register("concept", { required: true })}
                                        />
                                        {errors.concept && (<p className='text-meta-1'>Concepto requerido</p>)}
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label htmlFor="amount" className="mb-2.5 block text-black font-bold">Monto de transacción <span className="text-meta-1">*</span></label>
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:focus:border-primary"
                                            type="text"
                                            id="amount"
                                            placeholder="Ingresar monto"
                                            {...register("amount", { required: true })}
                                        />
                                        {errors.amount && (<p className='text-meta-1'>Monto requerido</p>)}
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label htmlFor="flow" className="mb-2.5 block text-black font-bold">Flujo de efectivo<span className="text-meta-1">*</span></label>
                                        <select
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary"
                                            id='flow'
                                            {...register("flow", { required: true })}
                                        >
                                            <option value="" className='text-bodydark2' selected disabled>Seleciona una opción</option>
                                            {Object.keys(dataFlows).length !== 0
                                                ? dataFlows.map((flow, i) => {
                                                    return <option key={i} value={flow._id}>{flow.nameFlow}</option>
                                                })
                                                : <option value="">No hay más opciones</option>
                                            }
                                        </select>
                                        {errors.flow && (<p className='text-meta-1'>Flujo requerido</p>)}
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label htmlFor="card" className="mb-2.5 block text-black font-bold">Tarjetas<span className="text-meta-1">*</span></label>
                                        <select
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary"
                                            id='card'
                                            {...register("card", { required: true })}
                                        >
                                            <option value="" className='text-bodydark2' selected disabled>Seleciona una opción</option>
                                            {Object.keys(dataCards).length !== 0
                                                ? dataCards.map((card, i) => {
                                                    return <option key={i} value={card._id}>{card.number} ({card.cardholder})</option>
                                                })
                                                : <option value="">No hay más opciones</option>
                                            }
                                        </select>
                                        {errors.card && (<p className='text-meta-1'>Flujo requerido</p>)}
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="flex justify-center w-1/6 rounded bg-body border hover:border-body hover:bg-white p-3 mx-2 font-medium text-gray hover:text-body"
                                    type="button"
                                    onClick={() => props.setShowModalEditTransactional(false)}
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="flex justify-center w-1/6 rounded bg-primary hover:bg-white p-3 mx-2 font-medium text-gray hover:text-primary hover:border-b-primary border hover:border hover:duration-500"
                                    type="submit"
                                >
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
export default EditTransactionModal;