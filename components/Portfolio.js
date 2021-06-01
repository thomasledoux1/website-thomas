import Case from '../components/Case'
const Portfolio = () => (
  <div className="grid mx-6 sm:mx-0 grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
    <Case
      url="https://www.karaton.be"
      logoAlt="Karaton"
      logoSrc="/logokaraton.png"
      logoWidth={218}
      tags={['mongodb', 'expressjs', 'angular', 'nodejs']}
    >
      <p className="mb-4">
        For Happs Development I created and maintained the website for Karaton
        where speech therapists and parents of dyslexic could follow up on the
        progress their children/patients are making in the Karaton game.
      </p>
      <p className="mb-4">
        There were a lot of graphs to be shown with Highcharts, a payment
        integration through Mollie, different roles for
        admins/therapists/parents.
      </p>
      <p>
        In this team I worked as a Full Stack Developer, giving me a lot of
        insight in how the backend of a web application works.
      </p>
    </Case>
    <Case
      url="https://www.getrialto.com"
      logoAlt="Rialto"
      logoSrc="/logorialto.png"
      logoWidth={321}
      tags={['swift', 'ios']}
    >
      <p className="mb-4">
        At my internship for Rialto I created an iOS app from scratch in Swift
        where real estate companies could easily manage their listings.
      </p>
      <p className="mb-4">
        I created the screens in storyboards based on the designs provided by
        our designer.
      </p>
      <p>
        When the screens were finished I used Swift code to implement
        functionality such as logins through an API, fetching the listings
        through an API, saving the listings in the SQLite database..
      </p>
    </Case>
    <Case
      url="https://play.google.com/store/apps/details?id=com.carlierkathleen.rekenen&hl=nl"
      logoAlt="Carlier Rekenen"
      logoSrc="/logocarlier.png"
      logoWidth={100}
      tags={['react-native', 'reactjs']}
    >
      <p className="mb-4">
        While working at Happs Development I also created a mobile application
        for a speech therapist to help children with discalculia to learn how to
        count and do simple math exercises in a fun game form.
      </p>
      <p className="mb-4">
        The app was created from scratch using React Native for fast
        development, and Expo to get fast previews of the app on real devices.
      </p>
      <p>
        This project taught me a lot about animations, how to handle dynamically
        generated sound output for the spoken numbers, learn which platform
        specific APIs to use..
      </p>
    </Case>
    <Case
      url="https://www.carglass.be"
      logoAlt="Carglass"
      logoSrc="/logocarglass.png"
      logoWidth={374}
      tags={['sitecore', 'reactjs', 'less']}
    >
      <p className="mb-4">
        At my current job at The Reference I help maintain the website for
        Carglass, we keep adding new features and maintain the older code in
        sprints.
      </p>
      <p className="mb-4">
        We have a separate Backend Development team, so my focus is purely on
        the Frontend Development in ReactJS.
      </p>
      <p>
        In the booking flows we make heavy use of MobX for state management,
        Local- and Sessionstorage to save intermediary input by the users and
        integrate with APIs from different parties.
      </p>
    </Case>
    <Case
      url="https://www.nationale-loterij.be"
      logoAlt="Nationale Loterij"
      logoSrc="/logonalo.png"
      logoWidth={240}
      tags={['sitecore', 'reactjs', 'sass']}
    >
      <p className="mb-4">
        One of the other clients I work for at The Reference is Nationale
        Loterij, for this client we constantly create new features with a modern
        look on a monthly basis.
      </p>
      <p className="mb-4">
        In this project I get to test out even more new technologies, and new
        features in the existing technologies (think React Hooks, CSS3
        animations..).
      </p>
      <p>
        The feature I'm most proud of is the interactive Sponsoring Map of
        Belgium we created with some nice animations and beautiful design.
      </p>
    </Case>
    <Case
      url="https://www.achterderegenboog.be"
      logoAlt="Achter De Regenboog"
      logoSrc="/logoachterderegenboog.png"
      logoWidth={150}
      tags={['wordpress', 'html', 'css']}
    >
      <p className="mb-4">
        In my free time I like to experiment with other frameworks and
        technologies too, this is why I made a website using Wordpress for a
        friend of mine who started a psychologists practice.
      </p>
      <p className="mb-4">
        My friend gave me some high level designs, and I got to work! I selected
        a fitting theme.{' '}
      </p>
      <p>
        I built on the theme with a lot of plugins to optimize the speed of the
        website (Autoptimize), the SEO (Yoast) and anti-spam by Akismet.
      </p>
    </Case>
    <Case
      url="https://www.deckdeckgo.com"
      logoAlt="DeckDeckGo"
      logoSrc="/logoduckduckgo.png"
      logoWidth={100}
      tags={['open source', 'hacktoberfest', 'stencil', 'typescript']}
    >
      <p className="mb-4">
        In 2020 I participated in Hacktoberfest for the first time ever. I did
        some research on which open source project I would like to contribute
        to, and landed on DeckDeckGo.
      </p>
      <p>
        It was a lot of fun to coloborate with other open source contributors,
        and to work in a new technological stack. I'm definitely going to
        continue contributing to open source in the future!
      </p>
    </Case>
    <Case
      url="https://www.accentjobs.be"
      logoAlt="Accent Jobs"
      logoSrc="/logoaccent.png"
      logoWidth={532}
      tags={['gatsby', 'drupal', 'typescript', 'emotion']}
    >
      <p className="mb-4">
        At the end of 2020, I got the opportunity to work on a project within
        The Reference using our new MACH stack.
      </p>
      <p className="mb-4">
        This was the first time I was using Gatsby for a production website, and
        I must say it makes developing a breeze. Connecting everything through
        API's, no hard dependecies on a CMS.. I love it.
      </p>
    </Case>
    <Case
      url="https://www.portofantwerp.be"
      logoAlt="Port Of Antwerp"
      logoSrc="/poa.png"
      logoWidth={199}
      tags={['nextjs', 'drupal', 'typescript', 'tailwind']}
    >
      <p className="mb-4">
        Starting february 2021, we started working on a new website for the Port
        of Antwerp. This website uses the MACH stack as mentioned above, but
        with Next.js instead of Gatsby, and Tailwind for styling!
      </p>
      <p>
        I really like this combo (this website is made with these technologies),
        so I couldn't be happier to be the lead frontend developer on this
        project. So far I've learned a lot about the many features and
        possibilities of Next.js, and I'm hoping to create the most performant
        website for this high profile client.
      </p>
    </Case>
  </div>
)
export default Portfolio
