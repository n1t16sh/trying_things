const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const questions = {
    arrays: [
        { question: 'Find the minimum value in an array.', difficulty: 1 },
        { question: 'Find the subarray with the maximum sum.', difficulty: 2 },
        { question: 'Given an array, find the longest increasing subsequence.', difficulty: 3 }
    ],
    strings: [
        { question: 'Check if a string is a palindrome.', difficulty: 1 },
        { question: 'Find the longest substring without repeating characters.', difficulty: 2 },
        { question: 'Implement regular expression matching.', difficulty: 3 }
    ],
    trees: [
        { question: 'Find height of a binary tree.', difficulty: 1 },
        { question: 'Inorder traversal of binary tree without recursion.', difficulty: 2 },
        { question: 'Serialize and deserialize a binary tree.', difficulty: 3 }
    ]
};

// Use an in-memory map for user history (for demo only).
const userHistory = {};

app.post('/recommend', (req, res) => {
    // Simulating a default user
    const user = 'default_user';
    const topic = req.body.topic;

    if (!userHistory[user]) userHistory[user] = {};
    const highestDone = userHistory[user][topic] || 0;

    // Get next harder question, fallback to hardest if none left
    const nextQuestion = questions[topic].find(q => q.difficulty > highestDone) || questions[topic][questions[topic].length - 1];

    // Update history
    userHistory[user][topic] = nextQuestion.difficulty;

    res.json({ question: nextQuestion.question });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
