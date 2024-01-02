import { useState, useEffect, useRef } from 'react'
import Diary from './components/Diary'
import diaryService from './services/diaries'
import CreateDiary from './components/CreateDiary'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [diaries, setDiaries] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notiType, setNotiType] = useState(null)


  const diaryFormRef = useRef()

  useEffect(() => {
    // const loggedUserJSON = window.localStorage.getItem('loggedDiaryAppUser')
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   setUser(user)
    //   // diaryService.setToken(user.token)
    //   diaryService.getAll().then(diaries =>
    //     setDiaries( diaries )
    //   )
    // }
    console.log(user)
    if (user) {
      console.log("ss")
      diaryService.getAll(user).then(diaries =>
        setDiaries( diaries )
      )
    }
  }, [user])



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      // window.localStorage.setItem('loggedDiaryAppUser', JSON.stringify(user))
      // diaryService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotiType('create')
      setNotification('Logged in succesfully!')
      setTimeout(() => {
        setNotification(null)
      }, 4000)

    } catch(error) {
    //   setNotiType('error')
    //   setNotification(`Error: ${error.message}`)

    //   setTimeout(() => {
    //     setNotification(null)
    //   }, 4000)
    // }

    // This way of implementing error message is not a good choice since it makes
    // it possible to me a DOM-based XSS attack, DOM mutation directly makes it easier for an attacker
    // to injext it with data containing malicious JS 
    console.log(error)
    const notiElement = document.getElementById('notiId')
    const notiMessage = `${JSON.stringify(error)}`
    notiElement.append(notiMessage)
    // More safer way:
    //
    // setNotification('Invalid referral code')
    //   setTimeout(()=>{
    //    setNotification(null)
    //   },1000)
  }}

  const createNewDiary = (newdiaryObject) => {


    diaryFormRef.current.toggleVisibility()
    console.log(newdiaryObject)
    diaryService.create(newdiaryObject).then(returnedDiary => {
      returnedDiary.user = user
      setDiaries(diaries.concat(returnedDiary))
      setNotiType('created')
      setNotification('You created a new blog!')
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }).catch(error => {
      setNotiType('error')
      console.log(error
        )
      // CWE-209: Generation of Error Message Containing Sensitive Information
      const notiElement = document.getElementById('notiId')
      const notiMessage = `${JSON.stringify(error)}`
      notiElement.append(notiMessage)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    })

  }

  const handleLogout = (event) => {
    event.preventDefault()
    // window.localStorage.removeItem('loggedDiaryAppUser')
    setUser(null)

  }

  

  const handleDelete = async (deletethisD) => {
    if (window.confirm(`Are you sure you want to remove ${deletethisD.title}?`)) {
      try {
        console.log(deletethisD)
        await diaryService.remove(deletethisD.id)
        if (diaries.indexOf(deletethisD)) {
          diaries.splice(diaries.indexOf(deletethisD), 1)
        }
        setNotiType('create')
        setNotification('Diary deleted succesfully!')
        setTimeout(() => {
          setNotification(null)
        }, 4000)
      } catch(error) {
        setNotiType('delete')
        setNotification('Could not delete the diary because of ' + error.response.data.message)
        setTimeout(() => {
          setNotification(null)
        },4000)
      }
    }
  }



  return (
    <div>
      <h1>Diary app</h1>
      {/*
      This is more secure way of implementing the notification messages
       <div>
        {notification}
      </div> */}

      {
        !user &&
        <Togglable buttonLabel="log in">
          <LoginForm username={username} password={password}  handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}/>
        </Togglable>

      }
      {
        user &&
        <div>
          <h1>Logged in as {user.username} <button onClick={handleLogout}>Log out</button></h1>
          <Togglable buttonLabel="create new diaryentry" ref={diaryFormRef}>
            <CreateDiary createNewDiary={createNewDiary}/>
          </Togglable>

          {diaries.map(diary =>
            <Diary key={diary.id} diary={diary}  deleteDiary={handleDelete} user={user}/>
          )}
        </div>

      }
    </div>

  )



}

export default App