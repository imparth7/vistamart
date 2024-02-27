import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Image } from '@nextui-org/react';
import { server } from '../components/Server';

const AddProduct = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm()

  const [file, setFile] = useState('')

  const handleChange = (e) => {
    console.log(e.target.files);
    const data = new FileReader();
    data.addEventListener('load', () => {
      setFile(data.result)
      console.log(data.result)
    })
    data.readAsDataURL(e.target.files[0])
  }

  const onSubmit = async (data) => {
    console.log(data)
    const auth = localStorage.getItem('authenticatedUser');
    const authUser = JSON.parse(auth)
    const postData = {
      ...data,
      // file,
      userId: authUser._id
    }
    console.log(postData)

    let res = await fetch(`${server}/addProduct`, {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result = await res.json();
    if (result?.response) {
      // toast.success(result?.message)
      // navigate("/products")
      navigate('/products', { state: { soonerMessage: result?.message } })
    }
  }

  return (
    <MainLayout>
      <div className="flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div className="relative w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-neutral-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-neutral-600">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Add Product to Mart
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">

                <div className="
                w-full sm:col-span-2">
                  {/*grid place-items-center*/}
                  {/* Image file ?
                    <div className='grid place-items-center' onClick={() => setFile()}>
                      <div className="text-center mb-1">
                        Clicking on the image to cancel the image
                      </div>
                      <Image
                        // height={80}
                        alt="NextUI hero Image"
                        src={file}
                        className='w-full h-60 object-cover'
                      />
                    </div>
                    :
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden"
                        accept='.jpg, .jpeg, .png'
                        onChange={handleChange}
                      // {...register("image", { required: true })} 
                      />
                      {errors.image && <span className='text-red-500 font-semibold'>Product Image is required.</span>}
                    </label>
                  */}
                  {/**Image URL Only */}
                  <label htmlFor="image" className="flex mb-2 text-sm font-medium text-neutral-900 dark:text-white">Image URL <span className='pl-3 text-neutral-400 hidden md:block'>You need to paste only image url here</span></label>
                  <input type="text" name="image" id="image"
                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="https://dummyimage.com/200.png"
                    {...register("image", { required: true })} />
                  {errors.name && <span className='text-red-500 font-semibold'>Product Image URL is required.</span>}
                </div>

                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="name"
                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Ex. Apple iMac 27&ldquo;"
                    {...register("name", { required: true })} />
                  {errors.name && <span className='text-red-500 font-semibold'>Product name is required.</span>}
                </div>
                <div>
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Brand</label>
                  <input type="text" name="brand" id="brand"
                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Ex. Apple"
                    {...register("brand", { required: true })} />
                  {errors.brand && <span className='text-red-500 font-semibold'>Product brand is required.</span>}
                </div>
                <div>
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Price</label>
                  <input type="number" name="price" id="price"
                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$299"
                    {...register("price", { required: true })} />
                  {errors.price && <span className='text-red-500 font-semibold'>Product Price is required.</span>}
                </div>
                <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Category</label>
                  <select id="category"
                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    {...register("category", { required: true })}>
                    <option value="Electronics">Electronics</option>
                    <option value="TV/Monitors">TV/Monitors</option>
                    <option value="Personal Computer">Personal Computer</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Gaming/Console">Gaming/Console</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Cameras">Cameras</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Speakers">Speakers</option>
                    <option value="Printers">Printers</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Description</label>
                  <textarea id="description" rows="5" className="block p-2.5 w-full text-sm text-neutral-900 bg-neutral-50 rounded-lg border border-neutral-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write a description..."
                    {...register("description", { required: false })}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Add product
                </button>
                {/**
                <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                  <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                  Delete
                </button>
               */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AddProduct