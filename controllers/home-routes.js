const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {

    try {
        const dbPostData = await Post.findAll({
            include:[
                {
                model: User,
                attributes: ['username']
            },
        ]
        });

        const userPosts = dbPostData.map((post) => 
            post.get({ plain: true })
        );

        // Pass serialized data and session flag into template
        res.render('homepage', {
            userPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/:id', async (req, res) => {
    try{
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["id", "comment_text", "created_at"],
                            
                        }
                    ]
                },
            ]
        });

        const userPosts = dbPostData.get({ plain: true });

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;