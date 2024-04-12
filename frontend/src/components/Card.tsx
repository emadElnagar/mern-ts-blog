import { Key } from "react";

type itemProps = {
  _id: Key;
  title: string;
  category: string;
  image: string;
}

const Card = (item: itemProps) => {
  return (
    <div className="item-card">
      <div>
        <img 
          alt="It's a problem loading images" 
          src={`http://localhost:5000/${item.image}`} 
          className="post-img" 
        />
      </div>
      <div className="card-body">
        <span className="category">{item.category}</span>
        <h3>{item.title}</h3>
      </div>
    </div>
  )
}

export default Card;
