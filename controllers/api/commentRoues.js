const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//Get all comments
router.get("/", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
    
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get one comment
router.get("/:id", async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {});

        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Create a comment
router.post("/", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete a comment
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
