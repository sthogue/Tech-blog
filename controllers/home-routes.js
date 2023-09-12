const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {

    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'content', 'created_at'],
            include:[
                {
                model: User,
                attributes: ['username']
            },
            {
                module: User,
                attributes: ['username']
            }
        ]
        });
        const posts = postData.map(post => post.get({ plain: true}));
        res.render('dashboard', {
            posts,
            loggedIn: true
        });
    } catch (err) {
        console.log(err);
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

router.get('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existUser = await User.findOne({ where: { username } });

        if (existUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(200).json("User created!")
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                            include: {
                                model: User,
                                attributes: ['username']
                            }
                        }
                    ]
                },
            ]
        });
        if (!postData){
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        const post = postData.get({ plain: true});
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