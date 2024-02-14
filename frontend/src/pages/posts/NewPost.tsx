const NewPostPage = () => {
  return (
    <div className="container">
      <h1 className="text-center text-capitalize heading">new post</h1>
      <form>
        <input type="text" placeholder="title" />
        <textarea placeholder="post content"></textarea>
        <input type="file" accept="*/images" />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default NewPostPage;
