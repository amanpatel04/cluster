import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Files = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/v1/other/get', {
      method: 'GET',
      credentials: 'include',
      signal: controller.signal,
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success) {
            setFileList(data.data);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (fileList.length === 0) {
    return <div className='text-center'>No files</div>;
  }

  return (
    <div>
      <div>
        {fileList.map((file) => {
          return (
            <Link
              to={`/other/${file._id}`}
              className='card flex items-center justify-between'
              key={file._id}
            >
              <div>{file.originalname}</div>
              <span className='material-symbols-outlined'>download</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Files;
