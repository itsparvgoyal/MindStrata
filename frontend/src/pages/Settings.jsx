import React from 'react'
import EditProfile from '../components/Settings/EditProfile'
import { Link } from 'react-router-dom'
import { FiKey, FiLock } from 'react-icons/fi'

const Settings = () => { 
  return (
    <div className='max-w-4xl mx-auto px-0 sm:px-6 py-4 space-y-8'>
        
        <div>
          <h1 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
            Account Settings
          </h1>
          <p className='text-gray-400 text-xs sm:text-sm mt-1'>
            Manage your profile details, avatar, and security preferences.
          </p>
        </div>

        <EditProfile />

        <div className='bg-[#121217] border border-[#22222c] rounded-2xl p-6 sm:p-8'>
          <h2 className='text-lg font-bold text-white border-b border-[#1e1e26] pb-3 mb-4 flex items-center gap-2'>
            <FiLock className='text-gray-400' size={18} />
            Password & Security
          </h2>
          <p className='text-gray-400 text-xs sm:text-sm mb-6'>
            Update your account password or initiate a password reset link.
          </p>

          <div className='flex flex-wrap gap-4'>
            <Link 
              to="/changePassword" 
              className='inline-flex items-center gap-2 bg-[#181820] border border-[#2a2a34] hover:border-gray-500 text-gray-200 font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm transition-colors'
            >
              <FiKey size={14} />
              Change Password
            </Link>
            
            <Link 
              to="/resetPassword" 
              className='inline-flex items-center gap-2 bg-[#181820] border border-[#2a2a34] hover:border-gray-500 text-gray-200 font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm transition-colors'
            >
              <FiLock size={14} />
              Reset Password
            </Link>
          </div>
        </div>

    </div>
  )
}

export default Settings