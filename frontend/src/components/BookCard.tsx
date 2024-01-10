const BookCard = () => {
  return (
    <div className="book-card">
      <div>
        <img 
          alt="It's a problem loading images" 
          src="" 
          className="post-img" 
        />
      </div>
      <div>
        <h2>Post header</h2>
        <p>
          Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, 
          consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor.
          Sit amet cursus nisl aliquam. …
        </p>
        <a href="#">read more</a>
      </div>
    </div>
  )
}

export default BookCard;
