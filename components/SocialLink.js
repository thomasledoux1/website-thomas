import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
const SocialLink = ({label, href, icon, lastItem, fill = 'fill-current'}) => (
  <li>
    <a target="_blank" rel="noopener noreferrer" aria-label={label} href={href}>
      <FontAwesomeIcon size="2x" icon={icon} className={fill} />
    </a>
  </li>
)

export default SocialLink
