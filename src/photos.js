import { google } from 'googleapis';
import auth  from'./auth.js';

const photos = google.photoslibrary({ version: 'v1', auth });
export default photos;
