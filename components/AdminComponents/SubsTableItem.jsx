import React from 'react'

const SubsTableItem = ({email, mongoId, date, deleteEmail}) => {
    const emailDate = new Date(date);

  return (
    <tr className='bg-white border-b text-left'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-700 whitespace-nowrap'>{email ? email : 'No Email'}</th>
        <td className='hidden sm:block px-6 py-4'>{emailDate.toDateString()}</td>
        <td className='px-6 py-4 cursor-pointer' onClick={()=> deleteEmail(mongoId)}>x</td>
    </tr>
  )
}

export default SubsTableItem