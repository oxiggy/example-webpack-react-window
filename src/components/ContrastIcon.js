import React from 'react'
import { withStyles } from '@material-ui/styles'

class ContrastIcon extends React.PureComponent {

    render() {
        const { classes, iconComponent:Icon, ...props }= this.props
        return (
            <Icon className={classes.root} {...props}/>
        )
    }

}

const styles= (theme) => ({
    root: {
        color: (props) => {
            return theme.palette.getContrastText(props.background || theme.palette.background.default)
        },
    },
})

export default withStyles(styles)(
    ContrastIcon
)
