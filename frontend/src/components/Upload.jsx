import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RiUploadCloud2Line } from 'react-icons/ri';
import { CiFileOn } from 'react-icons/ci';

import fileUpload from '../utils/fileUpload';
import Sidebar from './Sidebar';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const progressComplete = useSelector((state) => state.progress.progress);
    const fileSelectedHandler = (event) => {
        const file = event.target.files;
        for (let f of file) {
            setFiles((files) => [...files, f]);
        }
    };

    const fileUploadHandler = async (event) => {
        event.preventDefault();
        for (let file of files) {
            setUploading(true);
            const formData = new FormData();
            formData.append('fileUpload', file);
            formData.encType = 'multipart/form-data';
            const response = await fileUpload('/file/upload', formData);
            if (response != null) {
                setFiles((files) => files.filter((f) => f.name !== file.name));
            }
            setUploading(false);
        }
        event.target.reset();
    };

    const fileList = files.map((file, index) => {
        return (
            <div
                className="border rounded-lg h-16 flex flex-row gap-2 px-2 items-center mx-2 overflow-hidden mt-2 md:w-2/5 md:mx-auto"
                key={index}
            >
                <div className="basis-1/12 text-3xl border-r">
                    <div>
                        <CiFileOn />
                    </div>
                </div>
                <div className="basis-10/12">
                    <h4>
                        {file.name.length > 30
                            ? file.name.slice(0, 27) + '...'
                            : file.name}
                    </h4>
                </div>
                <div className="aspect-square bg-dark-lite rounded-full basis-1/12">
                    <p className="flex justify-center items-center text-xl aspect-square">
                        &#10004;
                    </p>
                </div>
            </div>
        );
    });

    return (
        <>
            <Sidebar />
            <div className="w-4/5 h-[300px] mx-auto relative mt-40 md:w-3/5 md:h-[400px] md:mt-24">
                <form
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={fileUploadHandler}
                    className="grid grid-rows-2 gap-2 w-full h-full"
                >
                    <div className="border w-11/12 mx-auto border-dashed rounded-lg">
                        <label
                            htmlFor="fileUpload"
                            className="inline-flex items-center justify-center w-full h-full gap-2 text-2xl hover:cursor-pointer"
                        >
                            {' '}
                            <span>
                                <RiUploadCloud2Line />
                            </span>{' '}
                            Choose files
                        </label>
                        <input
                            type="file"
                            name="fileUpload"
                            id="fileUpload"
                            accept="image/*, video/*, audio/*"
                            multiple
                            hidden
                            onChange={fileSelectedHandler}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="bg-dark-lite w-28 h-12 text-lg font-medium"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
            {uploading && (
                <div className="w-4/5 mx-auto">
                    <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">
                        {parseInt(progressComplete)}%
                    </div>
                    <div className="bg-dark-lite rounded-full h-2.5 mb-4">
                        <div
                            className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
                            style={{
                                width: `${progressComplete}%`,
                            }}
                        ></div>
                    </div>
                </div>
            )}
            {fileList}
        </>
    );
};

export default Upload;
