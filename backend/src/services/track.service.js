import { prisma } from "../config/db.js"


const getTrack = async(id) => {
    return prisma.track.findUnique({ 
        where: { id }
    })
}

export default { getTrack, };