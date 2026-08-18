import { prisma } from "../src/config/db.js"
import { parseFile } from "music-metadata";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MUSIC_DIR = path.join(__dirname, "../storage/music");

async function main() {
  console.log("Seeding music database...\n");

  const files = await fs.readdir(MUSIC_DIR);

  const audioFiles = files.filter((file) => {
    const extension = path.extname(file).toLowerCase();

    return [".mp3", ".flac", ".wav", ".aac", ".ogg", ".m4a"].includes(
      extension
    );
  });

  console.log(`Found ${audioFiles.length} audio files.\n`);

  for (const file of audioFiles) {
    const filePath = path.join(MUSIC_DIR, file);

    console.log(`Processing: ${file}`);

    const metadata = await parseFile(filePath);

    const common = metadata.common;
    const format = metadata.format;

    const artistName = common.artist;
    const albumTitle = common.album;
    const title = common.title;

    if (!artistName) {
      console.log(`  Skipped: artist metadata not found\n`);
      continue;
    }

    if (!albumTitle) {
      console.log(`  Skipped: album metadata not found\n`);
      continue;
    }

    if (!title) {
      console.log(`  Skipped: title metadata not found\n`);
      continue;
    }

    /*
     * Artist
     */
    const artist = await prisma.artist.upsert({
      where: {
        name: artistName
      },
      update: {},
      create: {
        name: artistName
      }
    });

    /*
     * Album
     */
    const album = await prisma.album.upsert({
      where: {
        artistId_title: {
          artistId: artist.id,
          title: albumTitle
        }
      },
      update: {},
      create: {
        title: albumTitle,
        releaseYear: common.year ?? null,
        artistId: artist.id
      }
    });

    /*
     * Track
     */
    const databasePath = path.relative(
      path.join(__dirname, ".."),
      filePath
    );

    await prisma.track.upsert({
      where: {
        filePath: databasePath
      },
      update: {
        title,
        trackNumber: common.track.no ?? null,
        duration: Math.round(format.duration ?? 0),
        codec: getCodec(format.codec),
        bitrate: format.bitrate
          ? Math.round(format.bitrate / 1000)
          : 0,
        sampleRate: format.sampleRate
          ? Math.round(format.sampleRate)
          : 0,
        albumId: album.id
      },
      create: {
        title,
        trackNumber: common.track.no ?? null,
        duration: Math.round(format.duration ?? 0),
        codec: getCodec(format.codec),
        bitrate: format.bitrate
          ? Math.round(format.bitrate / 1000)
          : 0,
        sampleRate: format.sampleRate
          ? Math.round(format.sampleRate)
          : 0,
        filePath: databasePath,
        albumId: album.id
      }
    });

    console.log(`  Artist: ${artistName}`);
    console.log(`  Album: ${albumTitle}`);
    console.log(`  Track: ${title}`);
    console.log(`  Duration: ${Math.round(format.duration ?? 0)}s`);
    console.log(`  Codec: ${getCodec(format.codec)}`);
    console.log(`  Bitrate: ${format.bitrate ?? "unknown"}`);
    console.log(`  Sample rate: ${format.sampleRate ?? "unknown"} Hz`);
    console.log();
  }

  console.log("Music database seeded successfully.");
}

function getCodec(codec) {
  if (!codec) {
    throw new Error("Unable to determine audio codec");
  }

  const normalized = codec.toLowerCase();

  if (normalized.includes("flac")) {
    return "FLAC";
  }

  if (normalized.includes("mpeg") || normalized.includes("mp3")) {
    return "MP3";
  }

  if (normalized.includes("aac")) {
    return "AAC";
  }

  if (normalized.includes("wav") || normalized.includes("pcm")) {
    return "WAV";
  }

  if (normalized.includes("ogg") || normalized.includes("vorbis")) {
    return "OGG";
  }

  throw new Error(`Unsupported codec: ${codec}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });