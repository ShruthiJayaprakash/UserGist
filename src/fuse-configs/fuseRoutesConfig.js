import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {GistMgtAppConfig} from 'main/content/gist-mgt/GistMgtAppConfig';

const routeConfigs = [
    GistMgtAppConfig
];

export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/usergists"/>
    }
];
