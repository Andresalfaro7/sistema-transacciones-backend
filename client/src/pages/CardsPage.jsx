import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy, faTrash } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';

import { useCards } from '../contexts/CardsContext';
import AddCardModal from '../components/modals/AddCardModal';
import EditCardModal from '../components/modals/EditCardModal';

function CardsPage() {
  const { getCards, cards, deleteCard, getCard } = useCards();
  const [showModalAddCard, setShowModalAddCard] = useState(false);
  const [showModalEditCard, setShowModalEditCard] = useState(false);
  const [dataCard, setDataCard] = useState({});

  const columns = [
    {
      name: 'Numero de Tarjeta',
      selector: row => row.number,
    },
    {
      name: 'Titular',
      selector: row => row.cardholder,
    },
    {
      name: 'Saldo disponible',
      selector: row => <div>$ {row.totalAmount}</div>,
    },
    {
      name: 'Editar',
      selector: row =><div onClick={()=>{editC(row._id)}} className='text-lg cursor-pointer'><FontAwesomeIcon icon={faPenFancy} />{new Date(row.createdAt).toLocaleDateString()}</div >
    },
    {
      name: 'Eliminar',
      selector: row =><div className='text-lg cursor-pointer' onClick={()=>{deleteC(row._id)}}><FontAwesomeIcon icon={faTrash} />{new Date(row.createdAt).toLocaleDateString()}</div >
    }
  ];

  const deleteC = async(id) =>{
    const res  = await deleteCard(id);
    console.log(res);
    if(res.data){
      getCards();
    }
  }

  const editC = async(id) =>{
    const res  = await getCard(id);
    console.log(res);
    if(res.data){
      setDataCard(res.data);
      setShowModalEditCard(true);
    }
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      <div className='flex flex-wrap items-center mt-7 px-6'>
        <h2 className="w-1/4 text-title-md2 font-bold text-black">Tarjetas</h2>
        <div className='w-full'>
          <div className="bg-gray-100 flex items-center p-3">
            <div className="w-full max-w-md p-9 bg-white">
              <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800"></h1>
              <div onClick={() => setShowModalAddCard(true)} className="cursor-pointer bg-white hover:bg-[#e6e6e6] p-8 text-center rounded-lg border-dashed border-2 border-[#999] hover:border-blue-500 transition duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-md" id="dropzone">
                <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
                  <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
                    <circle cx="50" cy="50" r="40" stroke="#999" strokeWidth="3" fill="none" />
                    <text x="50" y="53" fontSize="50" textAnchor="middle" dominantBaseline="middle" fill="#999">+</text>
                  </svg>
                  <span className="text-[#747474]">Agregar tarjeta</span>
                  <span className="text-gray-500 text-sm"></span>
                </label>
              </div>
              <div className="mt-6 text-center" id="fileList"></div>
            </div>
          </div>
        </div>
        <div className='w-full py-8  '>
          <DataTable
            columns={columns}
            data={cards}
            pagination
          />
        </div>
      </div>
      {showModalAddCard && <AddCardModal setShowModalAddCard={setShowModalAddCard} getCards={getCards} />}
      {showModalEditCard && <EditCardModal setShowModalEditCard={setShowModalEditCard} getCards={getCards} dataCard={dataCard} />}
    </div>
  )
}

export default CardsPage;