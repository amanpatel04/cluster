import { useLocation } from 'react-router-dom';

const UploadButton = (props) => {
  const location = useLocation();

  const visiableRoutes = new Set([
    '/',
    '/gallery',
    '/video',
    '/audio',
    '/file',
  ]);

  const isVisiable = visiableRoutes.has(location.pathname);

  const handleChange = (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    props.setUploadList(files);
  };

  if (!isVisiable) {
    return null;
  }

  return (
    <div className='px-2'>
      <div>
        <form
          action='/api/v1/file/upload'
          method='post'
          encType='multipart/form-data'
          onChange={handleChange}
        >
          <label
            className='bg-light-bg-light dark:bg-dark-bg-light hover:bg-light-bg-light-muted dark:hover:bg-dark-bg-light-muted flex aspect-square h-full w-full cursor-pointer items-center justify-center rounded-full'
            htmlFor='file'
          >
            <span className='material-symbols-outlined'>upload</span>
          </label>
          <input id='file' type='file' name='file' multiple hidden />
        </form>
      </div>
    </div>
  );
};

export default UploadButton;
