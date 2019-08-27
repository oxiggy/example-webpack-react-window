import React from 'react'
import { withStyles, getContrastText } from '@material-ui/core/styles'

console.log(getContrastText)

import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized/dist/es/AutoSizer'
import * as colors from 'color-name'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { Box } from '@material-ui/core'
import Header from '../components/Header'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import FormatPaintIcon from '@material-ui/icons/FormatPaint'
import ContrastText from '../components/ContrastText'
import ContrastIcon from '../components/ContrastIcon'

const list= Object
    .keys(colors)
    .map((key) => ({
        name: key,
        color: colors[key],
    }))
;

const Item= ({ index, style, data:{ classes, list, onClick, onClickSecondary, background } }) => (
    <div style={style}>
        <ListItem
            className={classes.item}
            button
            onClick={() => onClick(list[index], index)}
        >
            <ListItemAvatar>
                <Avatar className={classes.itemAvatar} style={{ backgroundColor:`rgb(${list[index].color.join(',')})`}}>
                    <ContrastText background={`rgb(${list[index].color.join(',')})`}>
                        {list[index].name[0]}
                    </ContrastText>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={(
                    <ContrastText background={background}>
                        {list[index].name}
                    </ContrastText>
                )}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments" onClick={() => onClickSecondary(list[index], index)}>
                    <ContrastIcon background={background} iconComponent={FormatPaintIcon} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </div>
)

class IndexPage extends React.PureComponent {

    state= {
        keyword: '',
        filteredList: [],
        background: null,
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
        const filteredList= list.filter((item) => item.name.indexOf(this.state.keyword.toLowerCase()) > -1)
        this.setState({ filteredList })
    }

    render() {
        const { classes }= this.props
        return (
            <React.Fragment>

                <Box>
                    <Header keyword={this.state.keyword} onChangeKeyword={this.handleChangeKeyword}/>
                </Box>

                <Box className={classes.root} style={{ backgroundColor:(this.state.background || undefined) }}>
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
                                    onClickSecondary: this.handleClickSecondary,
                                    background: this.state.background,
                                }}
                                innerElementType="ul"
                                overscanCount={10}
                            >
                                {Item}
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
    handleClickSecondary= (item, index) => {
        this.setState({ background:`rgb(${item.color.join(',')})`})
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
        position: 'relative',
    },
})

export default withStyles(styles)(
    IndexPage
)