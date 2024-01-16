const RegisterPage = () => {
  return (
    <div className="container">
      <form>
        <input type="text" placeholder="first name" />
        <input type="text" placeholder="last name" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="password" placeholder="re enter password" />
        <input type="submit" value="register" />
      </form>
    </div>
  )
}

export default RegisterPage;
