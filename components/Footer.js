import SocialLink from './SocialLink'
import {faGithub, faLinkedin, faDev} from '@fortawesome/free-brands-svg-icons'
const Footer = () => (
  <footer className="bg-secondary">
    <div className="p-6 flex justify-center items-center">
      <ul className="flex gap-6">
        <SocialLink
          label="linkedin"
          href="https://www.linkedin.com/in/thomasledoux91"
          fill="text-linkedIn"
          icon={faLinkedin}
        />
        <SocialLink
          label="github"
          href="https://github.com/thomasledoux1"
          icon={faGithub}
        />
        <SocialLink
          label="dev.to"
          href="https://dev.to/thomasledoux1"
          icon={faDev}
          lastItem
        />
      </ul>
    </div>
  </footer>
)

export default Footer
