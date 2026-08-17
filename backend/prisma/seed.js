import { prisma } from "../src/config/db.js"

async function main() {
  const artist = await prisma.artist.upsert({
    where: {
      name: "Paramore",
    },
    update: {},
    create: {
      name: "Paramore",
    },
  });

  const album = await prisma.album.upsert({
    where: {
      artistId_title: {
        artistId: artist.id,
        title: "Decode",
      },
    },
    update: {},
    create: {
      title: "Decode",
      releaseYear: 2009,
      artistId: artist.id,
    },
  });

  const track = await prisma.track.create({
    data: {
      title: "Decode",
      trackNumber: 1,

      duration: 262,

      codec: "FLAC",
      bitrate: 1023199,
      sampleRate: 44100,

      filePath: "storage/music/Paramore - Decode.flac",

      albumId: album.id,
    },
  });

  console.log("Created track:", track);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });