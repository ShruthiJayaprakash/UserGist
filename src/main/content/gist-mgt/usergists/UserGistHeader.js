import React, {Component} from 'react';
import {withStyles, Icon, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import classNames from 'classnames';

const styles = theme => ({
    root: {}
});

class UserGistHeader extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-1 w-full items-center justify-between")}>

                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-0 sm:mr-12">shopping_basket</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="hidden sm:flex" variant="h6">User Gist Details</Typography>
                    </FuseAnimate>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(UserGistHeader);
