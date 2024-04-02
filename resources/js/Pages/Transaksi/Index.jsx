import DangerBadge from '@/Components/Badge/DangerBadge'
import SuccessBadge from '@/Components/Badge/SuccessBadge'
import WarningBadge from '@/Components/Badge/WarningBagde'
import PrimaryButton from '@/Components/Button/PrimaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import SecondaryButton from '@/Components/Button/SecondaryButton'

const PageTransaksi = ({ auth, transaksi }) => {
    const [transaksis, setTransaksis] = useState([]);
    const [sorted, setSorted] = useState(false);

    const formattedDate = moment(transaksi.created_at).format('DD-MM-YYYY');

    useEffect(() => {
        setTransaksis(transaksi);
    }, []);

    const sortData = (sortBy) => {
        const sortedData = [...transaksis].sort((a, b) => {
            if (sortBy === 'status') {
                return a[sortBy].localeCompare(b[sortBy]);
            } else {
                return a[sortBy] - b[sortBy];
            }
        });

        if (sorted) {
            sortedData.reverse();
        }

        setTransaksis(sortedData);
        setSorted(!sorted);
    };

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transaksi</h2>}
        >
            <Head title="Transaksi" />

            {/* Modal Tambah Kategori */}
            <div className='sm:ml-5 md:ml-6 lg:ml-40 mt-4 flex gap-5'>
                <Link href={route('transaksi.create')}>
                    <PrimaryButton>
                        Tambah Pesanan
                    </PrimaryButton>
                </Link>
            </div>

            <div className="py-12 -mt-7">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='flex justify-between'>
                            <strong className='uppercase'>Daftar Transaksi</strong>
                            <SecondaryButton onClick={() => sortData('status')}>
                                Sort by status
                            </SecondaryButton>
                            </div>
                            {transaksis.map((item, index) => (
                                <div className='shadow-md sm:rounded-lg p-4 mt-7' key={index}>
                                    <div className='flex justify-between'>
                                        <h2>Nomor Transaksi : <strong className='underline'>{item.no_transaksi}</strong></h2>
                                        <h2>Status :
                                            {item.status === 'diproses' &&
                                                <WarningBadge>
                                                    {item.status}
                                                </WarningBadge>
                                            }
                                            {item.status === 'selesai' &&
                                                <SuccessBadge>
                                                    {item.status}
                                                </SuccessBadge>
                                            }
                                        </h2>
                                    </div>
                                    <div className='lg:flex justify-end mt-7'>
                                        <div className='w-full'>
                                            <h1 className='font-bold'>Paket {item.laundry_nama} ({item.waktu_selesai})</h1>
                                            <h1>Tanggal : {formattedDate}</h1>
                                            <h1>{item.berat} x  Rp {item.laundry_harga}</h1>
                                        </div>
                                        <div className='w-52'>
                                            <strong>Total Harga Laundry</strong>
                                            <br />
                                            <strong>Rp {item.total_harga}</strong>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default PageTransaksi