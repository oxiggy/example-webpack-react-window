import React from 'react'
import { withStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Style'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'

import SearchIcon from '@material-ui/icons/Search'


import Box from '@material-ui/core/Box'


class Header extends React.PureComponent {

    state= {
        userMenuOpen: false,
    }

    handleOpenUserMenu= () => {
        this.setState({ userMenuOpen:true })
    }

    handleCloseUserMenu= () => {
        this.setState({ userMenuOpen:false })
    }

    render() {
        const { classes, keyword, onChangeKeyword }= this.props
        return (
            <AppBar position="static" color="secondary" elevation={0} className={classes.root}>
                <Box className={classes.fix}/>
                <Toolbar>
                    <IconButton
                        color="primary"
                        edge="start"
                        aria-label="menu"
                        onClick={() => location.reload()}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{ flexGrow:1 }}/>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            value={keyword}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={onChangeKeyword}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        )
    }

}

const styles= (theme) => ({
    root: {
        position: 'relative',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.background.default, 0.18),
        '&:hover': {
            backgroundColor: fade(theme.palette.background.default, 0.24),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
})

export default withStyles(styles)(
    Header
)

