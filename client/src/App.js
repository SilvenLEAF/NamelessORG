import 'materialize-css/dist/css/materialize.min.css'

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'



import AuthContextProvider from './contexts/AuthContext'
import BugContextProvider from './contexts/BugContext'



import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'

import Home from './components/home/Home'
import Profile from './components/profile/Profile'
import Solver from './components/solver/Solver'
import AddBugCodeForm from './components/solver/AddBugCodeForm'
import Team from './components/team/Team'
import Spies from './components/spies/Spies'
import Entertainment from './components/entertainment/Entertainment'
import AddEntertainmentCodeForm from './components/entertainment/AddEntertainmentCodeForm'

import SignupForm from './components/auth/SignupForm'
import LoginForm from './components/auth/LoginForm'

function App() {
  
  /* ----------------------------------------
  .               Github Data
  ---------------------------------------- */
  // const githubData = {
  //   _id: {"$oid":"5f43b9fa623cdb00175f29de"},
  //   location: "Earth",
  //   about: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem perferendis expedita labore, inventore amet quas illo hic consequuntur mollitia excepturi! Libero quas nostrum illo veritatis eligendi ex ducimus, voluptatibus incidunt sed inventore ipsam quo assumenda officia quibusdam. Excepturi aperiam, dolor dignissimos recusandae hic provident magnam maiores, itaque aut, officiis placeat.",
  //   skills: "no skills yet",
  //   role: "user",
  //   userName: "Manash Sarma",
  //   profileImage: "https://avatars0.githubusercontent.com/u/62974089?v=4",
  //   github: {
  //     _id: {"$oid":"5f43b9fa623cdb00175f29df"},
  //     githubId: "62974089",
  //     userName: "Manash Sarma",
  //     email: "SilvenLEAF@gmail.com",
  //     image: "https://avatars0.githubusercontent.com/u/62974089?v=4"
  //   },
  //   __v:{"$numberInt":"0"}
  // }  
  // const [userData, setUserData] = useState(githubData);
  
  const [userData, setUserData] = useState();
  const [bugPosts, setBugPosts] = useState([1,3,4,6,7])



  /* ----------------------------------------
  .            GET LOGGED IN USER
  ---------------------------------------- */
  useEffect(()=>{
    const getLoggedinUser = async ()=>{
      const loggedinUserRes = await fetch('/users/');
      const loggedinUserData = await loggedinUserRes.json();

      console.log(loggedinUserData);
      setUserData(loggedinUserData)
    }

    getLoggedinUser();
  }, [])


   /* ----------------------------------------
  .            GET ALL BUG POSTS
  ---------------------------------------- */
  useEffect(()=>{
    const getAllBugPosts = async ()=>{
      const allBugPostRes = await fetch('/bugCodes/all');
      const allBugPostData = await allBugPostRes.json();

      console.log(allBugPostData);
      setBugPosts(allBugPostData)
    }

    getAllBugPosts();
  }, [])






  

  return (
    <BrowserRouter>
      <AuthContextProvider userData={ userData } setUserData={ setUserData }>
        <BugContextProvider bugPosts={ bugPosts } setBugPosts={ setBugPosts }>




        <div className="App">
              <Navbar />
              <div id="myWrapper">
                

                <Switch>
                  <Route exact path="/">
                    <Home/>
                  </Route>

                  <Route path="/profile">
                    <Profile />
                  </Route>

                  <Route path="/solver">
                    <Solver/>
                  </Route>

                  <Route path="/addBug">
                    <AddBugCodeForm/>
                  </Route>

                  <Route path="/team">
                    <Team/>
                  </Route>

                  <Route path="/spies">
                    <Spies/>
                  </Route>

                  <Route path="/entertainment">
                    <Entertainment/>
                  </Route>

                  <Route path="/addEntertainment">
                    <AddEntertainmentCodeForm/>
                  </Route>


                  <Route path="/signup">
                    <SignupForm/>
                  </Route>

                  <Route path="/login">
                    <LoginForm/>
                  </Route>


                </Switch>
              </div>


              <Footer />
            </div>



        </BugContextProvider>
      </AuthContextProvider>



    </BrowserRouter>
  )
}

export default App
