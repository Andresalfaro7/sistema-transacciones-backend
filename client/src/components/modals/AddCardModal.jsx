import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useCards } from '../../contexts/CardsContext';

const AddCardModal = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { cards, createCard } = useCards();
    console.log(cards);

    // useEffect(() => {
    //     if (isAuthenticated) navigate('/');
    // }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (data) => {
        const res = await createCard(data);
        console.log(res);
        if (res.data) {
            props.setShowModalAddCard(false);
            props.getCards();
        }
    });

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-10 inset-0 z-99999 outline-none focus:outline-none">
                <div className="w-4/5 relative my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Agregar tarjeta
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => props.setShowModalAddCard(false)}
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
                                        <label htmlFor="number" className="mb-2.5 block text-black font-bold">Número de tarjeta <span className="text-meta-1">*</span></label>
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:focus:border-primary"
                                            type="text"
                                            id="number"
                                            placeholder="Ingresar número"
                                            {...register("number", { required: true })}
                                        />
                                        {errors.number && (<p className='text-meta-1'>Número requerido</p>)}
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <label htmlFor="cardholder" className="mb-2.5 block text-black font-bold">Nombre del titular <span className="text-meta-1">*</span></label>
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:focus:border-primary"
                                            type="text"
                                            id="cardholder"
                                            placeholder="Ingresar nombre"
                                            {...register("cardholder", { required: true })}
                                        />
                                        {errors.cardholder && (<p className='text-meta-1'>Nombre requerido</p>)}
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/3">
                                        <label htmlFor="expirationDate" className="mb-2.5 block text-black font-bold">Fecha de expiración<span className="text-meta-1">*</span></label>
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:focus:border-primary"
                                            type="text"
                                            id="expirationDate"
                                            placeholder="00/00"
                                            {...register("expirationDate", { required: true })}
                                        />
                                        {errors.expirationDate && (<p className='text-meta-1'>Fecha requerida</p>)}
                                    </div>
                                    <div className="w-full xl:w-1/3">
                                        <label htmlFor="cvv" className="mb-2.5 block text-black font-bold">CVV<span className="text-meta-1">*</span></label>
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:focus:border-primary"
                                            type="text"
                                            id="cvv"
                                            placeholder="000"
                                            {...register("cvv", { required: true })}
                                        />
                                        {errors.cvv && (<p className='text-meta-1'>CVV requerido</p>)}
                                    </div>
                                    <div className="w-full xl:w-1/3">
                                        <label htmlFor="totalAmount" className="mb-2.5 block text-black font-bold">Saldo disponible <span className="text-meta-1">*</span></label>
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:focus:border-primary"
                                            type="text"
                                            id="totalAmount"
                                            placeholder="$00.00"
                                            {...register("totalAmount", { required: true })}
                                        />
                                        {errors.totalAmount && (<p className='text-meta-1'>Saldo requerido</p>)}
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="flex justify-center w-1/6 rounded bg-body border hover:border-body hover:bg-white p-3 mx-2 font-medium text-gray hover:text-body"
                                    type="button"
                                    onClick={() => props.setShowModalAddCard(false)}
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="flex justify-center w-1/6 rounded bg-primary hover:bg-white p-3 mx-2 font-medium text-gray hover:text-primary hover:border-b-primary border hover:border hover:duration-500"
                                    type="submit"
                                >
                                    Guardar
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
export default AddCardModal;