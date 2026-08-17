import TrackCard from "./TrackCard";

const tracks = [
  {
    id: 1,
    title: "Track One",
    artist: "Artist One",
    cover: "https://placehold.co/300x300",
  },
  {
    id: 2,
    title: "Track Two",
    artist: "Artist Two",
    cover: "https://placehold.co/300x300",
  },
  {
    id: 3,
    title: "Track Three",
    artist: "Artist Three",
    cover: "https://placehold.co/300x300",
  },
  {
    id: 4,
    title: "Track Four",
    artist: "Artist Four",
    cover: "https://placehold.co/300x300",
  },
];

export default function RecentlyAdded() {
  return (
    <section className="recently-added">
      <h2>Recently Added</h2>

      <div className="track-grid">
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
          />
        ))}
      </div>
    </section>
  );
}