import InputError from '@/Components/Form/InputError'
import InputLabel from '@/Components/Form/InputLabel'
import PrimaryButton from '@/Components/Button/PrimaryButton'
import TextInput from '@/Components/Form/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'

const PageTransaksiCreate = ({ auth, laundries }) => {
    const [selectedLaundries, setSelectedLaundries] = useState(null);
    const { data, setData, post, errors } = useForm({
        laundries_id: '',
        berat: '',
        total_harga: '',
    })

    useEffect(() => {
        if (selectedLaundries && data.berat) {
            setData('total_harga', data.berat * selectedLaundries.harga);
        }
    }, [selectedLaundries, data.berat]);

    const submit = (e) => {
        e.preventDefault();
        post(route('transaksi.store'))
    }

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transaksi</h2>}
        >
            <Head title="Pesan Laundry" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>Pesanan Laundry</h1>
                            <form onSubmit={submit} className='mt-7'>
                                <div className='w-full'>
                                    <div className='mt-5'>
                                        <InputLabel value="Durasi Layanan" />
                                        <select
                                            name="laundrie  s_id"
                                            id="laundries_id"
                                            value={selectedLaundries ? selectedLaundries.id : ''}
                                            onChange={e => {
                                                const laundriesId = e.target.value;
                                                const selectedLaundries = laundries.find(laundries => laundries.id === parseInt(laundriesId));
                                                setSelectedLaundries(selectedLaundries);
                                                setData('laundries_id', laundriesId);
                                            }}
                                            className="block w-full py-2 px-4 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Pilih Kategori</option>
                                            {laundries.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.kategori_nama} - {option.nama}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.laundries_id} className="mt-2" />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='mt-5'>
                                        <InputLabel value="Berat (Bulatkan Angka Berat)" />
                                        <TextInput
                                            id="berat"
                                            type="number"
                                            name="berat"
                                            value={data.berat}
                                            className="mt-1 block w-full"
                                            autoComplete="berat"
                                            onChange={(e) => setData('berat', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.berat} className="mt-2" />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='mt-5'>
                                        <InputLabel value="Harga Per Kilo/Satuan" />
                                        <TextInput
                                            id="harga"
                                            type="text"
                                            value={selectedLaundries ? selectedLaundries.harga : ''}
                                            className="mt-1 block w-full bg-gray-100"
                                            autoComplete="harga"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='mt-5'>
                                        <InputLabel value="Waktu Selesai" />
                                        <TextInput
                                            id="waktu_selesai"
                                            type="text"
                                            name="waktu_selesai"
                                            value={selectedLaundries ? selectedLaundries.waktu_selesai : ''}
                                            className="mt-1 block w-full bg-gray-100"
                                            autoComplete="waktu_selesai"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='mt-5'>
                                        <InputLabel value="Total Harga" />
                                        <TextInput
                                            id="total_harga"
                                            type="text"
                                            name="total_harga"
                                            value={data.total_harga}
                                            className="mt-1 block w-full bg-gray-100"
                                            autoComplete="total_harga"
                                            onChange={(e) => setData('total_harga', e.target.value)}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <PrimaryButton className='mt-7'>
                                    Pesan
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default PageTransaksiCreate