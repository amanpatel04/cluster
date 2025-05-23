import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import makeDeleteRequest from '../../utils/delelteRequest';
import makeGetRequest from '../../utils/getRequest';
import { MdOutlineDownload } from 'react-icons/md';
import { MdOutlineDelete } from 'react-icons/md';

const Other = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await makeGetRequest('/other/get', true);
      if (response != null) {
        setFiles(response.data);
      }
    };
    fetchFiles();
  }, []);

  const handleDelete = async (id) => {
    const response = await makeDeleteRequest('/other/delete/' + id, true);
    if (response !== null) {
      window.location.reload();
    }
  };

  const fileList = files.map((file, index) => {
    return (
      <tr className="h-10 border-t border-green-500" key={index}>
        <td className="p-1 relative">
          {file.filename.length > 25
            ? file.filename.substr(0, 25) + '...'
            : file.filename}
        <div
          className="w-6 h-6 bg-red-500 absolute bottom-2 right-2 text-2xl flex justify-center items-center rounded-full hover:cursor-pointer"
          onClick={() => handleDelete(file._id)}
        >
          <MdOutlineDelete className="text-white" />
        </div>
        </td>
        <td className="p-1">{file.mimetype.substr(-3, 3)}</td>
        <td className="p-1">
          <Link
            to={file.path.substr(7)}
            target={'_blank'}
            download={file.filename}
            className="bg-green-500 aspect-square h-8 flex justify-center items-center rounded text-white text-xl font-medium"
          >
            <MdOutlineDownload />
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="m-2 md:w-1/2 md:mx-auto md:shadow-lg">
        <table className="w-full table-fixed">
          <colgroup>
            <col span="1" className="w-4/6" />
            <col span="1" className="w-1/6" />
            <col span="1" className="w-1/6" />
          </colgroup>
          <thead className="h-10 bg-green-500">
            <tr className="text-white">
              <th className="text-left px-1">Name</th>
              <th className="text-left px-1">Type</th>
              <th className="text-left px-1"></th>
            </tr>
          </thead>
          <tbody>{fileList}</tbody>
          <tfoot></tfoot>
        </table>
      </div>
      <Sidebar />
    </>
  );
};

export default Other;
