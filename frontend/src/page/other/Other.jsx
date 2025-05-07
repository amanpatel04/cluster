import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import makeGetRequest from '../../utils/getRequest';

const Other = () => {
    const [files, setFiles] = React.useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await makeGetRequest('/other/get', true);
            if (response != null) {
                setFiles(response.data);
                console.log(response.data);
            }
        };
        fetchFiles();
    }, []);

    const fileList = files.map((file, index) => {
        return (
            <tr className="h-10 border-t border-white" key={index}>
                <td className="px-3">{file.filename}</td>
                <td className="px-3">{file.mimetype}</td>
                <td className="px-3"><Link to={"http://localhost:8000/" + file.path.substr(7)} target={"_blank"} download={file.filename} className='bg-green-500 w-32 h-8 flex justify-center items-center rounded text-white text-xl font-medium'>Download</Link></td>
            </tr>
        );
    });

    return (
        <>
            <div className="container relative left-12 top-24 px-24">
                <table className="w-full table-fixed">
                    <colgroup>
                        <col span="1" className="w-4/6" />
                        <col span="1" className="w-1/6" />
                        <col span="1" className="w-1/6" />
                    </colgroup>
                    <thead className="h-10 bg-slate-900">
                        <tr>
                            <th className="text-left px-3">Name</th>
                            <th className="text-left px-3">Type</th>
                            <th className="text-left px-3">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileList}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
            <Sidebar />
        </>
    );
};

export default Other;
