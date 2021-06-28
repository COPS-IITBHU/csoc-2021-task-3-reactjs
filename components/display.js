import Image from 'next/image'

const ListItem = ({title,iid,editTask,deleteTask,updateTask}) => {
    return (
        <li className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={`input-button-${iid}`}
          type='text'
          className='hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
          placeholder='Edit The Task'
        />
        <div id={`done-button-${iid}`} className='hideme'>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={()=>updateTask(iid)}
          >
            Done
          </button>
        </div>
        <div id={`task-${iid}`} className='todo-task  text-gray-600'>
          {title}
        </div>
        <span id={`task-actions-${iid}`} className=''>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={()=>editTask(iid)}
            className='bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2'
          >
            <Image
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png'
              width='18px'
              height='20px'
              alt='Edit'
            />
          </button>
          <button
            type='button'
            className='bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2'
            onClick={()=>deleteTask(iid)}
          >
            <Image
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
      </li>
    )
}

export default ListItem;