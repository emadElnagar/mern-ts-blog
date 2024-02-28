const NewCategoryPage = () => {
  return (
    <div className="container">
      <h1 className="text-center text-capitalize heading">new category</h1>
      <form className="colum-form">
        <input type="text" placeholder="title" />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default NewCategoryPage;
