import React from 'react';

const UserInfo = () => {
    return (
      <>
        <div className="ml-12 h-60 grid grid-cols-4 gap-2 m-4">
          <div className='bg-red-400'></div>
          <div className='bg-green-400'></div>
          <div className='bg-blue-400'></div>
          <div className='bg-yellow-400'></div>
        </div>
        <div className="ml-12 h-80 grid grid-cols-4 gap-2 m-2 bg-emerald-400">

        </div>
        <div className='ml-12 gap-2 h-96 grid grid-cols-4 m-2'>
          <table className='w-full'>
            <tr>
              <td>Name</td>
              <td>Type</td>
              <td>Last Modified</td>
              <td>Size</td>
            </tr>
            <tr>
              <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia doloribus eligendi, totam magni eaque dicta necessitatibus perferendis fuga? Nobis, repudiandae!</td>
              <td>Video</td>
              <td>12/12/2022</td>
              <td>12 MB</td>
            </tr>
          </table>
        </div>
      </>
    );
};

export default UserInfo;
