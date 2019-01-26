import React, { Component } from 'react';
import {
    withStyles,Icon, Typography, Card, CardActionArea, CardMedia, Grid, Paper
} from '@material-ui/core';
import { FuseAnimate, FusePageCarded } from '@fuse';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../store/actions';
import _ from '@lodash';
import withReducer from 'store/withReducer';
import reducer from './../store/reducers';

const styles = {
    card: {
        maxWidth: 345
    },
    media: {
        height: 350,
    },
};

class GistFork extends Component {
    state = {
        slicedForkData: []
    };

    componentDidMount() {
        const params = this.props.match.params;
        const { id } = params;
        if (id) {
            this.props.getGistUserForks(id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(this.props.gistuser.forkdata, prevProps.gistuser.forkdata)) {
            let slicedArr = this.props.gistuser.forkdata.slice(0, 3)
            this.setState({ slicedForkData: slicedArr })
        }
    }

    handleClick = (url) => {    
        window.open(url, '_blank');
    }

    render() {
        const { classes, gistuser } = this.props;
        const { slicedForkData } = this.state;


        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <div className="flex flex-1 w-full items-center justify-between">
                        <div className="flex flex-col items-start max-w-full">
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/usergist">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    User Gists
                                    </Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                }
                content={
                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            <Paper className={classes.control}>
                                <Grid container spacing={8}>
                                    {gistuser && gistuser.forkdata && gistuser.forkdata.length > 0 &&
                                        slicedForkData.map(item => {
                                            return (
                                                <Grid item xs={12} sm={4} key={item.owner.login}>
                                                    <Card className={classes.card}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                className={classes.media}
                                                                image={item.owner.avatar_url}
                                                                title={item.owner.login}
                                                                onClick={event => this.handleClick(item.html_url)}
                                                            />
                                                        </CardActionArea>
                                                    </Card>
                                                </Grid>
                                            )
                                        }
                                        )}
                                    {gistuser && gistuser.forkdata && gistuser.forkdata.length === 0 &&
                                        <FuseAnimate animation="transition.expandIn" delay={100}>
                                            <Typography variant="h4" color="inherit" className="font-medium mb-16">
                                                Forks Data Not Available.
                                         </Typography>
                                        </FuseAnimate>
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getGistUserForks: Actions.getGistUserForks
    }, dispatch);
}

function mapStateToProps({ gistuserApp }) {
    return {
        gistuser: gistuserApp.gistuser
    }
}

export default withReducer('gistuserApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(GistFork))));
