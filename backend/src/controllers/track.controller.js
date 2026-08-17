import trackService from "../services/track.service.js"


const getTrack = async(req, res) => {
    try {
        const id = req.params.id
        const track = await trackService.getTrack(id)

        res.status(200).json(track)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default { getTrack, }