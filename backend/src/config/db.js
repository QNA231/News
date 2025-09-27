import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("Kết nối db thành công");
    } catch (error) {
        console.error("Lỗi kết nối db: ", error);
        process.exit(1); // exit with error
    }
};