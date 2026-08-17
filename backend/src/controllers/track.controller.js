import trackService from "../services/track.service.js"

import fs from "node:fs"

const streamTrack = async (req, res) => {
    const id = req.params.id
    const track = await trackService.getTrack(id)

    if (!track) {
        return res.sendStatus(404)
    }

    const filePath = track.filePath
    const codec = track.codec.toLowerCase()
    
    if (codec == "mp3") codec = "mpeg"


    if (!fs.existsSync(filePath)) {
        return res.sendStatus(404)
    }

    const stat = fs.statSync(filePath)
    const fileSize = stat.size

    const range = req.headers.range;

    if (!range) {
        res.status(200)
        res.setHeader("Content-Type", `audio/${codec}`)
        res.setHeader("Content-Length", stat.size)

        return fs.createReadStream(filePath).pipe(res)
    }

    const [startString, endString] = range.replace("bytes=", "").split("-")

    const start = Number(startString)
    const end = endString ? Number(endString) : fileSize-1;

    if (
        Number.isNaN(start) ||
        Number.isNaN(end) || 
        start >= fileSize || 
        start > end
    ) {
        res.status(416)
        res.setHeader("Content-Range", `bytes */${fileSize}`)

        return res.end()
    }

    const chunkSize = end - start + 1

    res.status(206)

    res.setHeader("Content-Range", `bytes ${start}-${end}/${fileSize}`)
    res.setHeader("Accept-Ranges", "bytes")
    res.setHeader("Content-Length", chunkSize)
    res.setHeader("Content-Type", `audio/${codec}`)

    const stream = fs.createReadStream(filePath, {
        start,
        end,
    })

    stream.pipe(res)
}

export default { streamTrack, }