import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification";
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const logOffHandler = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken('')
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

  const addNewBlog = (event) => {
    event.preventDefault()
      const newBlog = {
        title: title,
        author: author,
        url: url,
        id: blogs.length + 1
      }

      blogService.create(newBlog)
          .then(result => {
            setBlogs(blogs.concat(result))
            setTitle('')
            setAuthor('')
            setUrl('')
            setMessage(`${result.title} added by ${result.author}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
  }

  const blogForm = () => (
      <div>
        <form className="blog-form" onSubmit={addNewBlog}>
          title <input value={title} onChange={({target}) => setTitle(target.value)}/>
          author <input value={author} onChange={({target}) => setAuthor(target.value)}/>
          url <input value={url} onChange={({target}) => setUrl(target.value)}/>
          <button type="submit">create</button>
        </form>
        <p>{user.username} is logged in <button type="button" onClick={logOffHandler}>log off</button></p>
        <div>{blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}</div>
      </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}></Notification>

      {user === null ? loginForm() : blogForm()}

    </div>
  )
}

export default App
