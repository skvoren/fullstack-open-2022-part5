import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification";
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs( initialBlogs )
      })
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userToLogin = await loginService.login({
        username, password
      })
      blogService.setToken(userToLogin.token)
      setUser(userToLogin)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text"
                 value={username}
                 name="Username"
                 onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input type="password"
                 value={password}
                 name="Password"
                 onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
      <form>
        <p>{user.username} is logged in</p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
      </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}></Notification>

      {user === null ? loginForm() : blogForm()}

    </div>
  )
}

export default App
