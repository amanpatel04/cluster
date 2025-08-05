import { useState, useEffect } from 'react';

import UploadModal from './UploadModal';
import UploadButton from './UploadButton';
const Upload = () => {
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [uploadList, setUploadList] = useState([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (uploadList.length === 0) {
      setIsOpenUpload(false);
    } else {
      setIsOpenUpload(true);
      const file = uploadList[0];

      const fromData = new FormData();
      fromData.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/v1/file/upload', true);

      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setPercent(percent);
        }
      };

      xhr.error = function (error) {
        console.log(error.message);
      };

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.response);
          if (data.success) {
            let temp = [];
            for (let i = 1; i < uploadList.length; i++) {
              temp.push(uploadList[i]);
            }
            setUploadList(temp);
          }
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
          const data = JSON.parse(xhr.response);
          console.log(data.message);
          let temp = [];
          for (let i = 1; i < uploadList.length; i++) {
            temp.push(uploadList[i]);
          }
          setUploadList(temp);
        }
      };
      xhr.send(fromData);
    }

    return () => {
      setIsOpenUpload(false);
    };
  }, [uploadList]);

  return (
    <div>
      <div
        className={`fixed right-2 bottom-0 px-0 ${isOpenUpload ? 'w-2/3 md:w-1/2 lg:w-1/4' : 'w-20'} transition-[width] duration-500 ease-out`}
      >
        {isOpenUpload ? (
          <UploadModal
            name={uploadList[0]?.name || ''}
            length={uploadList.length}
            percent={percent || 0}
          />
        ) : (
          <UploadButton setUploadList={setUploadList} />
        )}
      </div>
    </div>
  );
};

export default Upload;
