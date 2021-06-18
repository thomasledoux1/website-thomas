export default function TimelineItem({index, url, children}) {
  return (
    <div
      className="flex w-1/2 odd:justify-end even:self-end even:pl-6 odd:pr-6 odd:text-right after:bg-white timeline-item dark:after:bg-darkgrey even:after:right-auto even:after:left-4 after:absolute after:right-4 after:transform after:rotate-45 after:w-4 after:h-4 z-10"
      data-aos={`fade-${index % 2 === 0 ? 'left' : 'right'}`}
    >
      <div className="rounded sm:max-w-[80%] shadow dark:bg-darkgrey p-4 relative">
        {children}
        <span
          className={`bg-purple border-solid border-4 border-primary rounded-full absolute w-4 h-4 top-timelineCircle ${
            index % 2 === 0 ? '-right-8' : '-left-8'
          }`}
        />
      </div>
    </div>
  )
}
