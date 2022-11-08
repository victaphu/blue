import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
require('../styles/Home.module.css')

const Home: NextPage = () => {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-48 w-auto" src="/images/screens/splash.svg" alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500"> Register a new Account</a>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />

          <div>
            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
              </span>
              Web3 Auth Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
