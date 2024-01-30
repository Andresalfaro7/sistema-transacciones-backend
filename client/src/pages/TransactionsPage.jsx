import { useEffect, useState } from 'react';
import { faPlusCircle, faTrash, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTransactionModal from '../components/modals/AddTransactionModal';
import EditTransactionModal from '../components/modals/EditTransactionModal';
import DataTable from 'react-data-table-component';
import { deleteTransactionRequest, getTransactionRequest, getTransactionsRequest } from '../api/transactions';

function TransactionsPage() {
  const [showModalAddTransactional, setShowModalAddTransactional] = useState(false);
  const [showModalEditTransactional, setShowModalEditTransactional] = useState(false);
  const [dataTransactions, setDataTransactions] = useState([]);
  const [dataTransaction, setDataTransaction] = useState({});

  const columns = [
    {
      name: 'Tarjeta',
      selector: row => row.card.number,
    },
    {
      name: 'Titular',
      selector: row => row.card.cardholder,
    },
    {
      name: 'Cocepto',
      selector: row => row.concept,
    },
    {
      name: 'Monto',
      selector: row => <div>$ {row.amount.toFixed(2)}</div>,
    },
    {
      name: 'Fecha',
      selector: row => <div>{new Date(row.createdAt).toLocaleDateString()}</div>,
    },
    {
      name: 'Editar',
      selector: row => <div onClick={() => { editTransaction(row._id) }} className='text-lg cursor-pointer'><FontAwesomeIcon icon={faPenFancy} /></div >
    },
    {
      name: 'Eliminar',
      selector: row => <div className='text-lg cursor-pointer' onClick={() => { deleteTransaction(row._id) }}><FontAwesomeIcon icon={faTrash} /></div >
    }
  ];

  const getTransactions = async () => {
    try {
      const res = await getTransactionsRequest();
      if (res.data) {
        setDataTransactions(res.data);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const editTransaction = async (id) => {
    try {
      const res = await getTransactionRequest(id);
      console.log(res);
      if (res.data) {
        console.log(res.data);
        setDataTransaction(res.data);
        setShowModalEditTransactional(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteTransaction = async (id) => {
    const res = await deleteTransactionRequest(id);
    console.log(res);
    if (res.data) {
      getTransactions();
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);


  return (
    <div>
      <div className='flex flex-wrap items-center mt-7 px-6'>
        <div className="w-1/3">
          <h2 className="w-1/4 text-title-md2 font-bold text-black">Transacciones</h2>
        </div>
        <div className="w-2/3 flex justify-end">
          <button onClick={() => { setShowModalAddTransactional(true) }} className="inline-flex items-center justify-center gap-2.5 border border-primary py-4 px-10 text-center font-medium text-primary hover:text-white hover:bg-primary hover:duration-500 hover:bg-opacity-90 lg:px-8 xl:px-10">
            <FontAwesomeIcon icon={faPlusCircle} />
            Agregar
          </button>
        </div>
        <div className='w-full py-8  '>
          <DataTable
            columns={columns}
            data={dataTransactions}
            pagination
          />
        </div>
      </div>
      {showModalAddTransactional && <AddTransactionModal setShowModalAddTransactional={setShowModalAddTransactional} getTransactions={getTransactions} />}
      {showModalEditTransactional && <EditTransactionModal setShowModalEditTransactional={setShowModalEditTransactional} getTransactions={getTransactions} dataTransaction={dataTransaction} />}
    </div>
  )
}

export default TransactionsPage;