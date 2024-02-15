import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { Button, Link } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

const Shop = () => {
  const location = useLocation();
  const { state } = location

  const [allProductsData, setAllProductsData] = useState([])
  const [productsData, setProductsData] = useState([])
  const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm()

  const auth = localStorage.getItem('authenticatedUser');
  const authUserObject = JSON.parse(auth)

  useEffect(() => {
    // Sooner message
    if (state?.soonerMessage) { toast.success(state.soonerMessage) }
    window.history.replaceState({}, '')

    // Get data of products
    getData();
  }, [])

  const getData = async () => {
    const userAuth = {
      'userId': authUserObject._id
    }

    const res = await fetch('http://localhost:8000/userProducts', {
      method: 'post',
      body: JSON.stringify(userAuth),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const resultData = await res.json()
    setAllProductsData(resultData.data)
    setProductsData(resultData.data)
  }


  const onSubmit = async (data) => {
    // console.log(data)
    let res = await fetch(`http://localhost:8000/search/${authUserObject._id}/${data.key}`)
    const result = await res.json();
    // console.warn(result.data);
    setProductsData(result.data);
  }

  const onReset = () => {
    setProductsData(allProductsData);
  }


  return (
    <MainLayout>

      <form className="max-w-md mx-auto mb-5"
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}>
        <div className="relative">
          <input type="text" id="default-search" name="key"
            className="block w-full p-4 pe-20 text-sm text-neutral-900 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search Product, Brand, Category..."
            {...register("key", { required: true })} />

          <div className='absolute end-2.5 bottom-2.5 flex gap-2'>
            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm p-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0" />
                </g>
              </svg>
            </button>
            <button type="reset" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm p-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path fill="currentColor" d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
          <thead className="text-xs text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className='divide-y dark:divide-neutral-700'>
            {
              !productsData ?
                <tr className="odd:bg-white odd:dark:bg-neutral-900 even:bg-neutral-50 even:dark:bg-neutral-800">
                  <th scope="row" className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
                    No Data
                  </th>
                  <td className="px-6 py-4">
                    No Data
                  </td>
                  <td className="px-6 py-4">
                    No Data
                  </td>
                  <td className="px-6 py-4">
                    No data
                  </td>
                  <td className="px-6 py-4">
                    No Action
                  </td>
                </tr> :
                productsData.map((item, index) => {
                  return (
                    <tr key={item._id} className="odd:bg-white odd:dark:bg-neutral-900 even:bg-neutral-50 even:dark:bg-neutral-800">
                      <th scope="row" className="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
                        {item.name}
                      </th>
                      <td className="px-6 py-4">
                        {item.brand}
                      </td>
                      <td className="px-6 py-4">
                        {item.category}
                      </td>
                      <td className="px-6 py-4">
                        ${item.price}
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/updateproduct/${item._id}`}>
                          <Button variant="light"
                            className="font-medium text-primary-600 dark:text-primary-500">
                            Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
      </div>

    </MainLayout>
  )
}

export default Shop