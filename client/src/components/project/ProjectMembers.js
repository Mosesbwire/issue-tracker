import React, { Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import List from '../list/List'


const ProjectMembers = ({members, users:{users, loading}}) => {
    const [open, setOpen] = useState(false)
    const openList = ()=> setOpen(!open)
    const closeList =()=> setOpen(false)

  return (
    <Fragment>
        {   open ?
                <Fragment>
                    <div className='overlay' onClick={closeList}></div>
                    <List type={'checkbox'} closeList={closeList} legend={'Select people to add to project'} users={users}/>
                </Fragment>: null
        }
        
        <div className="full-description members-list">
            <div className='space-between'>
                <p>Project Members</p>
                <button className='btn-primary' onClick={openList}>Add Members</button>
            </div>

            <div className="members-wrapper">
                {members.length === 0 ? <p>This project currently has no members</p> : <Fragment>
                    {members.map(member => {
                        {!member.project &&(
                            <div className="space-between member" key={member._id}>
                            <p>{`${member.firstname} ${member.lastname}`}</p>
                            <p>{member.role}</p>
                        </div>
                        )}
                        
                    })}
                    </Fragment>}
                
                
            </div>
        </div>
    </Fragment>
  )
}

ProjectMembers.propTypes = {
    members: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,    
}



export default ProjectMembers
