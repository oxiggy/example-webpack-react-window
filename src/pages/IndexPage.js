import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'

import * as colors from 'color-name'

const Row= ({ index, style, data:{ classes, list } }) => (
    <div className={classes.item} style={style}>{list[index].name}</div>
)

class IndexPage extends React.PureComponent {

    render() {
        const { classes }= this.props
        const list= Object
            .keys(colors)
            .map((key) => ({
                name: key,
                color: colors[key],
            }))
        ;
        return (
            <div className={classes.root}>
                <AutoSizer>
                    {({width, height}) => (
                        <List
                            className={classes.list}
                            width={width}
                            height={height}
                            itemCount={list.length}
                            itemSize={40}
                            itemData={{
                                classes,
                                list
                            }}
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
            </div>
        )
    }

}

const styles= (theme) => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    list: {

    },
    item: {
        paddingLeft: 24,
        paddingRight: 24,
    },
})

export default withStyles(styles)(
    IndexPage
)