import express from 'express';
import path from 'node:path';

const { dirname } = import.meta;
const [,, port] = process.argv;
const pub_dir = path.join(dirname, 'public');
const src_dir = path.join(dirname, 'src');

const app = express();

app.use(express.static(pub_dir));
app.use(express.static(src_dir));

app.listen(port);
