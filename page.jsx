'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../../../server'; // Pastikan path ini benar
import { useRouter } from 'next/router';

export default function Mahasiswa() {
  const [item, setItem] = useState(null); // State untuk menyimpan data mahasiswa
  const [loading, setLoading] = useState(true); // State untuk memantau status loading
  const [error, setError] = useState(null); // State untuk menangani error
  const router = useRouter(); // Hook untuk mengambil parameter rute
  const { kode } = router.query; // Mendapatkan parameter 'kode' dari URL

  useEffect(() => {
    if (!kode) return; // Pastikan kode tersedia sebelum mencoba mengambil data

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error sebelum mencoba mengambil data

        const { data, error } = await supabase
          .from('tumbuhan') // Ganti dengan nama tabel Anda
          .select('*')
          .eq('kode', kode) // Menyaring data berdasarkan parameter kode
          .single(); // Mengambil satu baris (jika kode unik)

        if (error) throw error;

        setItem(data); // Menyimpan data ke dalam state
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError('Data tidak ditemukan atau terjadi kesalahan saat mengambil data.'); // Set error ke state
      } finally {
        setLoading(false); // Set loading ke false setelah selesai
      }
    };

    fetchData();
  }, [kode]); // Efek dijalankan setiap kali parameter kode berubah

  if (loading) {
    return <div>Loading...</div>; // Menampilkan loading jika data masih diambil
  }

  if (error) {
    return <div>{error}</div>; // Menampilkan pesan error jika ada kesalahan
  }

  if (!item) {
    return <div>Data not found</div>; // Menampilkan pesan jika data tidak ditemukan
  }

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <div className="w-32 h-32">
        <img src={item.foto} alt="Foto Tumbuhan" className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-auto">{item.nama}</div>
      <div className="w-full h-auto">{item.subName}</div>
    </div>
  );
}
