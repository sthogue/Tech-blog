const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
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
            //logged_in: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get login page
router.get('/login', (req, res) => {
    if (req.session.user_id) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');

});

router.get('/logout', (req, res) => {
    if (req.session.user_id) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
    return redirect('/');
});


router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const userPosts = dbPostData.get({ plain: true });

        res.render('single-post', {
            ...userPosts,
            loggedIn: req.session.user_id
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;