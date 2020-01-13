import timeout from '../utils/AsyncUtils'
import { AppConstants } from '../utils/AppConstants'

const MockService = {
    async checkUserAuthenticatedAsync() {
        // TODO: via some AuthService go to some API and fetch token
        console.log('Faking auth check...');
        await timeout(500);
        return true;
    },
    
    async fetchContactListAsync() {
        await timeout(500);
        return [
            {id: 1, name: 'Ansu', imageUri: 'https://www.fcbarcelonanoticias.com/uploads/s1/11/67/29/2/ansu-fati-bakero.jpeg'},
            {id: 2, name: 'Carlos', imageUri: 'https://www.fcbarcelona.com/photo-resources/2019/10/23/ecde1c7a-c3c9-4e7f-b652-b747a870f697/C-PEREZ_players_BARCA_B.jpg?width=1200&height=750'},
            {id: 3, name: 'Antoine', imageUri: 'https://e0.365dm.com/19/12/768x432/skysports-antoine-griezmann_4856510.jpg?20191204155640'},
            {id: 4, name: 'Johhny El Diablo', imageUri: 'https://pbs.twimg.com/profile_images/495247940336627712/NooYyU9V_400x400.jpeg'},
            {id: 5, name: 'Lionel', imageUri: 'https://cdn.images.express.co.uk/img/dynamic/67/590x/Barcelona-star-Lionel-Messi-scored-a-hat-trick-against-RCD-Mallorca-1214446.jpg'},
            {id: 6, name: 'Luis', imageUri: 'https://as01.epimg.net/futbol/imagenes/2019/11/09/primera/1573292347_445203_1573292490_noticia_normal_recorte1.jpg'},
            {id: 7, name: 'Marc', imageUri: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/fc-barcelona-v-internazionale-uefa-champions-league-5d9cfaed00a54e0b7b000010.jpg'},
            {id: 8, name: 'Sergio', imageUri: 'https://resources.premierleague.com/photos/2019/11/20/a5b52b88-774c-4181-b869-8320e43d9b1e/Sergio-Aguero-2.jpg?width=930&height=620'},
            {id: 9, name: 'Ivan', imageUri: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/12/12/15761657836711.jpg'},
            {id: 10, name: 'Frankie', imageUri: 'https://www.fcbarcelona.com/photo-resources/2019/07/02/aa0a923b-e8d4-4eef-8319-81c71656b367/Fitxatges_DE_JONG_3200x2000_B.JPG?width=1200&height=750'},
            {id: 11, name: 'Clement', imageUri: 'https://www.fifaultimateteam.it/en/wp-content/uploads/2019/06/clement-lenglet.jpg'}
        ];
    },

    async fetchMockMessagesAsync() {
        await timeout(200);
        return [
            {
                messageContent: 'Hi hon, how was your day?',
                isCurrentlyLoggedInUserMessage: false,
                timestamp: new Date('January 13, 2020 18:15:30')
            },
            {
                messageContent: 'Fine.',
                isCurrentlyLoggedInUserMessage: true,
                timestamp: new Date('January 13, 2020 18:15:51')
            },
            {
                messageContent: 'Have you started on your homework yet?',
                isCurrentlyLoggedInUserMessage: false,
                timestamp: new Date('January 13, 2020 18:16:30')
            },
            {
                messageContent: 'Sort of…but this show is almost over….',
                isCurrentlyLoggedInUserMessage: true,
                timestamp: new Date('January 13, 2020 18:16:55')
            },
            {
                messageContent: 'OK, you can finish the show, but you really need to get started as soon as the show is over. I don’t want you staying up until midnight like you did last night.',
                isCurrentlyLoggedInUserMessage: false,
                timestamp: new Date('January 13, 2020 18:17:30')
            },
            {
                messageContent: 'Fine.',
                isCurrentlyLoggedInUserMessage: true,
                timestamp: new Date('January 13, 2020 18:17:05')
            },
            {
                messageContent: 'What show were you watching anyway?',
                isCurrentlyLoggedInUserMessage: false,
                timestamp: new Date('January 13, 2020 18:18:00')
            },
            {
                messageContent: 'Nothing really, just some reality TV show…',
                isCurrentlyLoggedInUserMessage: true,
                timestamp: new Date('January 13, 2020 18:19:02')
            },
            {
                messageContent: 'About what…',
                isCurrentlyLoggedInUserMessage: false,
                timestamp: new Date('January 13, 2020 18:19:10')
            },
            {
                messageContent: 'I dunno, it was just this show about a girl who gets pregnant when she’s only 17. They follow her around for a while when she’s pregnant and then afterwards when she has the baby.',
                isCurrentlyLoggedInUserMessage: true,
                timestamp: new Date('January 13, 2020 18:19:56')
            },
            {
                messageContent: 'Sounds kind of interesting. What did you think of it? Was it realistic?',
                isCurrentlyLoggedInUserMessage: false,
                timestamp: new Date('January 13, 2020 18:20:21')
            },
            {
                messageContent: 'Well, she definitely had a lot of problems. When she was pregnant she couldn’t do all the stuff that her friends were doing and had to miss out on things like going on the class trip at the end of the year which sucked for her.',
                isCurrentlyLoggedInUserMessage: true,
                timestamp: new Date('January 13, 2020 18:22:21')
            },
            {
                messageContent: 'What about after the baby arrived?',
                isCurrentlyLoggedInUserMessage: false,
                timestamp: new Date('January 13, 2020 18:23:00')
            },
            {
                messageContent: 'Well she didn’t really have a good place to stay. Her parents were really mad at her so they kicked her out and she was staying at her boyfriend’s, but he was a real jerk. I can’t believe that her parents were so mean that they would actually kick her out of the house. I mean she made a mistake, but that seems beyond mean.',
                isCurrentlyLoggedInUserMessage: true,
                timestamp: new Date('January 13, 2020 18:23:32')
            },
            {
                messageContent: 'Well, I can tell you from a parent’s perspective maybe they think that’s the only way that she can learn a lesson. I don’t think I could ever kick you out of the house, but I certainly wouldn’t be very happy if you told me that you were pregnant.',
                isCurrentlyLoggedInUserMessage: false,
                timestamp: new Date('January 13, 2020 18:24:05')
            },
            {
                messageContent: 'Lets change the subject, this is kind of boring...',
                isCurrentlyLoggedInUserMessage: true,
                timestamp: new Date('January 13, 2020 18:26:00')
            },
            {
                messageContent: 'I will just go to homework :/',
                isCurrentlyLoggedInUserMessage: true,
                timestamp: new Date('January 13, 2020 18:26:20')
            }
        ];
    },
    
    async loadCallListAsync() {
        await timeout(200);
        return [];
    },
    
    async fetchProfileAsync() {
        await timeout(200);
        return {
            profileImageUri: AppConstants.DefaultProfileImageUri,
            fullName: AppConstants.DefaultMockUserName
        }
    }
}

export default MockService;
