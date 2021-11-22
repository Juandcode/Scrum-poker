import {PrismaClient} from "@prisma/client";
import {Express, Router} from "express";

const express = require("express");

type PropsLogin = {
    body: {
        username: string
        roomId: number
    }
}
type PropsStory = {
    body: {
        idUser: number
        roomId: string
        username: string
    }
}
type PropsSetEstimation = {
    body: {
        estimationPoint: number,
        name: string,
        storyId: number,
        userId: number,
    }
}
type PropsEstimationsStory = {
    body: { storyId: number }
}

export default async (prisma: PrismaClient): Promise<Router> => {

    const app: Router = express.Router();
    app.use((req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.post('/login', async ({body: {username, roomId}}: PropsLogin,
                              res: { json: any, status(number: number): any; }) => {
        const user = await prisma.user.findFirst({
            where: {
                name: username
            }
        })
        if (user) {
            const existInRoom = await prisma.userRoom.findFirst({
                where: {
                    userId: user.id,
                    roomId: parseInt(String(roomId))
                },
            })
            if (!existInRoom) return res.status(401).json({message: "not Exist in room"})
            return res.json({user, roomId: existInRoom.roomId})
        }
        res.status(401).send({message: "User not found"})
    })
    app.post('/story', async ({body: {idUser, roomId, username}}: PropsStory, res) => {
        const room = await prisma.room.findFirst({
            where: {
                id: parseInt(roomId),
                userRoom: {
                    some: {
                        userId: idUser
                    }
                }
            }
        })
        if (room) {
            const story = await prisma.story.findFirst({
                where: {room: {id: room.id}},
                include: {
                    StoryEstimation: {
                        select: {
                            estimation: true
                        },
                        orderBy: [{
                            estimation: {
                                value: "asc"
                            }
                        }]
                    },
                }
            })
            if (story) {
                // verify if user has voted
                const hasVoted = await prisma.result.findFirst({
                    where: {
                        name: username,
                        story: {
                            id: story.id
                        }
                    }
                })
                console.log(hasVoted)

                return hasVoted ? res.json({story, estimateValueVoted: hasVoted.estimationPoint}) : res.json({story})
            }
        }
        res.status(401).send({"message": "User does not belong to this room."})
    })

    app.post('/setEstimation', async ({body: {name, estimationPoint, storyId, userId}}: PropsSetEstimation, res) => {
        if (!name || !storyId || !userId) return res.status(401).json({message: "incomplete"})
        const userBelongStory = await prisma.user.findFirst({
            where: {
                id: userId,
                userRoom: {
                    some: {room: {storyId: storyId}}
                }
            },

        })
        if (!userBelongStory) return res.status(401).send({message: "User does not belong to this story"})
        const existStory = await prisma.story.findFirst({
            where: {
                id: parseInt(String(storyId))
            }
        })
        if (existStory) {
            const result = await prisma.result.create({
                data: {
                    name: name,
                    estimationPoint: estimationPoint,
                    storyId: parseInt(String(existStory.id)),
                }
            })
            return res.json({result})
        }
        res.status(401).send({message: "Story does not exist"})
    })
    app.post('/estimationsstory', async ({body: {storyId}}: PropsEstimationsStory, res) => {
        console.log(storyId)
        if (storyId) {
            const results = await prisma.result.findMany({
                where: {
                    storyId: storyId
                },
                select: {
                    name: true,
                    estimationPoint: true
                }
            })
            return res.json({results})
        }
        res.status(401).send({message: "Incomplete data"})
    })
    return app
}
