import { useEffect, useState } from 'react';

function HomePage() {
  const [datesDaysWeek, setDatesDaysWeek] = useState([]);
  const [dayToday, setDayToday] = useState('')

  useEffect(() => {
    const getDatesDaysWeek = () => {
      const today = new Date();
      setDayToday(today.getDate());
      const dayWeek = today.getDay();
      const daysWeek = [];

      const firstDayWeek = new Date(today);
      firstDayWeek.setDate(today.getDate() - dayWeek + (dayWeek === 0 ? -6 : 1));

      for (let i = 0; i < 7; i++) {
        const dateDay = new Date(firstDayWeek);
        dateDay.setDate(firstDayWeek.getDate() + i);
        daysWeek.push(dateDay);
      }
      setDatesDaysWeek(daysWeek);
      if (datesDaysWeek.length > 0) {
        console.log(datesDaysWeek);
      }
    };
    getDatesDaysWeek();
  }, []);
  return (
    <div className="">
      <div className='flex flex-wrap items-center mt-7 p-6'>
        <h2 className="w-1/4 text-title-md2 font-bold text-black">Home</h2>
      </div>
      <div className="px-10">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Lunes </span>
                <span className="block lg:hidden"> Lun </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Martes </span>
                <span className="block lg:hidden"> Mar </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Miércoles </span>
                <span className="block lg:hidden"> Mie </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Jueves </span>
                <span className="block lg:hidden"> Jue </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Viernes </span>
                <span className="block lg:hidden"> Vie </span>
              </th>
              <th
                className="flex h-15 items-center justify-center rounded-tr-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Sábado </span>
                <span className="block lg:hidden"> Sáb </span>
              </th>
              <th
                className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Domingo </span>
                <span className="block lg:hidden"> Dom </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- Line 1 --> */}
            <tr className="grid grid-cols-7">
              {datesDaysWeek.map((fecha, i) => (
                <td key={i} className={`${parseInt(fecha.getDate()) == parseInt(dayToday) ? 'bg-secondary' : 'bg-white'} ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-bodydark dark:hover:bg-bodydark1 md:h-25 md:p-6 xl:h-31`}>
                  <span className="font-medium text-black">{fecha.getDate()}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomePage