import React from 'react';

import { FaImage } from 'react-icons/fa6';

const UserInfo = () => {
    return (
        <>
            <div className="ml-12 h-60 grid grid-cols-4 gap-2 m-4">
                <div className="bg-red-400 p-3">
                    <FaImage />
                    <p> 240 </p>
                </div>
                <div className="bg-green-400"></div>
                <div className="bg-blue-400"></div>
                <div className="bg-yellow-400"></div>
            </div>
            <div className="ml-12 h-80 grid grid-cols-4 gap-2 m-2 bg-emerald-400"></div>
            <div className="ml-12 m-2">
                <table className="w-full table-fixed">
                    <colgroup>
                        <col span="1" className="w-7/12" />
                        <col span="1" className="w-2/12" />
                        <col span="1" className="w-2/12" />
                        <col span="1" className="w-1/12" />
                    </colgroup>
                    <thead>
                        <tr className="h-10 bg-slate-900">
                            <th className="text-left">Name</th>
                            <th className="text-left">Type</th>
                            <th className="text-left">Last Modified</th>
                            <th className="text-left">Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="h-10 border-t border-white">
                            <td>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit Lorem ipsum dolor
                            </td>
                            <td>Video</td>
                            <td>12/12/2022</td>
                            <td>12 MB</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </>
    );
};

export default UserInfo;
