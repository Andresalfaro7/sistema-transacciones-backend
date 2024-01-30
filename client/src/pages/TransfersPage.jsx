import { useEffect, useState } from 'react';
import { faPlusCircle, faTrash, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTransferModal from '../components/modals/AddTransferModal';
import EditTransferModal from '../components/modals/EditTransferModal';
import DataTable from 'react-data-table-component';
import { deleteTransferRequest, getTransferRequest, getTransfersRequest } from '../api/transfers';

function TransfersPage() {
  const [showModalAddTransfer, setShowModalAddTransfer] = useState(false);
  const [showModalEditTransfer, setShowModalEditTransfer] = useState(false);
  const [dataTransfers, setDataTransfers] = useState([]);
  const [dataTransfer, setDataTransfer] = useState({});

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
      selector: row => <div onClick={() => { editTransfer(row._id) }} className='text-lg cursor-pointer'><FontAwesomeIcon icon={faPenFancy} /></div >
    },
    {
      name: 'Eliminar',
      selector: row => <div className='text-lg cursor-pointer' onClick={() => { deleteTransfer(row._id) }}><FontAwesomeIcon icon={faTrash} /></div >
    }
  ];

  const getTransfers = async () => {
    try {
      const res = await getTransfersRequest();
      if (res.data) {
        setDataTransfers(res.data);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const editTransfer = async (id) => {
    try {
      const res = await getTransferRequest(id);
      console.log(res);
      if (res.data) {
        console.log(res.data);
        setDataTransfer(res.data);
        setShowModalEditTransfer(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteTransfer = async (id) => {
    const res = await deleteTransferRequest(id);
    console.log(res);
    if (res.data) {
      getTransfers();
    }
  }

  useEffect(() => {
    getTransfers();
  }, []);


  return (
    <div>
      <div className='flex flex-wrap items-center mt-7 px-6'>
        <div className="w-1/3">
          <h2 className="w-1/4 text-title-md2 font-bold text-black">Transferencias</h2>
        </div>
        <div className="w-2/3 flex justify-end">
          <button onClick={() => { setShowModalAddTransfer(true) }} className="inline-flex items-center justify-center gap-2.5 border border-primary py-4 px-10 text-center font-medium text-primary hover:text-white hover:bg-primary hover:duration-500 hover:bg-opacity-90 lg:px-8 xl:px-10">
            <FontAwesomeIcon icon={faPlusCircle} />
            Agregar
          </button>
        </div>
        <div className='w-full py-8  '>
          <DataTable
            columns={columns}
            data={dataTransfers}
            pagination
          />
        </div>
      </div>
      {showModalAddTransfer && <AddTransferModal setShowModalAddTransfer={setShowModalAddTransfer} getTransfers={getTransfers} />}
      {showModalEditTransfer && <EditTransferModal setShowModalEditTransfer={setShowModalEditTransfer} getTransfers={getTransfers} dataTransfer={dataTransfer} />}
    </div>
  )
}

export default TransfersPage;