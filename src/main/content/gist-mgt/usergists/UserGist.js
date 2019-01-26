import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import UserGistHeader from './UserGistHeader';
import UserGistSearch from './UserGistSearch';
import withReducer from 'store/withReducer';
import reducer from './../store/reducers';

const styles = theme => ({});

class UserGist extends Component {

    render()
    {
        return (
            <FusePageCarded
                classes={{
                    content: "flex",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <UserGistHeader/>
                }
                content={
                    <UserGistSearch/>
                }
                innerScroll
            />
        )
    };
}

export default withReducer('gistuserApp', reducer)(withStyles(styles)(UserGist));
