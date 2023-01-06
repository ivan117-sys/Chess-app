import './Tile.css';

function Tile(props) {
  if (props.number % 2 === 0) {
    return (
      <div className="square black__color">
        {props.image && (
          <div
            className="pieces"
            style={{ backgroundImage: `url(${props.image})` }}
          ></div>
        )}
      </div>
    );
  } else {
    return (
      <div className="square white__color">
        {props.image && (
          <div
            className="pieces"
            style={{ backgroundImage: `url(${props.image})` }}
          ></div>
        )}
      </div>
    );
  }
}

export default Tile;
