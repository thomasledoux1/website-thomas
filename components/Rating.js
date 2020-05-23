import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';
const Rating = ({ title, elements }) => {
  const renderStars = (amount) => Array.apply(null, { length: 5 }).map((_, i) => (
    <span key={i}>
      <FontAwesomeIcon className={i < amount ? 'full' : ''} icon={i < amount ? faStarFull : faStarEmpty} />
    </span>
  ));
  return (
    <div className="cv-rating">
      <h2>{title}</h2>
      {elements.map((el, i) =>
        <div key={i} className="cv-rating--innerWrapper">
          <div className="col-6">{el.name}</div>
          <div className="col-6">
            <div className="cv-rating--starsWrapper">
              {renderStars(el.numberOfStars)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default Rating;