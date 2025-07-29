import { useState, useEffect } from 'react';

const UploadModal = (props) => {
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);

  useEffect(() => {
    const dashOffset = (283 * (100 - props.percent)) / 100;
    setStrokeDashoffset(dashOffset);
  }, [props.percent]);

  return (
    <div className=''>
      <header className='bg-light-bg dark:bg-dark-bg flex h-10 w-full items-center justify-center'>
        <h4 className='text-sm'>File Upload</h4>
      </header>
      <main>
        <div className='bg-light-bg-light dark:bg-dark-bg-light relative grid max-h-60 gap-1 overflow-y-scroll'>
          <div className='relative grid h-15 grid-cols-5'>
            <div
              className='absolute top-0 left-0 h-full bg-green-300/60'
              style={{ width: `${props.percent}%` }}
            ></div>
            <div className='flex items-center justify-center'>
              <span className='material-symbols-outlined'> upload_file </span>
            </div>
            <div className='col-span-3 flex items-center justify-start overflow-hidden'>
              <h4 className='font-light'>
                {props.name.substring(0, 10) + '...'}
              </h4>
            </div>
            <div className='flex items-center justify-center'>
              <svg width='50' height='50' viewBox='0 0 100 100'>
                <circle
                  cx='50'
                  cy='50'
                  r='45'
                  strokeWidth='10'
                  stroke='#ccc'
                  fill='none'
                />
                <circle
                  cx='50'
                  cy='50'
                  r='45'
                  strokeWidth='10'
                  stroke='#4CAF50'
                  fill='none'
                  strokeDasharray='283'
                  strokeDashoffset={strokeDashoffset}
                  transform='rotate(-90 50 50)'
                />
                <text
                  x='50'
                  y='55'
                  fontSize='18px'
                  fontWeight='bold'
                  textAnchor='middle'
                  fill='#4CAF50'
                >
                  {`${props.percent}%`}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </main>
      <footer className='flex h-10 items-center justify-center'>
        <p className='text-sm font-light'>{props.length} file remaning</p>
      </footer>
    </div>
  );
};

export default UploadModal;
