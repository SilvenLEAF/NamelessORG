import M from 'materialize-css'
import '../../styles/Solver.scss'

import React, { useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { BugContext } from '../../contexts/BugContext'
import { AuthContext } from '../../contexts/AuthContext'


import BugCodeItem from '../solver/BugCodeItem';

function Solver() {
  useEffect(()=>{
    M.AutoInit();
  }, [])



  const { userData, setUserData } = useContext(AuthContext)
  const { bugPosts, setBugPosts } = useContext(BugContext);
  const history = useHistory()

  if(!userData._id) history.push('/login')
  
  return (
    <div className="container solverPage">
      <h6 className="blue-text">Pending Bugs HERE</h6>
      
      <div className="container mySwitchContainer">
        <Link to="/solvedCodes" className="mySolverPageSwitch"><i className="fa fa-medkit"></i> See  Solved</Link>
      </div>
      {
        ( userData.role !== 'ceo' && userData.role !== 'cto' ) && (
          <Link to="/addBug" className="blue fa fa-plus myAddBtn"></Link>
        )
      }

      <div id="mySolverItemsHolder">
        {
          bugPosts[0] && bugPosts.filter((item, index)=> item.solved === false).map((item, index)=>{
            return <BugCodeItem setBugPosts={ setBugPosts } allPosts={ bugPosts} bugPost={item} index={index} key={index} />
          })
        }

        {
          !bugPosts.filter((item, index)=> item.solved === false)[0] && (
            <div className="center purple-text" style={{marginTop: "50px", fontSize: "150%" }} >
              No Bugs for you now! Yay!!
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Solver
