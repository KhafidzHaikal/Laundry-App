import InputError from '@/Components/Form/InputError'
import InputLabel from '@/Components/Form/InputLabel'
import PrimaryButton from '@/Components/Button/PrimaryButton'
import TextInput from '@/Components/Form/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'

const PageLaundryEdit = ({ auth, kategoris, laundry }) => {
    const [nama, setNama] = useState(laundry.nama);
    const [harga, setHarga] = useState(laundry.harga);
    const [waktu_selesai, setWaktu] = useState(laundry.waktu_selesai);
    const [kategori_id, setKategori] = useState(laundry.kategori_id);

    const { data, setData, put, errors } = useForm({
        nama: '',
        harga: '',
        waktu_selesai: '',
        kategori_id: '',
    })

    useEffect(() => {
        setData({
            ...data,
            nama,
            harga,
            waktu_selesai,
            kategori_id,
        });
    }, [nama, harga, waktu_selesai, kategori_id]);

    const submit = async (e) => {
        e.preventDefault();
        put(route('laundry.update', {
            id: laundry.id,
        }))
    }

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Paket Laundry</h2>}
        >
            <Head title="Edit Paket Laundry" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>Form Paket Laundry</h1>
                            <form onSubmit={submit} className='mt-7'>
                                <div className='w-full'>
                                    <div className='mt-5'>
                                        <InputLabel value="Nama Paket" />
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="nama"
                                            value={nama}
                                            className="mt-1 block w-full"
                                            autoComplete="nama"
                                            onChange={(e) =>
                                                setNama(e.target.value)
                                            }
                                            required
                                        />
                                        <InputError message={errors.nama} className="mt-2" />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='mt-5'>
                                        <InputLabel value="Harga" />
                                        <TextInput
                                            id="harga"
                                            type="number"
                                            name="harga"
                                            value={harga}
                                            className="mt-1 block w-full"
                                            autoComplete="harga"
                                            onChange={(e) => setHarga(e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.harga} className="mt-2" />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='mt-5'>
                                        <InputLabel value="Waktu Selesai" />
                                        <TextInput
                                            id="waktu_selesai"
                                            type="text"
                                            name="waktu_selesai"
                                            value={waktu_selesai}
                                            className="mt-1 block w-full"
                                            autoComplete="waktu_selesai"
                                            onChange={(e) => setWaktu(e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.waktu_selesai} className="mt-2" />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='mt-5'>
                                        <InputLabel value="Kategori Layanan" />
                                        <select
                                            name="kategori_id"
                                            id="kategori_id"
                                            value={kategori_id}
                                            onChange={e => setKategori(e.target.value)}
                                            className="block w-full py-2 px-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Pilih Kategori</option>
                                            {kategoris.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.nama}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.kategori_id} className="mt-2" />
                                    </div>
                                </div>
                                <PrimaryButton className='mt-7'>
                                    Simpan
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default PageLaundryEdit