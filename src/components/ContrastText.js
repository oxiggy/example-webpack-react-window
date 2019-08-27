import React from 'react'
import { withStyles } from '@material-ui/styles'

class ContrastText extends React.PureComponent {

    render() {
        const { classes, children }= this.props
        return (
            <span className={classes.root}>{children}</span>
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
    ContrastText
)
