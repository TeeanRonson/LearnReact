import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/index';
// import PostsNew from './posts_new';

class PostsIndex extends Component {

    //React lifecycle methods are methods in a component that are 
    //automatically called by React
    //componentDidMount will be called after this component has showed up on the page
    componentDidMount( ) {
        this.props.fetchPosts();
    }

    renderPosts() {
        //to map over an object with need to use lodash's map function
        return _.map(this.props.posts, post => {
            return (
                <li key={post.title} className="list-group-item">
                    {post.title}
                </li>
            );
        })
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                    Add a post 
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {posts: state.posts};

}

//Remember that whenever we want to get a action creator 
//into our 'component' we had to use mapDispatchToProps
//then we could call it from the this.props object
//by exporting in this manner, we do the same but connect helps us connect 
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);