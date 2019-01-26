import UserGist from './usergists/UserGist';
import GistGFork from './usergists/GistFork';

export const GistMgtAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/usergists',
            component: UserGist
        },
        {
            path     : '/gistforks/:id',
            component: GistGFork
        }
    ]
};