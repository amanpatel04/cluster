import React from 'react';

import { FaImage } from 'react-icons/fa6';

const UserInfo = () => {
  return (
    <>
      <div className="h-full m-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-sm text-gray-500">Used Storage</h2>
          <p className="text-xl font-semibold">780 GB</p>
          <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: '70%' }}
            ></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-sm text-gray-500">Total Capacity</h2>
          <p className="text-xl font-semibold">1 TB</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-sm text-gray-500">System Health</h2>
          <p className="text-lg font-semibold text-green-600">Healthy</p>
          <p className="text-sm text-gray-400 mt-1">
            All systems running smoothly.
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-sm text-gray-500">Network Status</h2>
          <p className="text-lg font-semibold text-green-600">Connected</p>
          <p className="text-sm text-gray-400 mt-1">IP: 192.168.1.10</p>
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
