# WinePost
by Ralphie Celedon & Kaitlin Park

Wine Post is a social media app for wine enthusiasts by wine enthusiasts. Users (over 21 please) can create an account to connect with fellow wine enthusiasts around the world. Users can share their reviews of and experiences with wine.  

[Link to Back-End GitHub Repository](https://github.com/parkaitlin/winepost_api)
### Wireframes
<img src="winePost-wire.png">

### Snippet - Python | Flask-Backend
Code below requests current user specific posts. Using the User's id, which was saved in each post when created, we found all of the user's posts. Then use the response data to populate the their Cellar (Profile Page).

```
class UserPostList(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            'posted_by',
            required=False,
            help='username is required to post',
            location=['form', 'json']
        )
        super().__init__()
    # @marshal_with(post_fields)
    def get(self, id):
        posts = [marshal(post, post_fields) for post in models.Post.select().where(models.Post.posted_by==id)]
        return posts
```

### User Story:
1. User must confirm that they are over 21 years of age.
2. User can register or login.
3. Once the user is logged, they are able to access the explore, feed and cellar features of the application
4. Explore is populated with all posts, Feed will be populated with posts by users that the current user has designated as friends or decided to follow.
5. The Cellar contains the user's profile, top 5 wines, and all of the current user's posts.

### Technologies
- React
- JSX
- Python
- Flask
- Styled-Components
- CSS3
- Sketch
- Heroku

This application is deployed on Heroku. [WinePost](https://winepost.herokuapp.com/)

### Future Improvements
1. Apply Wine Api so app has the following functionality:
    - Autofill wine input when user creates a new post
    - Allow users to add wines to their "Cellar"
    - And to allow users to edit their current top five.
2. User Logout function
3. Create functionality so users can befriend/follow other users
4. Create User Feed, which only includes Users that they have chosen to follow.
5. Improve overall CSS and user experience
6. Have post include date posted and populate in descending order.


