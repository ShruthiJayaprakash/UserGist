import React, { Component } from 'react';
import { withStyles, Grid, Paper, Input, Icon, AppBar, Toolbar, Typography, TextField, Chip } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../store/actions'
import UserGistTable from './UserGistTable';
import classNames from 'classnames';
import _ from '@lodash';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    root: {
        flexGrow: 1
    },
    control: {
        padding: theme.spacing.unit * 4
    },
    textbox: {
        width: '200rem'
    }
});

class UserGistSearch extends Component {
    state = {
        gistUserSearchText: '',
        gistUserBadge: []
    };

    componentDidMount() {
        this.setState({ gistUserSearchText: this.props.gistuser.user })

    }
    handleGistUserSearchText = (e) => {
        if (e.charCode === 13 && e.key === 'Enter') {
            e.preventDefault()
            this.props.getGistUserDetails(this.state.gistUserSearchText)
        }
    }

    handleSearchChange = (e) => {
        this.setState({ gistUserSearchText: e.target.value })
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.gistuser.user, prevProps.gistuser.user)) {
            this.setState({ gistUserSearchText: this.props.gistuser.user })
        }
    }

    render() {
        const { gistUserSearchText, gistUserBadge } = this.state;
        const { classes, gistuser } = this.props;
    
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.control}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={12}>
                                <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                                    <Icon className="mr-8" color="action">search</Icon>

                                    <Input
                                        placeholder="Search Gist User and Press Enter"
                                        className="flex flex-1"
                                        disableUnderline
                                        fullWidth
                                        value={gistUserSearchText}
                                        inputProps={{
                                            'aria-label': 'Search'
                                        }}
                                        onKeyPress={this.handleGistUserSearchText}
                                        onChange={this.handleSearchChange}
                                    />
                                </Paper>
                            </Grid>

                            {/* <Grid item xs={12} sm={12}>
                            {gistUserBadge.map( item => 
                                <Chip key={item} label={item} className={classes.chip} />
                            )}
                            </Grid> */}

                            {gistuser && gistuser.data && gistuser.data.length > 0 && <UserGistTable gistList={gistuser.data} />}

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getGistUserDetails: Actions.getGistUserDetails
        // getGistUserForks: Actions.getGistUserForks
    }, dispatch);
}

function mapStateToProps({ gistuserApp }) {
    return {
        gistuser: gistuserApp.gistuser
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(UserGistSearch)));
