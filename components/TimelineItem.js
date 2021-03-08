export default function TimelineItem({index, url, children}) {
  return (
    <div
      className="flex w-1/2 odd:justify-end even:self-end even:pl-6 odd:pr-6 odd:text-right timeline-item z-10"
      data-aos={`fade-${index % 2 === 0 ? 'left' : 'right'}`}
    >
      <div
        href={url}
        className="rounded sm:max-w-80 shadow dark:bg-darkgrey p-4 relative"
      >
        {children}
        <span
          className={`bg-purple border-solid border-4 border-darkPurple dark:border-orange rounded-full absolute w-4 h-4 top-timelineCircle ${
            index % 2 === 0 ? '-right-8' : '-left-8'
          }`}
        />
      </div>
    </div>
  )
}
