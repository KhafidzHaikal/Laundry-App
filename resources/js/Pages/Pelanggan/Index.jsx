import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'
import moment from 'moment';
import DangerBadge from '@/Components/Badge/DangerBadge';
import WarningBadge from '@/Components/Badge/WarningBagde';
import SuccessBadge from '@/Components/Badge/SuccessBadge';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import WarningButton from '@/Components/Button/WarningButton';
import SuccessButton from '@/Components/Button/SuccessButton';
import DangerButton from '@/Components/Button/DangerButton';

const PagePelanggan = ({ auth, transaksi }) => {
    const { data, setData, patch } = useForm({
        status: ''
    })
    const formattedDate = moment(transaksi.created_at).format('DD-MM-YYYY');

    const update = (e, id) => {
        e.preventDefault();
        patch(route('pelanggan.update', { id: id }));
    }

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pelanggan</h2>}
        >
            <Head title="Pelanggan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <strong className='uppercase'>Tabel Pelanggan</strong>
                            <table className='mt-7'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Status</th>
                                        <th>Tanggal</th>
                                        <th>Pelanggan</th>
                                        <th>Paket</th>
                                        <th>Total Harga</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transaksi.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {item.status === 'menunggu konfirmasi' &&
                                                    <DangerBadge>
                                                        {item.status}
                                                    </DangerBadge>
                                                }
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
                                            </td>
                                            <td>{formattedDate}</td>
                                            <td>{item.user_name}</td>
                                            <td>{item.laundry_nama}</td>
                                            <td>{item.total_harga}</td>
                                            <td>
                                                {item.status === 'menunggu konfirmasi' &&
                                                    <form onSubmit={(e) => {
                                                        update(e, item.id);
                                                    }}>
                                                        <input type="hidden" value={data.status = 1} name="status" onChange={() => setData('status', 1)} />
                                                        <DangerButton>
                                                            Kerjakan
                                                        </DangerButton>
                                                    </form>
                                                }
                                                {item.status === 'diproses' &&
                                                    <form onSubmit={(e) => {
                                                        update(e, item.id);
                                                    }}>
                                                        <input type="hidden" value={data.status = 2} name="status" onChange={() => setData('status', 1)} />
                                                        <WarningButton>
                                                            Proses
                                                        </WarningButton>
                                                    </form>
                                                }
                                                {item.status === 'selesai' &&
                                                    <SuccessButton>
                                                        Selesai
                                                    </SuccessButton>
                                                }
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

export default PagePelanggan