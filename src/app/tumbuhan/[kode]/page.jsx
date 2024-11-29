'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../server/subapase';

export default function Tumbuhan({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { kode } = params;

  useEffect(() => {
    if (!kode) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('tumbuhan')
          .select('*')
          .eq('kode', kode)
          .single();

        if (error) throw error;

        setItem(data);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data');
        console.error('Error fetching data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kode]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>Data tidak ditemukan</div>;

  return (
    <div className="p-4 flex flex-col w-full h-screen">
      <div className='overflow-hidden border border-white w-full max-h-screen rounded-lg'>
        <div className="">
          <img
            src={item.foto}
            className="w-full h-64 object-cover rounded-t-md"
          />
          <p className='px-2 py-1'>{item.nama} : {item.subNama}</p>
          <div className='overflow-hidden '>
          <div className=' p-2 text-justify w-full h-[500px] overflow-y-auto  no-scrollbar'>

            <div className='mt-1'></div>
            <div className='mt-1'>{item.namaLatin}</div>

            <div className='mt-4'>Dari Mana Asal {item.nama}</div>
            <div className='mt-1'>{item.asalUsul}</div>

            <div className='mt-4'>Siklus Hidup {item.nama}</div>
            <div className='mt-1'>{item.siklusHidup}</div>

            <div className='mt-4'>Kenapa {item.nama} Sehat Banget?</div>
            <div className='mt-1'>{item.nutrisi}</div>

            <div className='mt-4'>Varietas {item.nama} Yang Beragam</div>
            <div className='mt-1'>{item.jenis}</div>

            <div className='mt-4'>Menanam {item.nama} Sendiri? Why Not!</div>
            <div className='mt-1'>{item.menanam}</div>

            <div className='mt-4'>Resep Seru Dengan {item.nama}</div>
            <div className='mt-1'>{item.resep}</div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
