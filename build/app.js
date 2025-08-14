import express, {} from 'express';
import('./model/index.js');
const app = express();
app.get('/', (req, res) => {
    res.send('hello world');
});
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
//# sourceMappingURL=app.js.map