import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
// import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Icon from 'material-ui/Icon';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = theme => ({    
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class Users extends Component {

    // state={
    //     expanded: null
    // };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            contacts: [],
            comments:[]
        }
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentWillMount(){
        localStorage.getItem('contacts') && this.setState({
            //contacts: JSON.parse(localStorage.getItem('contacts')),
            isLoading:false
        });
    }

    //fetching data from api
    componentDidMount() {
        const date = localStorage.getItem('contactsDate');
        const contactsDate  = new Date(parseInt(date));
        const nowDate = new Date();
        //convert to minutes
        const dataAge = Math.round((nowDate - contactsDate) / (1000 * 60));         

        if(dataAge >= 0 || !localStorage.getItem('contacts')){
            this.fetchData();
            //this.fetchJsonServerAPI();
        }
        else{
            console.log(`Using data from local storage that is ${dataAge} minutes old.`);
        }
         //this.fetchData();
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('contacts', JSON.stringify(nextState.contacts));
        localStorage.setItem('contactsDate', Date.now());
    }

    handleClick() {
        return false;
        this.fetchData();        
    }

    fetchData() {
        this.setState({
            isLoading: true,
            contacts: []
        });
        //using fetchAPI
        //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch('https://randomuser.me/api/?results=10&gender=female')
            .then(response => response.json())
            .then(parsedJson => parsedJson.results.map(user => (
                {
                    name: `${user.name.first} ${user.name.last}`,
                    username: `${user.login.username}`,
                    email: `${user.email}`
                }
            )))
            .then(contacts => this.setState({
                contacts,
                isLoading: false
            }))
            .catch(error => console.log('parson failed', error))
    }

    // fetchJsonServerAPI() {
    //     this.setState({
    //         isLoading: true,
    //         comments: []
    //     });
    //     fetch('http://localhost:9000/comments')
    //     .then(response => response.json())
    //     .then(response => {
    //         this.setState({
    //             comments: response,
    //             isLoading: false
    //         })
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })
    // }

    render() {
        const { isLoading, contacts, comments } = this.state;
        return (
            
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                    <h4>
                    {!localStorage.getItem('contacts')? "Data Loading from API": "Data Loaded from Local Storage"}
                    </h4>
                        <Button raised color="primary" onClick={this.handleClick}>
                            Fetch data&nbsp;
                        <Icon>autorenew</Icon>
                        </Button>
                    </Grid>
                    <div className={`main-content ${isLoading ? 'is-loading' : ''}`}>
                        {
                            !isLoading && comments.length > 0 ? comments.map(comment => {
                                return <Grid item xs={12} key={comment.id}><Paper><ExpansionPanel>
                                    <ExpansionPanelSummary>
                                        <Typography>{comment.body}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            <b>id:</b> {comment.id}<br />
                                            <b>body:</b> {comment.body}
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel></Paper></Grid>
                                
                            }) : null
                            
                        }

                        <div className="loader"></div>
                    </div>
                </Grid>
        );
    }
}

export default withStyles(styles)(Users)