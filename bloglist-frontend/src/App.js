import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification";
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs( initialBlogs )
      })
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userFromStorage = JSON.parse(loggedUserJSON)
      setUser(userFromStorage)
      blogService.setToken(userFromStorage.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userToLogin = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
          'loggedUser', JSON.stringify(userToLogin)
      )
      setUser(userToLogin)
      blogService.setToken(userToLogin.token)
      setUsername('')
      setPassword('')
    } catch (e) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOff = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken('')
    setBlogs([])
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
        .then(returnedObject => {
          setBlogs(blogs.concat(returnedObject))

          setMessage(`${returnedObject.title} added by ${returnedObject.author}`)
          setTimeout(() => {
              setMessage(null)
          }, 5000)
        })
  }

  const toggleLike = id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {...blog, likes: blog.likes + 1}

    blogService
        .update(id, changedBlog)
        .then(returnedBlog => {
          setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        })
        .catch(e => {
          setMessage(`Blog ${blog.title} was already removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setBlogs(blogs.filter(b => b.id !== id))
        })
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message}></Notification>

      {user === null ?
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleChangeUser={({target}) => setUsername(target.value)}
              handleChangePassword={({target}) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable> :
          <div>
            <p>{user.username} is logged<button className="button-logoff" onClick={handleLogOff}>log off</button></p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog}/>
            </Togglable>
          </div>}
      <ul>
        {blogs.map(blog =>
              <Blog
                  key={blog.id}
                  blog={blog}
                  toggleLike={() => toggleLike(blog.id)}
              />
        )}
      </ul>
    </div>
  )
}

export default App
