const Timeline = ({ experiences }) => {
  const TimelineItem = ({ data, index }) => (
    <div className="flex w-1/2 odd:justify-end even:self-end even:pl-6 odd:pr-6 odd:text-right timeline-item z-10" data-aos={`fade-${index % 2 === 0 ? 'left' : 'right'}`}>
      <div href={data.url} className="rounded sm:max-w-80 shadow dark:bg-darkgrey p-4 relative">
        <time className="text-xs text-grey">{data.date}</time>
        <div dangerouslySetInnerHTML={{ __html: data.text }} />
        <span className={`bg-purple border-solid border-4 border-darkPurple dark:border-orange rounded-full absolute w-4 h-4 top-timelineCircle ${index % 2 === 0 ? '-right-8' : '-left-8'}`} />
      </div>
    </div>
  );
  return (<div className="flex w-full flex-col timeline-container relative">
    {experiences.map((data, i) => (
      <TimelineItem index={i} data={data} key={i} />
    ))}
  </div>);
}

export default Timeline;