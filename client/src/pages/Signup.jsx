import React, { useEffect } from 'react'
import MainLayout from '../layout/MainLayout'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm()

  useEffect(() => {
    const auth = localStorage.getItem('authenticatedUser');
    if(auth){
      navigate('/')
    }
  }, [])
  
  
  const onSubmit = async (data) => {
    // console.log(data)
    const postData = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: `https://robohash.org/${data.name}.png?size=250x250&set=set5`
    }

    let res = await fetch('http://localhost:8000/register', {
      method: 'post',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result = await res.json();
    if (result?.response) {
      localStorage.setItem('authenticatedUser', JSON.stringify(result?.data._doc))
      navigate('/', { state: { soonerMessage: result?.message } })
    }
  }


  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Your name</label>
                <input type="name" name="name" id="name"
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John duo"
                  {...register("name", { required: true })}
                />
                {errors.name && <span className='text-red-500 font-semibold'>This field is required.</span>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email"
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid email address"
                    }
                  })}
                />
                {errors.email && <span className='text-red-500 font-semibold'>{errors.email.message}</span>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password"
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  {...register("password", { required: true, minLength: 8, maxLength: 16 })}
                />
                {errors.password?.type === 'required' && <span className='text-red-500 font-semibold'>This field is required.</span>}
                {(errors.password?.type === 'minLength' || errors.password?.type == 'maxLength') && <span className='text-red-500 font-semibold'>Password must be 8-16 characters.</span>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Confirm password</label>
                <input type="password" name="confirmPassword" id="confirmPassword"
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  {...register(
                    "confirmPassword",
                    {
                      required: true,
                      validate: (val) => {
                        if (watch('password') != val) {
                          return "Your passwords do no match";
                        }
                      },
                    }
                  )}
                />
                {errors.confirmPassword && <span className='text-red-500 font-semibold'>{errors.confirmPassword?.message}</span>}
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              <p className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Signup