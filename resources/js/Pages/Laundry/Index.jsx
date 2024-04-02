import PrimaryButton from '@/Components/Button/PrimaryButton'
import SecondaryButton from '@/Components/Button/SecondaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Modal from '@/Components/Form/Modal'
import InputLabel from '@/Components/Form/InputLabel'
import TextInput from '@/Components/Form/TextInput'
import WarningButton from '@/Components/Button/WarningButton'
import DangerButton from '@/Components/Button/DangerButton'

const PageLaundry = ({ auth, laundries, kategori }) => {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, get } = useForm({
        nama: ''
    });

    const update = (e, id) => {
        e.preventDefault();
        get(route('laundry.edit', { id: id }))
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('kategori.store'));
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this Data?')) {
            router.delete(route('laundry.destroy', id));
        }
    }

    const handleDeleteKategori = async (e, id) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this Data?')) {
            router.delete(route('kategori.destroy', id));
        }
    }

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Laundry</h2>}
        >
            <Head title="Laundry" />

            {/* Modal Tambah Kategori */}
            <div className='sm:ml-4 md:ml-6 lg:ml-40 mt-4 flex gap-5'>
                <Link href={route('laundry.create')}>
                    <PrimaryButton>
                        Tambah Laundry
                    </PrimaryButton>
                </Link>

                <SecondaryButton
                    onClick={openModal}
                >
                    Kategori Laundry
                </SecondaryButton>
                <Modal show={showModal} onClose={closeModal}>
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Tambah Kategori</h2>
                        <form onSubmit={submit}>
                            <InputLabel value="Nama Kategori" />
                            <TextInput
                                id="nama"
                                type="text"
                                name="nama"
                                value={data.nama}
                                className="mt-1 block w-full"
                                autoComplete="nama"
                                onChange={(e) => setData('nama', e.target.value)}
                                required
                            />
                            <div className='flex justify-end mt-4'>
                                <PrimaryButton>
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
            {/* End */}
            <div className="py-12 -mt-7">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>Tabel Kategori Laundry</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kategori.map((item, index) => (
                                        <tr key={item.id}>
                                            <td width={50}>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>
                                                <DangerButton
                                                    onClick={(e) => { handleDeleteKategori(e, item.id) }}
                                                >
                                                    Delete
                                                </DangerButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 -mt-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>Tabel Laundry</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Paket</th>
                                        <th>Jenis</th>
                                        <th>Harga</th>
                                        <th>Waktu Laundry</th>
                                        <th width={100}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {laundries.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.kategori_nama}</td>
                                            <td>{item.harga}</td>
                                            <td>{item.waktu_selesai}</td>
                                            <td className='flex gap-2'>
                                                <WarningButton
                                                    onClick={(e) => { update(e, item.id) }}
                                                >
                                                    Edit
                                                </WarningButton>
                                                <DangerButton
                                                    onClick={(e) => { handleDelete(e, item.id) }}
                                                >
                                                    Delete
                                                </DangerButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default PageLaundry