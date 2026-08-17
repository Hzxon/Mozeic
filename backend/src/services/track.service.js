import { prisma } from "../config/db.js"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storagePath = path.resolve(__dirname, "../../storage")


const getTrack = async(id) => {
    const track = await prisma.track.findUnique({
        where: { id }
    })

    if (!track) {
        return null
    }

    return {
        ...track,
        absoluteFilePath: path.join(
            storagePath,
            track.filePath.replace(/^storage[\\/]/, "")
        )
    }
}

export default { getTrack, };