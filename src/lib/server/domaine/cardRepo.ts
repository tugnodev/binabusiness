import { prisma } from "$lib/server/prisma.js"

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    vender?: boolean;
}

interface Card {
    id: number;
    userId?: string;
    cardDetails: {
        articleId: number;
        articleName: string;
        articleImage: string;
        articlePrice: number;
        quantity: number;
    }[];
}

class CardServices {
    async fetchCards( user: User){
        
        let card = await prisma.cards.findFirst({
            where: {
                userId: user.id
            }
        })
        if(!card){
            //create card
            card = await prisma.cards.create({
                data: {
                    userId: user.id,
                    cardDetails: JSON.stringify([])
                }
            })
            return card;
        }
        return card;
    }

    async patchCard(cardDetails: Card){
        const card = await prisma.cards.update({
            where: {
                id: cardDetails.id,
                userId: cardDetails.userId
            },
            data: {
                cardDetails: JSON.stringify(cardDetails.cardDetails)
            }
        });
        if(!card){
            return "error while updating"
        }else{
            return card
        }
    }
    async resetCard(cardDetails: Card){
        const card = await prisma.cards.update({
            where: {
                id : cardDetails.id,
                userId: cardDetails.userId
            },
            data: {
                cardDetails : JSON.stringify([])
            }
        })
        if(!card){
            return "error while updating"
        }else{
            return "reset succefully"
        }
    }
}

export const cardService = new CardServices()