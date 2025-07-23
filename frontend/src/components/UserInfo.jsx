import { useEffect, useState } from 'react';

import { useApiCall } from '../utils/UseApiCall';
const UserInfo = () => {
    const [userDetails, setUserDetails] = useState({});
    const [totalFiles, setTotalFiles] = useState(0);

    useEffect(() => {
        useApiCall('/user/get').then((response) => {
            if (response) {
                let total = 0;
                total += response.data.audios.length;
                total += response.data.images.length;
                total += response.data.videos.length;
                total += response.data.others.length;
                setUserDetails(response.data);
                setTotalFiles(total);
            }
        });
    }, []);

    return (
        <>
            <div className="h-full m-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h2 className="text-sm text-gray-500">Used Storage</h2>
                    <p className="text-xl font-semibold">{`${parseInt(
                        userDetails.sizeUsed / 1000000
                    )} MB`}</p>
                    <div className="mt-2 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                                width: `${
                                    (userDetails.sizeUsed /
                                        userDetails.sizeAllocated) *
                                    100
                                }%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h2 className="text-sm text-gray-500">Total Capacity</h2>
                    <p className="text-xl font-semibold">
                        {userDetails.sizeAllocated / 1e9} GB
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h2 className="text-sm text-gray-500">User</h2>
                    <p className="text-lg font-semibold text-green-600">{`${userDetails.firstName} ${userDetails.lastName}`}</p>
                    <p className="text-sm text-gray-400 mt-1">
                        {`Last login: ${new Date(
                            userDetails.updatedAt
                        ).toLocaleString()}`}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border">
                    <h2 className="text-sm text-gray-500">Total Files</h2>
                    <p className="text-lg font-semibold text-green-600">
                        {totalFiles}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        IP: 192.168.1.10
                    </p>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border m-4">
                <h2 className="text-sm text-gray-500 mb-2">Recent Files</h2>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b pb-1">
                        <span>backup.tar.gz</span>
                        <span className="text-gray-500">5.6 GB</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                        <span>media.zip</span>
                        <span className="text-gray-500">1.2 GB</span>
                    </div>
                    <div className="flex justify-between">
                        <span>config.json</span>
                        <span className="text-gray-500">2 KB</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
