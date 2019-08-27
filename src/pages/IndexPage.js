import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import * as colors from 'color-name'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'

const Row= ({ index, style, data:{ classes, list, onClick } }) => (
    <ListItem
        className={classes.item}
        style={style}
        button
        onClick={() => onClick(list[index], index)}
    >
        <ListItemAvatar>
            <Avatar style={{ backgroundColor:`rgb(${list[index].color.join(',')})`}}>
                {list[index].name[0]}
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={list[index].name} />
    </ListItem>
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
                            itemSize={48}
                            itemData={{
                                classes,
                                list,
                                onClick: this.handleClick,
                            }}
                            innerElementType="ul"
                            overscanCount={10}
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
            </div>
        )
    }

    handleClick= (item, index) => {
        navigator.clipboard.writeText(item.color.toString())
            .then(() => {
                alert('copied: ' + item.color.toString())
            })
        ;
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
        '& > ul': {
            display: 'block',
            listStyle: 'none',
            margin: 0,
            padding: 0,
        }
    },
    item: {

    },
})

export default withStyles(styles)(
    IndexPage
)