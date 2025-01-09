import React from "react";

import { RiUploadCloud2Line } from "react-icons/ri";
import { CiFileOn } from "react-icons/ci";

const Upload = () => {
  return (
    <>
      <div className="w-4/5 h-[300px] mx-auto relative mt-40 md:w-3/5 md:h-[400px] md:mt-24">
        <form
          method="post"
          encType="multipart/form-data"
          className="grid grid-rows-2 gap-2 w-full h-full"
        >
          <div className="border w-11/12 mx-auto border-dashed rounded-lg">
            <label
              htmlFor="fileUpload"
              className="inline-flex items-center justify-center w-full h-full gap-2 text-2xl hover:cursor-pointer"
            >
              {" "}
              <span>
                <RiUploadCloud2Line />
              </span>{" "}
              Choose files
            </label>
            <input
              type="file"
              name="fileUpload"
              id="fileUpload"
              accept="image/*, video/*, audio/*"
              multiple
              hidden
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

      <div className="border rounded-lg h-16 flex flex-row gap-2 px-2 items-center mx-2 overflow-hidden md:w-2/5 md:mx-auto">
        <div className="basis-1/12 text-3xl border-r">
          <div>
            <CiFileOn />
          </div>
        </div>
        <div className="basis-10/12">
          <h4>Lorem ipsum dolor, sit</h4>
        </div>
        <div className="aspect-square bg-dark-lite rounded-full basis-1/12">
          <p className="flex justify-center items-center text-xl aspect-square">
            &#10004;
          </p>
        </div>
      </div>
    </>
  );
};

export default Upload;
