import React, { Component } from 'react';
import { withStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../store/actions'
import _ from '@lodash';

const styles = theme => ({
    root                : {},
    tablecell: {
        fontSize: '1.7rem',
        fontWeight: 800,
        color: theme.palette.secondary.light
    }
});
class UserGistTable extends Component {
    state = {
        page: 0,
        rowsPerPage: 10
    };

    handleViewFork = (id) => {
        this.props.history.push('/gistforks/' + id)
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render() {
        const { rowsPerPage, page } = this.state;
        const { classes, gistList } = this.props;

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Typography variant="h4" color="secondary" className="font-medium mb-16 mt-24">
                        User Gist List
                    </Typography>

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <TableHead>
                            <TableRow className="h-64">
                                <TableCell className={classes.tablecell}>Id</TableCell>
                                <TableCell className={classes.tablecell}>Badges</TableCell>
                                <TableCell className={classes.tablecell}>Forks</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                gistList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((n, index) => {
                                        return (
                                            <TableRow
                                                className="h-64 cursor-pointer"
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={n.id}
                                            >

                                                <TableCell component="th" scope="row">
                                                    {n.id}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {Object.keys(n.files).map(key => n.files[key]['language'])}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    <Button
                                                        onClick={event => this.handleViewFork(n.id)}
                                                        className="whitespace-no-wrap"
                                                        color="primary"
                                                        variant="contained">
                                                        VIEW FORKS
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={gistList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getGistUserDetails: Actions.getGistUserDetails
    }, dispatch);
}

function mapStateToProps({ gistuserApp }) {
    return {
        gistuser: gistuserApp.gistuser
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(UserGistTable)));
