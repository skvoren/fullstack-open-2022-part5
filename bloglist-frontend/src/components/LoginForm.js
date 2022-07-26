import PropTypes from 'prop-types'

const LoginForm = ({ username,
    password,
    handleChangeUser,
    handleChangePassword,
    handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                username
                <input type="text"
                    value={username}
                    name="Username"
                    onChange={handleChangeUser}
                />
            </div>
            <div>
                password
                <input type="password"
                    value={password}
                    name="Password"
                    onChange={handleChangePassword}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleChangeUser: PropTypes.func.isRequired,
    handleChangePassword: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
