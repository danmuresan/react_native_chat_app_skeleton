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
            {id: 4, name: 'Johhny El Diablo', imageUri: 'https://pbs.twimg.com/profile_images/1198234817273454592/81t8iNr8_400x400.jpg'},
            {id: 5, name: 'Lionel', imageUri: 'https://cdn.images.express.co.uk/img/dynamic/67/590x/Barcelona-star-Lionel-Messi-scored-a-hat-trick-against-RCD-Mallorca-1214446.jpg'},
            {id: 6, name: 'Luis', imageUri: 'https://as01.epimg.net/futbol/imagenes/2019/11/09/primera/1573292347_445203_1573292490_noticia_normal_recorte1.jpg'},
            {id: 7, name: 'Marc', imageUri: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/fc-barcelona-v-internazionale-uefa-champions-league-5d9cfaed00a54e0b7b000010.jpg'},
            {id: 8, name: 'Sergio', imageUri: 'https://resources.premierleague.com/photos/2019/11/20/a5b52b88-774c-4181-b869-8320e43d9b1e/Sergio-Aguero-2.jpg?width=930&height=620'},
            {id: 9, name: 'Ivan', imageUri: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/12/12/15761657836711.jpg'},
            {id: 10, name: 'Frankie', imageUri: 'https://www.fcbarcelona.com/photo-resources/2019/07/02/aa0a923b-e8d4-4eef-8319-81c71656b367/Fitxatges_DE_JONG_3200x2000_B.JPG?width=1200&height=750'},
            {id: 11, name: 'Clement', imageUri: 'https://www.fifaultimateteam.it/en/wp-content/uploads/2019/06/clement-lenglet.jpg'}
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
