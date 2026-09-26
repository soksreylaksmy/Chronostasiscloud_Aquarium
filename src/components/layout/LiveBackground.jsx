export default function LiveBackground() {
  return (
    <div className="aquatic-live-bg" aria-hidden="true">
      <video
        className="aquatic-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/aquatic-background.mp4" type="video/mp4" />
      </video>

      <div className="aquatic-overlay" />
      <div className="bubble-field">
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className="bubble"
            style={{
              left: `${(index * 19 + 5) % 96}%`,
              animationDelay: `${(index % 7) * -1.2}s`,
              animationDuration: `${9 + (index % 5) * 2.2}s`,
              width: `${6 + (index % 4) * 5}px`,
              height: `${6 + (index % 4) * 5}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
