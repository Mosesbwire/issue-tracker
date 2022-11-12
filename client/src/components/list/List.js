import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const List = ({type, legend,users, closeList}) => {
    const onSubmit = e => {
        e.preventDefault()
        closeList()
    }
  return (
    <div className=' atop-overlay'>
      <form className='list' onSubmit={e => onSubmit(e)}>
        <fieldset>
            <legend>{legend}</legend>
            {users.length > 0 ? (<Fragment>
                {users.map(user => (<div className='space-between' key={user._id}>
                    <p>{`${user.firstname} ${user.lastname}`}</p>
                    <input type={type} value={user}/>
                </div>))}
            </Fragment>) : <p>No users availbale</p>}
        </fieldset>
        <button className='btn-primary'>Submit</button>
      </form>
    </div>
  )
}

List.propTypes = {
    type: PropTypes.string,
    legend: PropTypes.string,
    closeList: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
}

export default List
