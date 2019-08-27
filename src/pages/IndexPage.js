import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import * as colors from 'color-name'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { Box } from '@material-ui/core'
import Header from '../components/Header'

const list= Object
    .keys(colors)
    .map((key) => ({
        name: key,
        color: colors[key],
    }))
;

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

    state= {
        keyword: '',
        filteredList: [],
    }

    componentDidMount() {
        this.filterList()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.keyword !== prevState.keyword) {
            this.filterList()
        }
    }

    filterList() {
        const filteredList= list.filter((item) => item.name.indexOf(this.state.keyword) > -1)
        this.setState({ filteredList })
    }

    render() {
        const { classes }= this.props
        return (
            <React.Fragment>

                <Box>
                    <Header keyword={this.state.keyword} onChangeKeyword={this.handleChangeKeyword}/>
                </Box>

                <Box className={classes.root}>
                    <AutoSizer>
                        {({width, height}) => (
                            <List
                                className={classes.list}
                                width={width}
                                height={height}
                                itemCount={this.state.filteredList.length}
                                itemSize={48}
                                itemData={{
                                    classes,
                                    list: this.state.filteredList,
                                    onClick: this.handleClick,
                                }}
                                innerElementType="ul"
                                overscanCount={10}
                            >
                                {Row}
                            </List>
                        )}
                    </AutoSizer>
                </Box>

            </React.Fragment>
        )
    }

    handleChangeKeyword= ({ target:{ value:keyword }}) => {
        this.setState({ keyword })
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
        flexGrow: 1,
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