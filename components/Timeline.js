const Timeline = ({ experiences }) => {
  const TimelineItem = ({ data, index }) => (
    <div className="timeline-item" data-aos={`fade-${index % 2 === 0 ? 'left' : 'right'}`}>
      <div className="timeline-item-content">
        <time>{data.date}</time>
        <p>{data.text}</p>
        <span className="circle" />
      </div>
    </div>
  );
  return (<div className="timeline-container">
    {experiences.map((data, i) => (
      <TimelineItem index={i} data={data} key={i} />
    ))}
  </div>);
}

export default Timeline;