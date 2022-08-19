import 'dotenv/config';

export default {
    region: `${process.env.AWS_BUCKET_REGION}`,
    bucket: `${process.env.AWS_BUCKET_NAME}`,
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    apiVersion: '2006-03-01',
};
