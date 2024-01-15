const LoginPage = () => {
  return (
    <div className="container">
      <form>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="submit" value="login" />
      </form>
    </div>
  )
}

export default LoginPage;
