const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/addPost', (req, res) => {
    const postData = req.body;

    // Define the path to your JSON file
    const filePath = path.join(__dirname, '../client', 'blog_data.json');

    // Read existing posts from JSON file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }

        let posts = JSON.parse(data);
        posts.unshift(postData); // Add new post to the beginning of the array

        // Write updated posts back to JSON file
        fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).send('Error writing file');
                return;
            }

            console.log('Post added successfully');
            res.sendStatus(200);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
